'use client';

import { useState, useEffect } from 'react';

interface VideoConferenceProps {
  onClose: () => void;
}

export default function VideoConference({ onClose }: VideoConferenceProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [meetingId] = useState('123-456-789');

  const handleJoinMeeting = async () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  const handleLeaveMeeting = () => {
    setIsConnected(false);
    onClose();
  };

  if (isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Video Session with Dr. Sarah Johnson</h3>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Connected
            </span>
            <span className="text-sm text-gray-500">Meeting ID: {meetingId}</span>
          </div>
        </div>

        {/* Video Area */}
        <div className="relative bg-gray-900 rounded-lg mb-6" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👩‍⚕️</span>
              </div>
              <p className="text-lg font-medium">Dr. Sarah Johnson</p>
              <p className="text-sm opacity-75">Your Coach</p>
            </div>
          </div>
          
          {/* Self video (small overlay) */}
          <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white">
            <div className="flex items-center justify-center h-full">
              {isVideoOff ? (
                <span className="text-white text-2xl">📷</span>
              ) : (
                <span className="text-white text-2xl">🙋‍♀️</span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full ${
              isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
            } text-white transition-colors`}
          >
            {isMuted ? '🔇' : '🎤'}
          </button>
          
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3 rounded-full ${
              isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
            } text-white transition-colors`}
          >
            {isVideoOff ? '📷' : '📹'}
          </button>
          
          <button
            onClick={handleLeaveMeeting}
            className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            📞
          </button>
          
          <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-colors">
            💬
          </button>
          
          <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-colors">
            🖥️
          </button>
        </div>

        {/* Session Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Session Duration: 45 minutes</p>
              <p className="text-sm text-gray-600">Started at 2:00 PM</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">Next Session</p>
              <p className="text-sm text-gray-600">Friday, Dec 20 at 10:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🎥</span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Video Coaching Session</h3>
        <p className="text-gray-600 mb-6">
          Connect with Dr. Sarah Johnson for your personalized coaching session
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">Meeting ID</p>
              <p className="text-gray-600">{meetingId}</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Duration</p>
              <p className="text-gray-600">60 minutes</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Scheduled</p>
              <p className="text-gray-600">Today, 2:00 PM</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Type</p>
              <p className="text-gray-600">Wellness Consultation</p>
            </div>
          </div>
        </div>

        {isConnecting ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Connecting to your session...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleJoinMeeting}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Join Video Session
            </button>
            
            <div className="flex space-x-4">
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                Test Audio/Video
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                Reschedule
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-left">
          <h4 className="font-medium text-gray-900 mb-2">Session Agenda</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Review progress from last session</li>
            <li>• Discuss current challenges and goals</li>
            <li>• Nutrition and lifestyle recommendations</li>
            <li>• Plan action steps for the week</li>
            <li>• Q&A and next session planning</li>
          </ul>
        </div>
      </div>
    </div>
  );
}