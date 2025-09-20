'use client';

import { useState } from 'react';

export default function ProgressTracking() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const lifestylePillars = [
    {
      id: 'nutrition',
      name: 'Nutrition',
      icon: '🥗',
      progress: 75,
      color: 'bg-green-500',
      actionSteps: [
        { id: 1, text: 'Eat 5 servings of vegetables daily', completed: true },
        { id: 2, text: 'Drink 8 glasses of water', completed: true },
        { id: 3, text: 'Take omega-3 supplement', completed: false },
        { id: 4, text: 'Avoid processed foods', completed: true },
        { id: 5, text: 'Eat protein with every meal', completed: false },
        { id: 6, text: 'Practice mindful eating', completed: true }
      ]
    },
    {
      id: 'exercise',
      name: 'Exercise',
      icon: '💪',
      progress: 60,
      color: 'bg-blue-500',
      actionSteps: [
        { id: 1, text: 'Walk 10,000 steps daily', completed: true },
        { id: 2, text: 'Strength training 3x/week', completed: false },
        { id: 3, text: 'Yoga or stretching daily', completed: true },
        { id: 4, text: 'High-intensity workout 2x/week', completed: false },
        { id: 5, text: 'Take stairs instead of elevator', completed: true },
        { id: 6, text: 'Active recovery on rest days', completed: false }
      ]
    },
    {
      id: 'sleep',
      name: 'Sleep',
      icon: '😴',
      progress: 85,
      color: 'bg-purple-500',
      actionSteps: [
        { id: 1, text: 'Sleep 7-8 hours nightly', completed: true },
        { id: 2, text: 'No screens 1 hour before bed', completed: true },
        { id: 3, text: 'Keep bedroom cool and dark', completed: true },
        { id: 4, text: 'Consistent sleep schedule', completed: true },
        { id: 5, text: 'Morning sunlight exposure', completed: false },
        { id: 6, text: 'Relaxation routine before bed', completed: true }
      ]
    },
    {
      id: 'stress',
      name: 'Stress Management',
      icon: '🧘',
      progress: 70,
      color: 'bg-indigo-500',
      actionSteps: [
        { id: 1, text: 'Daily meditation (10 minutes)', completed: true },
        { id: 2, text: 'Deep breathing exercises', completed: true },
        { id: 3, text: 'Journal thoughts and feelings', completed: false },
        { id: 4, text: 'Practice gratitude daily', completed: true },
        { id: 5, text: 'Set healthy boundaries', completed: false },
        { id: 6, text: 'Regular nature walks', completed: true }
      ]
    },
    {
      id: 'relationships',
      name: 'Relationships',
      icon: '❤️',
      progress: 80,
      color: 'bg-pink-500',
      actionSteps: [
        { id: 1, text: 'Quality time with loved ones', completed: true },
        { id: 2, text: 'Express appreciation daily', completed: true },
        { id: 3, text: 'Active listening practice', completed: true },
        { id: 4, text: 'Schedule regular date nights', completed: false },
        { id: 5, text: 'Connect with friends weekly', completed: true },
        { id: 6, text: 'Practice empathy and understanding', completed: true }
      ]
    },
    {
      id: 'purpose',
      name: 'Purpose & Growth',
      icon: '🌱',
      progress: 65,
      color: 'bg-yellow-500',
      actionSteps: [
        { id: 1, text: 'Set weekly personal goals', completed: true },
        { id: 2, text: 'Learn something new daily', completed: false },
        { id: 3, text: 'Volunteer or help others', completed: true },
        { id: 4, text: 'Reflect on values and priorities', completed: false },
        { id: 5, text: 'Practice creative activities', completed: true },
        { id: 6, text: 'Plan for future aspirations', completed: false }
      ]
    }
  ];

  const toggleActionStep = (pillarId: string, stepId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggling step ${stepId} in pillar ${pillarId}`);
  };

  const overallProgress = Math.round(
    lifestylePillars.reduce((sum, pillar) => sum + pillar.progress, 0) / lifestylePillars.length
  );

  if (selectedPillar) {
    const pillar = lifestylePillars.find(p => p.id === selectedPillar);
    if (!pillar) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{pillar.icon}</span>
            <h2 className="text-2xl font-bold text-gray-900">{pillar.name}</h2>
          </div>
          <button
            onClick={() => setSelectedPillar(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to Overview
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
            <span className="text-2xl font-bold text-gray-900">{pillar.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`${pillar.color} h-3 rounded-full transition-all duration-300`}
              style={{ width: `${pillar.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Steps</h3>
          <div className="space-y-3">
            {pillar.actionSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleActionStep(pillar.id, step.id)}
              >
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => {}}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className={`flex-1 ${step.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                  {step.text}
                </span>
                {step.completed && <span className="text-green-500">✓</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {pillar.actionSteps.filter(step => step.completed).length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {pillar.actionSteps.filter(step => !step.completed).length}
              </p>
              <p className="text-sm text-gray-600">Remaining</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Progress Overview</h2>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-4">
            <span className="text-3xl font-bold">{overallProgress}%</span>
          </div>
          <p className="text-lg text-gray-600">Overall Wellness Progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lifestylePillars.map((pillar) => (
          <div
            key={pillar.id}
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedPillar(pillar.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{pillar.icon}</span>
                <h3 className="font-semibold text-gray-900">{pillar.name}</h3>
              </div>
              <span className="text-lg font-bold text-gray-900">{pillar.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className={`${pillar.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${pillar.progress}%` }}
              ></div>
            </div>
            
            <div className="text-sm text-gray-600">
              {pillar.actionSteps.filter(step => step.completed).length} of {pillar.actionSteps.length} steps completed
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Achievements</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-green-500">🎉</span>
            <span className="text-gray-900">Completed 5 days of meditation</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-blue-500">💪</span>
            <span className="text-gray-900">Reached 10,000 steps for 6 days</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <span className="text-purple-500">😴</span>
            <span className="text-gray-900">Maintained consistent sleep schedule</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress Chart</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {[65, 68, 72, 75].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-indigo-500 rounded-t"
                style={{ height: `${(value / 100) * 200}px` }}
              ></div>
              <span className="text-sm text-gray-600 mt-2">Week {index + 1}</span>
              <span className="text-xs text-gray-500">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}