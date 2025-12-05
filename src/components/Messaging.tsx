'use client';

import { useState } from 'react';

type Message = { id: number; sender: string; content: string; timestamp: string; type: 'text' | 'voice'; duration?: string };

export default function Messaging() {
  const [selectedConversation, setSelectedConversation] = useState('coach');
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const conversations = [
    {
      id: 'coach',
      name: 'Dr. Sarah Johnson',
      role: 'Your Coach',
      avatar: '👩‍⚕️',
      lastMessage: 'Great progress on your sleep tracking!',
      lastMessageTime: '2 hours ago',
      unreadCount: 1,
      isOnline: true
    },
    {
      id: 'support',
      name: 'Support Team',
      role: 'Technical Support',
      avatar: '🛠️',
      lastMessage: 'Your account has been updated',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 'group',
      name: 'Wellness Warriors',
      role: 'Group Challenge',
      avatar: '👥',
      lastMessage: 'Sarah: Just completed my morning walk!',
      lastMessageTime: '3 hours ago',
      unreadCount: 3,
      isOnline: true
    }
  ];

  const messages: Record<string, Message[]> = {
    coach: [
      {
        id: 1,
        sender: 'coach',
        content: 'Hi! How are you feeling today? I noticed you completed your daily check-in - great job!',
        timestamp: '10:30 AM',
        type: 'text'
      },
      {
        id: 2,
        sender: 'user',
        content: 'Thank you! I\'m feeling much more energized since starting the new morning routine.',
        timestamp: '10:45 AM',
        type: 'text'
      },
      {
        id: 3,
        sender: 'coach',
        content: 'That\'s wonderful to hear! Your sleep quality scores have been consistently improving too. Keep up the great work!',
        timestamp: '11:00 AM',
        type: 'text'
      },
      {
        id: 4,
        sender: 'coach',
        content: 'I\'ve prepared a personalized meal plan based on your recent biometric data. Would you like me to send it over?',
        timestamp: '2:15 PM',
        type: 'text'
      },
      {
        id: 5,
        sender: 'coach',
        content: 'voice-message-1.mp3',
        timestamp: '2:16 PM',
        type: 'voice',
        duration: '1:23'
      }
    ],
    support: [
      {
        id: 1,
        sender: 'support',
        content: 'Hello! Your account has been successfully updated with the new features.',
        timestamp: 'Yesterday',
        type: 'text'
      }
    ],
    group: [
      {
        id: 1,
        sender: 'sarah_m',
        content: 'Just completed my morning walk! 🚶‍♀️ Who else is staying active today?',
        timestamp: '8:00 AM',
        type: 'text'
      },
      {
        id: 2,
        sender: 'mike_j',
        content: 'Great job Sarah! I just finished my yoga session 🧘‍♂️',
        timestamp: '8:15 AM',
        type: 'text'
      },
      {
        id: 3,
        sender: 'coach',
        content: 'Love seeing everyone so motivated! Remember, consistency is key. Small daily actions lead to big results! 💪',
        timestamp: '9:00 AM',
        type: 'text'
      }
    ]
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const currentMessages = messages[selectedConversation] ?? [];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send to backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop voice recording
    console.log(isRecording ? 'Stopping recording' : 'Starting recording');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                selectedConversation === conversation.id ? 'bg-indigo-50 border-indigo-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                    {conversation.avatar}
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.role}</p>
                  <p className="text-sm text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
                </div>
                
                {conversation.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
              {currentConversation?.avatar}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{currentConversation?.name}</h3>
              <p className="text-sm text-gray-600">{currentConversation?.role}</p>
            </div>
            <div className="flex-1"></div>
            {currentConversation?.id === 'coach' && (
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                Schedule Call
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                {message.sender !== 'user' && message.sender !== 'coach' && (
                  <p className="text-xs font-medium mb-1 opacity-75">{message.sender}</p>
                )}
                
                {message.type === 'voice' ? (
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      ▶️
                    </button>
                    <div className="flex-1">
                      <div className="w-full h-1 bg-white bg-opacity-20 rounded-full">
                        <div className="w-1/3 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <span className="text-xs opacity-75">{message.duration}</span>
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
                
                <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows={1}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />
            </div>
            
            <button
              onClick={handleVoiceRecord}
              className={`p-2 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {isRecording ? '⏹️' : '🎤'}
            </button>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              📤
            </button>
          </div>
          
          {isRecording && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Recording... Tap to stop</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}