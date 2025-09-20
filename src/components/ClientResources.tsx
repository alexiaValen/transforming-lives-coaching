'use client';

import { useState } from 'react';

export default function ClientResources() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚' },
    { id: 'nutrition', name: 'Functional Nutrition', icon: '🥗' },
    { id: 'fasting', name: 'Therapeutic Fasting', icon: '⏰' },
    { id: 'hormones', name: 'Hormone Support', icon: '⚖️' },
    { id: 'exercise', name: 'Exercise & Movement', icon: '💪' },
    { id: 'sleep', name: 'Sleep Optimization', icon: '😴' },
    { id: 'stress', name: 'Stress Management', icon: '🧘' },
    { id: 'relationships', name: 'Relationships', icon: '❤️' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Complete Nutrition Guide',
      category: 'nutrition',
      type: 'guide',
      description: 'Comprehensive guide to functional nutrition principles and meal planning',
      downloadUrl: '#',
      isPrintable: true
    },
    {
      id: 2,
      title: 'Intermittent Fasting Starter Kit',
      category: 'fasting',
      type: 'worksheet',
      description: 'Step-by-step guide to begin therapeutic fasting safely',
      downloadUrl: '#',
      isPrintable: true
    },
    {
      id: 3,
      title: 'Hormone Balance Affirmations',
      category: 'hormones',
      type: 'affirmation',
      description: 'Daily affirmations to support hormonal health and balance',
      downloadUrl: '#',
      isPrintable: true
    },
    {
      id: 4,
      title: 'Morning Movement Routine',
      category: 'exercise',
      type: 'video',
      description: '15-minute energizing morning workout routine',
      downloadUrl: '#',
      isPrintable: false
    },
    {
      id: 5,
      title: 'Sleep Hygiene Checklist',
      category: 'sleep',
      type: 'worksheet',
      description: 'Optimize your sleep environment and bedtime routine',
      downloadUrl: '#',
      isPrintable: true
    },
    {
      id: 6,
      title: 'Stress Relief Meditation',
      category: 'stress',
      type: 'audio',
      description: '10-minute guided meditation for stress relief',
      downloadUrl: '#',
      isPrintable: false
    },
    {
      id: 7,
      title: 'Healthy Communication Guide',
      category: 'relationships',
      type: 'guide',
      description: 'Tools for improving communication in relationships',
      downloadUrl: '#',
      isPrintable: true
    },
    {
      id: 8,
      title: 'Anti-Inflammatory Meal Planner',
      category: 'nutrition',
      type: 'worksheet',
      description: 'Weekly meal planning template with anti-inflammatory recipes',
      downloadUrl: '#',
      isPrintable: true
    },
    {
      id: 9,
      title: 'Fasting Tracking Journal',
      category: 'fasting',
      type: 'worksheet',
      description: 'Track your fasting windows and how you feel',
      downloadUrl: '#',
      isPrintable: true
    },
    {
      id: 10,
      title: 'Hormone Cycle Tracker',
      category: 'hormones',
      type: 'worksheet',
      description: 'Monthly tracker for menstrual cycle and symptoms',
      downloadUrl: '#',
      isPrintable: true
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return '📖';
      case 'worksheet': return '📝';
      case 'affirmation': return '✨';
      case 'video': return '🎥';
      case 'audio': return '🎧';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'worksheet': return 'bg-green-100 text-green-800';
      case 'affirmation': return 'bg-purple-100 text-purple-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'audio': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Resources</h2>
        <p className="text-gray-600 mb-6">
          Access worksheets, guides, and affirmations to support your wellness journey. 
          All resources are available for download and printing.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </div>
                {resource.isPrintable && (
                  <span className="text-gray-400 text-sm">🖨️ Printable</span>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                  Download
                </button>
                {resource.isPrintable && (
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Print
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Featured Resources */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured This Week</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-indigo-200 rounded-lg p-4 bg-indigo-50">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🌟</span>
              <h4 className="font-medium text-gray-900">New: Hormone Reset Protocol</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Complete 30-day protocol for balancing hormones naturally
            </p>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
              Access Now
            </button>
          </div>
          
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🎯</span>
              <h4 className="font-medium text-gray-900">Popular: Meal Prep Mastery</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Time-saving meal prep strategies for busy lifestyles
            </p>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Resource Categories Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(1).map((category) => {
            const categoryCount = resources.filter(r => r.category === category.id).length;
            return (
              <div
                key={category.id}
                className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">{category.name}</h4>
                <p className="text-xs text-gray-600">{categoryCount} resources</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}