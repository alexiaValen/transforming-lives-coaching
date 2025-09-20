'use client';

import { useState } from 'react';

export default function DailyCheckin() {
  const [checkinData, setCheckinData] = useState({
    energy: 7,
    mood: 8,
    stress: 4,
    sleep: 7,
    journalEntry: '',
    gratitude: '',
    dailyAction: '',
    selectedAffirmation: '',
    completedActions: [] as string[]
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const affirmations = [
    "I am worthy of health and happiness",
    "My body is healing and getting stronger every day",
    "I choose nourishing foods that fuel my body",
    "I am in control of my health journey",
    "Every small step I take matters",
    "I trust my body's wisdom",
    "I am grateful for my body and all it does for me",
    "I deserve to feel energized and vibrant"
  ];

  const dailyActions = [
    "Drink 8 glasses of water",
    "Take a 10-minute walk",
    "Practice deep breathing for 5 minutes",
    "Eat a serving of vegetables",
    "Write in gratitude journal",
    "Take supplements as prescribed",
    "Get 15 minutes of sunlight",
    "Practice mindful eating"
  ];

  const scriptures = [
    {
      verse: "3 John 1:2",
      text: "Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well."
    },
    {
      verse: "1 Corinthians 6:19-20",
      text: "Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies."
    },
    {
      verse: "Psalm 139:14",
      text: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well."
    }
  ];

  const todaysScripture = scriptures[new Date().getDate() % scriptures.length];

  const handleSliderChange = (field: string, value: number) => {
    setCheckinData(prev => ({ ...prev, [field]: value }));
  };

  const handleActionToggle = (action: string) => {
    setCheckinData(prev => ({
      ...prev,
      completedActions: prev.completedActions.includes(action)
        ? prev.completedActions.filter(a => a !== action)
        : [...prev.completedActions, action]
    }));
  };

  const handleSubmit = () => {
    // In a real app, this would save to backend
    console.log('Daily check-in submitted:', checkinData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const getSliderColor = (value: number) => {
    if (value <= 3) return 'bg-red-500';
    if (value <= 6) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getEmojiForValue = (field: string, value: number) => {
    const emojis = {
      energy: ['😴', '😪', '😐', '🙂', '😊', '😄', '🤩', '⚡', '🔥', '🚀'],
      mood: ['😢', '😞', '😕', '😐', '🙂', '😊', '😄', '😁', '🤩', '🥳'],
      stress: ['😌', '😌', '😐', '😐', '😰', '😰', '😫', '😫', '😵', '🤯'],
      sleep: ['😵', '😴', '😪', '😐', '🙂', '😊', '😄', '😁', '🤩', '✨']
    };
    return emojis[field as keyof typeof emojis]?.[value - 1] || '😐';
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check-in Complete!</h2>
          <p className="text-gray-600">Thank you for taking time to reflect on your wellness journey today.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Daily Check-in</h2>
        <p className="text-gray-600 mb-6">
          Take a moment to reflect on your day and set intentions for your wellness journey.
        </p>

        {/* Today's Scripture */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Today's Scripture</h3>
          <p className="text-blue-800 italic mb-2">"{todaysScripture.text}"</p>
          <p className="text-blue-700 text-sm font-medium">- {todaysScripture.verse}</p>
        </div>

        {/* Mood & Energy Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[
            { key: 'energy', label: 'Energy Level', description: 'How energetic do you feel today?' },
            { key: 'mood', label: 'Mood', description: 'How is your overall mood?' },
            { key: 'stress', label: 'Stress Level', description: 'How stressed do you feel?' },
            { key: 'sleep', label: 'Sleep Quality', description: 'How well did you sleep last night?' }
          ].map(({ key, label, description }) => (
            <div key={key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{label}</h4>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
                <div className="text-3xl">
                  {getEmojiForValue(key, checkinData[key as keyof typeof checkinData] as number)}
                </div>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={checkinData[key as keyof typeof checkinData] as number}
                  onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span className="font-medium text-lg">
                    {checkinData[key as keyof typeof checkinData] as number}/10
                  </span>
                  <span>10</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Journaling */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Journal Reflection</h4>
          <p className="text-sm text-gray-600 mb-3">How are you feeling today? What's on your mind?</p>
          <textarea
            value={checkinData.journalEntry}
            onChange={(e) => setCheckinData(prev => ({ ...prev, journalEntry: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Write about your thoughts, feelings, challenges, or wins from today..."
          />
        </div>

        {/* Gratitude */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Gratitude Practice</h4>
          <p className="text-sm text-gray-600 mb-3">What are you grateful for today?</p>
          <input
            type="text"
            value={checkinData.gratitude}
            onChange={(e) => setCheckinData(prev => ({ ...prev, gratitude: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="I am grateful for..."
          />
        </div>

        {/* Daily Affirmation */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Today's Affirmation</h4>
          <p className="text-sm text-gray-600 mb-3">Choose an affirmation to carry with you today</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {affirmations.map((affirmation, index) => (
              <button
                key={index}
                onClick={() => setCheckinData(prev => ({ ...prev, selectedAffirmation: affirmation }))}
                className={`p-3 text-left rounded-lg border transition-colors ${
                  checkinData.selectedAffirmation === affirmation
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <span className="text-sm">{affirmation}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Actions */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Daily Action Steps</h4>
          <p className="text-sm text-gray-600 mb-3">Check off the healthy actions you've completed today</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {dailyActions.map((action, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checkinData.completedActions.includes(action)}
                  onChange={() => handleActionToggle(action)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className={`text-sm ${
                  checkinData.completedActions.includes(action) 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-700'
                }`}>
                  {action}
                </span>
                {checkinData.completedActions.includes(action) && (
                  <span className="text-green-500 text-sm">✓</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Tomorrow's Intention */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Tomorrow's Intention</h4>
          <p className="text-sm text-gray-600 mb-3">What's one thing you want to focus on tomorrow?</p>
          <input
            type="text"
            value={checkinData.dailyAction}
            onChange={(e) => setCheckinData(prev => ({ ...prev, dailyAction: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Tomorrow I will focus on..."
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Complete Daily Check-in
        </button>
      </div>

      {/* Check-in Streak */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Check-in Streak</h3>
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">7</div>
            <div className="text-sm text-gray-600">Days</div>
          </div>
          <div className="text-4xl">🔥</div>
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900">Great job!</div>
            <div className="text-sm text-gray-600">Keep it up</div>
          </div>
        </div>
      </div>

      {/* Previous Check-ins */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Check-ins</h3>
        <div className="space-y-3">
          {[
            { date: 'Yesterday', energy: 8, mood: 7, completed: 6 },
            { date: '2 days ago', energy: 6, mood: 8, completed: 5 },
            { date: '3 days ago', energy: 9, mood: 9, completed: 7 }
          ].map((checkin, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{checkin.date}</p>
                <p className="text-sm text-gray-600">
                  Energy: {checkin.energy}/10 • Mood: {checkin.mood}/10
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{checkin.completed}/8 actions</p>
                <p className="text-xs text-gray-500">completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}