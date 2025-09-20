'use client';

import { useState } from 'react';

interface BookingFormProps {
  onClose: () => void;
}

export default function BookingForm({ onClose }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('consultation');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sessionTypes = [
    { id: 'consultation', name: 'Initial Consultation', duration: '90 min', price: '$200' },
    { id: 'followup', name: 'Follow-up Session', duration: '60 min', price: '$150' },
    { id: 'nutrition', name: 'Nutrition Review', duration: '45 min', price: '$125' },
    { id: 'wellness', name: 'Wellness Check-in', duration: '30 min', price: '$100' }
  ];

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Session booked successfully! You will receive a confirmation email shortly.');
      onClose();
    }, 2000);
  };

  const selectedSessionType = sessionTypes.find(type => type.id === sessionType);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Schedule Your Session</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Session Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Session Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sessionTypes.map((type) => (
              <div
                key={type.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  sessionType === type.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSessionType(type.id)}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="sessionType"
                    value={type.id}
                    checked={sessionType === type.id}
                    onChange={(e) => setSessionType(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{type.name}</p>
                    <p className="text-sm text-gray-600">{type.duration} • {type.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Times
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-3 text-sm rounded-md border transition-colors ${
                  selectedTime === time
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Any specific topics you'd like to discuss or questions you have..."
          />
        </div>

        {/* Session Summary */}
        {selectedDate && selectedTime && selectedSessionType && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Session Summary</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Type:</span> {selectedSessionType.name}</p>
              <p><span className="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Time:</span> {selectedTime}</p>
              <p><span className="font-medium">Duration:</span> {selectedSessionType.duration}</p>
              <p><span className="font-medium">Price:</span> {selectedSessionType.price}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={!selectedDate || !selectedTime || isSubmitting}
            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Booking...
              </span>
            ) : (
              'Book Session'
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Coach Availability Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-blue-400">ℹ️</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Dr. Sarah Johnson is available Monday-Friday, 9 AM - 5 PM PST. 
              You'll receive a confirmation email with video call details within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}