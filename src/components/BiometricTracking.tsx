'use client';

import { useState } from 'react';

export default function BiometricTracking() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState({
    value: '',
    notes: '',
    timestamp: new Date().toISOString().slice(0, 16)
  });

  const biometricTypes = [
    {
      id: 'blood_sugar',
      name: 'Blood Sugar',
      icon: '🩸',
      unit: 'mg/dL',
      color: 'bg-red-500',
      normalRange: '70-100',
      currentValue: 95,
      trend: 'stable',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'ketones',
      name: 'Ketones',
      icon: '🧪',
      unit: 'mmol/L',
      color: 'bg-purple-500',
      normalRange: '0.5-3.0',
      currentValue: 1.2,
      trend: 'up',
      lastUpdated: '4 hours ago'
    },
    {
      id: 'heart_rate',
      name: 'Heart Rate',
      icon: '❤️',
      unit: 'bpm',
      color: 'bg-pink-500',
      normalRange: '60-100',
      currentValue: 72,
      trend: 'stable',
      lastUpdated: '1 hour ago'
    },
    {
      id: 'sleep',
      name: 'Sleep Quality',
      icon: '😴',
      unit: 'hours',
      color: 'bg-indigo-500',
      normalRange: '7-9',
      currentValue: 7.5,
      trend: 'up',
      lastUpdated: 'This morning'
    },
    {
      id: 'hydration',
      name: 'Hydration',
      icon: '💧',
      unit: 'glasses',
      color: 'bg-blue-500',
      normalRange: '8-10',
      currentValue: 6,
      trend: 'down',
      lastUpdated: '30 minutes ago'
    },
    {
      id: 'exercise',
      name: 'Exercise',
      icon: '🏃‍♀️',
      unit: 'minutes',
      color: 'bg-green-500',
      normalRange: '30-60',
      currentValue: 45,
      trend: 'up',
      lastUpdated: 'Yesterday'
    },
    {
      id: 'menstrual',
      name: 'Menstrual Cycle',
      icon: '🌸',
      unit: 'day',
      color: 'bg-pink-400',
      normalRange: '21-35',
      currentValue: 14,
      trend: 'stable',
      lastUpdated: 'Today'
    },
    {
      id: 'food_log',
      name: 'Food Log',
      icon: '🍽️',
      unit: 'meals',
      color: 'bg-orange-500',
      normalRange: '3-5',
      currentValue: 4,
      trend: 'stable',
      lastUpdated: '2 hours ago'
    }
  ];

  const handleAddEntry = (metricId: string) => {
    if (!newEntry.value) return;
    
    // In a real app, this would save to backend and share with coach
    console.log(`Adding entry for ${metricId}:`, newEntry);
    alert('Entry added and shared with your coach!');
    
    setNewEntry({
      value: '',
      notes: '',
      timestamp: new Date().toISOString().slice(0, 16)
    });
    setSelectedMetric(null);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  if (selectedMetric) {
    const metric = biometricTypes.find(m => m.id === selectedMetric);
    if (!metric) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{metric.icon}</span>
            <h2 className="text-2xl font-bold text-gray-900">{metric.name}</h2>
          </div>
          <button
            onClick={() => setSelectedMetric(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to Overview
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Entry</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value ({metric.unit})
              </label>
              <input
                type="number"
                value={newEntry.value}
                onChange={(e) => setNewEntry({...newEntry, value: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={`Enter ${metric.name.toLowerCase()} value`}
              />
              <p className="text-sm text-gray-500 mt-1">Normal range: {metric.normalRange} {metric.unit}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={newEntry.timestamp}
                onChange={(e) => setNewEntry({...newEntry, timestamp: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Any additional notes about this reading..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => handleAddEntry(metric.id)}
                disabled={!newEntry.value}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add Entry & Share with Coach
              </button>
              <button
                onClick={() => setSelectedMetric(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h3>
          <div className="space-y-3">
            {[
              { date: 'Today, 2:30 PM', value: metric.currentValue, notes: 'Feeling good' },
              { date: 'Yesterday, 8:00 AM', value: metric.currentValue - 2, notes: 'Morning reading' },
              { date: '2 days ago, 6:00 PM', value: metric.currentValue + 1, notes: 'After workout' }
            ].map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{entry.value} {metric.unit}</p>
                  <p className="text-sm text-gray-600">{entry.date}</p>
                  {entry.notes && <p className="text-sm text-gray-500">{entry.notes}</p>}
                </div>
                <div className="text-right">
                  <span className="text-green-600 text-sm">✓ Shared</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trend</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {[92, 95, 88, 94, 96, 93, 95].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full ${metric.color} rounded-t opacity-75`}
                  style={{ height: `${(value / 120) * 150}px` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
                <span className="text-xs text-gray-500">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Biometric Tracking</h2>
        <p className="text-gray-600 mb-6">
          Track your key health metrics and automatically share them with your coach for personalized guidance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {biometricTypes.map((metric) => (
            <div
              key={metric.id}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{metric.icon}</span>
                <span className={`${getTrendColor(metric.trend)}`}>
                  {getTrendIcon(metric.trend)}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1">{metric.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {metric.currentValue} <span className="text-sm font-normal text-gray-600">{metric.unit}</span>
              </p>
              <p className="text-xs text-gray-500 mb-2">Range: {metric.normalRange}</p>
              <p className="text-xs text-gray-400">{metric.lastUpdated}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
            <div className="text-center">
              <span className="text-3xl mb-2 block">📸</span>
              <span className="text-sm font-medium text-gray-700">Upload Photo</span>
              <span className="text-xs text-gray-500 block">Food, supplements, etc.</span>
            </div>
          </button>
          
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
            <div className="text-center">
              <span className="text-3xl mb-2 block">📱</span>
              <span className="text-sm font-medium text-gray-700">Connect Device</span>
              <span className="text-xs text-gray-500 block">Sync wearables</span>
            </div>
          </button>
          
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
            <div className="text-center">
              <span className="text-3xl mb-2 block">📊</span>
              <span className="text-sm font-medium text-gray-700">View Reports</span>
              <span className="text-xs text-gray-500 block">Monthly summaries</span>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Coach Insights</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
            <p className="font-medium text-green-800">Great progress on blood sugar stability!</p>
            <p className="text-sm text-green-700 mt-1">
              Your morning readings have been consistently in the optimal range. Keep up the great work with your nutrition plan.
            </p>
            <p className="text-xs text-green-600 mt-2">- Dr. Sarah Johnson, 2 hours ago</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
            <p className="font-medium text-blue-800">Hydration reminder</p>
            <p className="text-sm text-blue-700 mt-1">
              I noticed your hydration has been lower this week. Try setting hourly reminders to reach your daily goal.
            </p>
            <p className="text-xs text-blue-600 mt-2">- Dr. Sarah Johnson, Yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
}