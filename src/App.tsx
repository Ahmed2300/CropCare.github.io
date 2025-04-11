import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, History as HistoryIcon, Settings as SettingsIcon, Loader2, User } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import ResultsDisplay from './components/ResultsDisplay';
import Settings from './components/Settings';
import History from './components/History';
import SplashScreen from './components/SplashScreen';
import DeveloperInfo from './components/DeveloperInfo';
import { analyzeImage } from './lib/gemini';
import './i18n';

interface Location {
  latitude: number;
  longitude: number;
}

interface ScanResult {
  id: string;
  date: string;
  imageUrl: string;
  cropName: string;
  diseaseDetected: boolean;
  diseaseName: string;
  confidencePercentage: number;
  results: any;
}

function App() {
  const { t } = useTranslation();
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'scan' | 'history' | 'settings' | 'developer'>('scan');
  const [location, setLocation] = useState<Location | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  const handleLocationToggle = async (enabled: boolean) => {
    if (enabled) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      } catch (error) {
        console.error('Location access denied:', error);
        setLocation(null);
      }
    } else {
      setLocation(null);
    }
  };

  const saveToHistory = (imageBase64: string, results: any) => {
    const historyItem: ScanResult = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleString(),
      imageUrl: imageBase64,
      cropName: results.crop_name,
      diseaseDetected: results.disease_detected,
      diseaseName: results.disease_name,
      confidencePercentage: results.confidence_percentage,
      results
    };

    const savedHistory = localStorage.getItem('cropcare_history');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    history.unshift(historyItem);
    localStorage.setItem('cropcare_history', JSON.stringify(history.slice(0, 50))); // Keep last 50 items
  };

  const handleImageAnalysis = async (imageData: string | File) => {
    setAnalyzing(true);
    setError(null);
    
    let base64Image = '';
    if (imageData instanceof File) {
      base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(imageData);
      });
    } else {
      base64Image = imageData;
    }
    
    setCurrentImage(base64Image);

    try {
      const analysisResults = await analyzeImage(base64Image, t('language'), location || undefined);
      setResults(analysisResults);
      saveToHistory(base64Image, analysisResults);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError(t('error.analysis'));
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setCurrentImage(null);
    setError(null);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {currentView === 'scan' && (
            <>
              {!analyzing && !results && (
                <div className="bg-white rounded-lg shadow-lg">
                  <ImageUpload onImageSelected={handleImageAnalysis} />
                  {error && (
                    <p className="mt-4 text-red-600 text-center">{error}</p>
                  )}
                </div>
              )}

              {analyzing && (
                <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                  <div className="w-full max-w-md p-6">
                    {currentImage && (
                      <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8">
                        <img 
                          src={currentImage} 
                          alt="Analyzing" 
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full max-w-[90%] bg-white/90 backdrop-blur-sm rounded-xl p-4">
                            <div className="w-full bg-green-100 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-green-500 animate-[scan_2s_ease-in-out_infinite]" />
                            </div>
                            <p className="text-center mt-3 text-gray-800 font-medium">
                              {t('app.analyzing')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {results && !analyzing && currentImage && (
                <ResultsDisplay 
                  results={results}
                  imageUrl={currentImage}
                  onReset={handleReset}
                />
              )}
            </>
          )}

          {currentView === 'history' && <History />}
          {currentView === 'settings' && <Settings onLocationToggle={handleLocationToggle} />}
          {currentView === 'developer' && <DeveloperInfo />}

          {/* Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="max-w-3xl mx-auto flex justify-around">
              <button
                onClick={() => setCurrentView('scan')}
                className={`flex flex-col items-center ${currentView === 'scan' ? 'text-green-600' : 'text-gray-600'}`}
              >
                <Camera className="w-6 h-6" />
                <span className="text-sm">{t('app.scan')}</span>
              </button>
              <button
                onClick={() => setCurrentView('history')}
                className={`flex flex-col items-center ${currentView === 'history' ? 'text-green-600' : 'text-gray-600'}`}
              >
                <HistoryIcon className="w-6 h-6" />
                <span className="text-sm">{t('history.title')}</span>
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={`flex flex-col items-center ${currentView === 'settings' ? 'text-green-600' : 'text-gray-600'}`}
              >
                <SettingsIcon className="w-6 h-6" />
                <span className="text-sm">{t('app.settings')}</span>
              </button>
              <button
                onClick={() => setCurrentView('developer')}
                className={`flex flex-col items-center ${currentView === 'developer' ? 'text-green-600' : 'text-gray-600'}`}
              >
                <User className="w-6 h-6" />
                <span className="text-sm">{t('app.developer')}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;