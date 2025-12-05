'use client';

import { useState } from 'react';

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
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Video Session with Dr. Sarah Johnson</h3>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style={{ background: 'rgba(79,197,106,0.12)', color: 'var(--color-accent-600)' }}>
              ● Connected
            </span>
            <span className="text-sm muted">Meeting ID: {meetingId}</span>
          </div>
        </div>

        {/* Video Area */}
        <div className="relative rounded-2xl mb-6 overflow-hidden" style={{ aspectRatio: '16/9', background: 'linear-gradient(180deg, rgba(7,50,31,0.6), rgba(7,34,25,0.85))' }}>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
            <div>
              <div className="w-28 h-28 bg-green-500/90 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-4xl">👩‍⚕️</span>
              </div>
              <p className="text-lg font-medium">Dr. Sarah Johnson</p>
              <p className="text-sm opacity-80 muted">Your Coach</p>
            </div>
          </div>

          {/* Self video (small overlay) */}
          <div className="absolute bottom-4 right-4 w-36 h-28 bg-black/30 rounded-lg glass-border border border-white/6 overflow-hidden">
            <div className="flex items-center justify-center h-full text-white">
              {isVideoOff ? (
                <span className="text-2xl">📷</span>
              ) : (
                <span className="text-2xl">🙋‍♀️</span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            aria-pressed={isMuted}
            className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-white/6'} text-white transition-colors shadow-md`}
          >
            {isMuted ? '🔇' : '🎤'}
          </button>
          
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            aria-pressed={isVideoOff}
            className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-white/6'} text-white transition-colors shadow-md`}
          >
            {isVideoOff ? '📷' : '📹'}
          </button>
          
          <button
            onClick={handleLeaveMeeting}
            className="p-3 rounded-full bg-red-500 text-white transition-colors shadow-md"
          >
            📞
          </button>
          
          <button className="p-3 rounded-full bg-white/6 text-white transition-colors shadow-md">
            💬
          </button>
          
          <button className="p-3 rounded-full bg-white/6 text-white transition-colors shadow-md">
            🖥️
          </button>
        </div>

        {/* Session Info */}
        <div className="bg-white/4 rounded-xl p-4 glass-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Session Duration: 45 minutes</p>
              <p className="text-sm muted">Started at 2:00 PM</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Next Session</p>
              <p className="text-sm muted">Friday, Dec 20 at 10:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card text-center">
      <div className="w-24 h-24 bg-white/6 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
        <span className="text-4xl">🎥</span>
      </div>
      
      <h3 className="text-2xl font-bold mb-2">Video Coaching Session</h3>
      <p className="muted mb-6">Connect with Dr. Sarah Johnson for your personalized coaching session</p>

      <div className="bg-white/4 rounded-xl p-4 mb-6 glass-border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Meeting ID</p>
            <p className="muted">{meetingId}</p>
          </div>
          <div>
            <p className="font-medium">Duration</p>
            <p className="muted">60 minutes</p>
          </div>
          <div>
            <p className="font-medium">Scheduled</p>
            <p className="muted">Today, 2:00 PM</p>
          </div>
          <div>
            <p className="font-medium">Type</p>
            <p className="muted">Wellness Consultation</p>
          </div>
        </div>
      </div>

      {isConnecting ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--color-accent)' }}></div>
          <p className="muted">Connecting to your session...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleJoinMeeting}
            className="w-full btn-primary hover:opacity-95 transition-opacity"
          >
            Join Video Session
          </button>
          
          <div className="flex space-x-4">
            <button className="flex-1 btn-ghost glass-border">Test Audio/Video</button>
            <button className="flex-1 btn-ghost glass-border">Reschedule</button>
          </div>
        </div>
      )}

      <div className="mt-6 text-left">
        <h4 className="font-medium mb-2">Session Agenda</h4>
        <ul className="text-sm muted space-y-1">
          <li>• Review progress from last session</li>
          <li>• Discuss current challenges and goals</li>
          <li>• Nutrition and lifestyle recommendations</li>
          <li>• Plan action steps for the week</li>
          <li>• Q&A and next session planning</li>
        </ul>
      </div>
    </div>
  );
}