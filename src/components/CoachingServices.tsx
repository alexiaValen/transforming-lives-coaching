'use client';

import { useState } from 'react';
import VideoConference from './VideoConference';
import BookingForm from './BookingForm';
import PaymentForm from './PaymentForm';

export default function CoachingServices() {
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    {
      id: 'video',
      title: 'Video Coaching Session',
      description: 'One-on-one video consultation with your coach',
      icon: '🎥',
      price: '$150/session'
    },
    {
      id: 'messaging',
      title: 'Message Coaching',
      description: 'Text and voice message support throughout the week',
      icon: '💬',
      price: '$75/week'
    },
    {
      id: 'booking',
      title: 'Schedule Session',
      description: 'Book your next coaching appointment',
      icon: '📅',
      price: 'Free scheduling'
    }
  ];

  const renderActiveService = () => {
    switch (activeService) {
      case 'video':
        return <VideoConference onClose={() => setActiveService(null)} />;
      case 'booking':
        return <BookingForm onClose={() => setActiveService(null)} />;
      case 'payment':
        return <PaymentForm onClose={() => setActiveService(null)} />;
      default:
        return null;
    }
  };

  if (activeService) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Coaching Services</h2>
          <button
            onClick={() => setActiveService(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to Services
          </button>
        </div>
        {renderActiveService()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Coaching Services</h2>
        <p className="text-gray-600 mb-6">
          Choose from our comprehensive coaching services designed to support your wellness journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveService(service.id)}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-indigo-600 font-medium">{service.price}</span>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Coach</h3>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl">👩‍⚕️</span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Dr. Sarah Johnson</h4>
            <p className="text-sm text-gray-600 mb-2">Certified Functional Medicine Practitioner</p>
            <p className="text-sm text-gray-600">
              Specializing in hormonal health, nutrition, and lifestyle optimization with over 10 years of experience.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Nutrition Consultation</p>
              <p className="text-sm text-gray-600">December 10, 2024 - 60 minutes</p>
            </div>
            <span className="text-green-600 text-sm font-medium">Completed</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Wellness Check-in</p>
              <p className="text-sm text-gray-600">December 5, 2024 - 30 minutes</p>
            </div>
            <span className="text-green-600 text-sm font-medium">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}