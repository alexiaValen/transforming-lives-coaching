'use client';


import CoachingServices from '@/components/CoachingServices';
import ProgressTracking from '@/components/ProgressTracking';
import ClientResources from '@/components/ClientResources';
import BiometricTracking from '@/components/BiometricTracking';
import DailyCheckin from '@/components/DailyCheckin';
import Messaging from '@/components/Messaging';
import GlucoseTracker from '@/components/GlucoseTracker';
import React, { useState, useEffect } from 'react';

export default function Home() {




  return <GlucoseTracker />;
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'coaching':
//         return <CoachingServices />;
//       case 'progress':
//         return <ProgressTracking />;
//       case 'resources':
//         return <ClientResources />;
//       case 'biometrics':
//         return <BiometricTracking />;
//       case 'checkin':
//         return <DailyCheckin />;
//       case 'messaging':
//         return <Messaging />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-gray-900">Transforming Lives Coaching</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
//                 Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex space-x-8">
//             {[
//               { id: 'dashboard', label: 'Dashboard' },
//               { id: 'coaching', label: 'Coaching' },
//               { id: 'progress', label: 'Progress' },
//               { id: 'resources', label: 'Resources' },
//               { id: 'biometrics', label: 'Biometrics' },
//               { id: 'checkin', label: 'Daily Check-in' },
//               { id: 'messaging', label: 'Messages' },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === tab.id
//                     ? 'border-indigo-500 text-indigo-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {renderContent()}
//       </main>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Wellness Journey</h2>
//         <p className="text-gray-600 mb-6">
//           Transform your life with personalized functional coaching, comprehensive tracking, and expert guidance.
//         </p>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
//             <h3 className="text-lg font-semibold mb-2">One-on-One Coaching</h3>
//             <p className="text-blue-100 mb-4">Connect with your coach via video, voice, and messaging</p>
//             <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
//               Schedule Session
//             </button>
//           </div>
          
//           <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
//             <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
//             <p className="text-green-100 mb-4">Monitor your journey across 6 lifestyle pillars</p>
//             <button className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors">
//               View Progress
//             </button>
//           </div>
          
//           <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
//             <h3 className="text-lg font-semibold mb-2">Daily Check-in</h3>
//             <p className="text-purple-100 mb-4">Track mood, energy, and daily action steps</p>
//             <button className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition-colors">
//               Check In
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
//           <div className="space-y-3">
//             <div className="flex items-center space-x-3">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span className="text-sm text-gray-600">Completed morning meditation</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//               <span className="text-sm text-gray-600">Logged biometric data</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//               <span className="text-sm text-gray-600">Scheduled coaching session</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
//           <div className="space-y-3">
//             <div className="border-l-4 border-indigo-500 pl-4">
//               <p className="font-medium text-gray-900">Nutrition Consultation</p>
//               <p className="text-sm text-gray-600">Tomorrow at 2:00 PM</p>
//             </div>
//             <div className="border-l-4 border-green-500 pl-4">
//               <p className="font-medium text-gray-900">Wellness Check-in</p>
//               <p className="text-sm text-gray-600">Friday at 10:00 AM</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
}
