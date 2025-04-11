import React, { useRef, useState } from 'react';
import { Camera, Upload as UploadIcon, Image, ImagePlus } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (imageData: string | File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      onImageSelected(file);
    } else {
      alert('Please upload an image file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        onImageSelected(imageData);
        stopCamera();
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 px-6">
      {/* User Profile Section */}
      <div className="flex items-center space-x-4 w-full mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/75/e4/0a/75e40ab9dc9197c1f7fc3cd06bb5e941.jpg"
            alt="Guest"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Guest</h2>
          <p className="text-gray-500">email</p>
        </div>
      </div>

      {showCamera ? (
        <div className="relative w-full aspect-[3/4] bg-black rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <button
              onClick={capturePhoto}
              className="bg-white rounded-full p-4 shadow-lg"
            >
              <Camera className="w-8 h-8 text-green-600" />
            </button>
            <button
              onClick={stopCamera}
              className="bg-white rounded-full p-4 shadow-lg"
            >
              <UploadIcon className="w-8 h-8 text-red-600" />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Logo and Title */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <img
                src="https://iili.io/3Axsx8G.png"
                alt="CropCare Logo"
                className="w-12 h-12"
              />
            </div>
            <h1 className="text-3xl font-bold text-green-600">CropCare</h1>
          </div>

          {/* Description */}
          <div className="bg-green-50 rounded-xl p-4 w-full mb-6">
            <p className="text-center text-gray-700">
              Plant disease detection made easy
            </p>
          </div>

          <div className="bg-green-50/50 rounded-xl p-6 w-full mb-8">
            <p className="text-center text-gray-600">
              Take a <Camera className="inline-block w-5 h-5 mx-1 align-text-bottom text-gray-600" /> or upload an
              <ImagePlus className="inline-block w-5 h-5 mx-1 align-text-bottom text-gray-600" /> of your plant to diagnose diseases and
              get treatment recommendations
            </p>
          </div>

          {/* Action Buttons */}
          <button
            onClick={startCamera}
            className="w-full bg-green-500 text-white rounded-xl py-4 flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors mb-4"
          >
            <Camera className="w-6 h-6" />
            <span className="text-lg">Take a photo</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-green-500 text-green-500 rounded-xl py-4 flex items-center justify-center space-x-2 hover:bg-green-50 transition-colors"
          >
            <UploadIcon className="w-6 h-6" />
            <span className="text-lg">Upload image</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
        </>
      )}
    </div>
  );
};

export default ImageUpload;