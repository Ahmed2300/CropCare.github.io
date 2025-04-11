import React from 'react';
import { Leaf } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">CropCare</h1>
          </div>
          <p className="text-sm text-gray-600">AI-Powered Plant Disease Detection</p>
        </div>
      </div>
    </header>
  );
};

export default Header;