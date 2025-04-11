import React, { useState } from 'react';
import { Download, Video, Mail, Linkedin, Code, School, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const DeveloperInfo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://www.dropbox.com/scl/fi/1t2nmze4hzi5bchak36ft/FB_IMG_1743224652660.jpg?rlkey=to88ennpo14fn1171y9n1d7ak&st=nyidi6ow&dl=1"
          alt="Ahmed Amr Azam"
          className="w-32 h-32 rounded-full object-cover border-4 border-green-500 mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">Ahmed Amr Azam</h2>
        <p className="text-gray-600 mt-2 text-center">
          Full-stack Developer & Physics Educator
        </p>
      </div>

      {/* Phone Frame with Video */}
      <div className="max-w-[320px] mx-auto mb-8">
        <div className="relative rounded-[3rem] bg-gray-900 p-4 pb-8">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl"></div>
          
          {/* Video Container */}
          <div className="relative rounded-[2rem] overflow-hidden bg-black aspect-[9/19.5]">
            <video
              src="https://www.dropbox.com/scl/fi/1klxb7gar04n5tgaclttm/cropcare_vid.mp4?rlkey=6x2ok211923n9fu15n5k0awc8&st=qw2kfam3&dl=1"
              className="w-full h-full object-cover"
              playsInline
              loop
              muted={isMuted}
              autoPlay={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    const video = document.querySelector('video');
                    if (video) {
                      if (isPlaying) {
                        video.pause();
                      } else {
                        video.play();
                      }
                    }
                  }}
                  className="text-white hover:text-green-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-green-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
          <Code className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="font-medium text-gray-800">Technical Expertise</h3>
            <p className="text-gray-600">Flutter, Dart, Android Studio, Web Development</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
          <School className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-medium text-gray-800">Academic Background</h3>
            <p className="text-gray-600">Physics Teacher with a passion for mathematical equations and physical phenomena</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://www.dropbox.com/scl/fi/jlmnsyal4okvoj4j4n500/CropCare.apk?rlkey=qsqsji66x9w1t1kdcd2e7dqkl&st=rjldxqhp&dl=1"
            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="w-6 h-6 text-gray-600" />
            <span className="text-gray-800">Download APK</span>
          </a>

          <a
            href="https://www.dropbox.com/scl/fi/1klxb7gar04n5tgaclttm/cropcare_vid.mp4?rlkey=6x2ok211923n9fu15n5k0awc8&st=qw2kfam3&dl=1"
            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Video className="w-6 h-6 text-gray-600" />
            <span className="text-gray-800">Download Video</span>
          </a>
        </div>

        <div className="space-y-3">
          <a
            href="mailto:ahmedazaki0125@gmail.com"
            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-6 h-6 text-gray-600" />
            <span className="text-gray-800">ahmedazaki0125@gmail.com</span>
          </a>

          <a
            href="https://www.linkedin.com/in/ahmed-azam-320a98200"
            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 text-gray-600" />
            <span className="text-gray-800">LinkedIn Profile</span>
          </a>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Bio</h3>
          <p className="text-gray-600">
            A multifaceted professional combining technical expertise with educational passion. As a skilled developer proficient in Flutter, Dart, and web technologies, I create innovative solutions while maintaining my role as a physics educator. My unique background allows me to bridge the gap between technology and education, bringing analytical thinking and problem-solving skills from both domains to create impactful applications like CropCare.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperInfo;