import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

interface ResultsProps {
  results: {
    crop_name: string;
    disease_detected: boolean;
    disease_name: string;
    confidence_percentage: number;
    danger_level: number;
    symptoms: string[];
    treatments: string[];
    prevention_tips: string[];
    disease_description: string;
  };
  imageUrl: string;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsProps> = ({ results, imageUrl, onReset }) => {
  const { t } = useTranslation();
  const currentDate = new Date().toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-20">
      {/* Header Image Section */}
      <div className="relative h-64">
        <img 
          src={imageUrl} 
          alt={results.crop_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{results.crop_name}</h1>
          <p className="text-sm opacity-90">{currentDate}</p>
        </div>
        <div className="absolute top-6 right-6">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            results.disease_detected 
              ? 'bg-red-500 text-white' 
              : 'bg-emerald-500 text-white'
          }`}>
            {results.disease_detected ? t('results.diseased') : t('results.healthy')}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            {results.disease_detected ? 'Disease Detected' : 'Analysis Results'}
          </h2>
          <h3 className="text-xl font-medium text-gray-900 mb-3">
            {results.disease_detected ? results.disease_name : 'None Detected'}
          </h3>
          <p className="text-gray-600 mb-6">{results.disease_description}</p>

          {/* Confidence and Danger Level Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{t('results.confidence')}</span>
                <span className="text-sm font-medium text-gray-700">{results.confidence_percentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${results.confidence_percentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{t('results.dangerLevel')}</span>
                <span className="text-sm font-medium text-gray-700">{results.danger_level}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    results.disease_detected ? 'bg-red-500' : 'bg-gray-400'
                  }`}
                  style={{ width: `${results.danger_level}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {results.disease_detected && (
          <>
            {/* Symptoms Section */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">{t('results.symptoms')}</h4>
              <ul className="space-y-2">
                {results.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatments Section */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">{t('results.treatments')}</h4>
              <ul className="space-y-2">
                {results.treatments.map((treatment, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {treatment}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Prevention Tips Section */}
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-3">{t('results.preventionTips')}</h4>
          <ul className="space-y-2">
            {results.prevention_tips.map((tip, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Back Button */}
        <button
          onClick={onReset}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('results.analyzeAnother')}
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;