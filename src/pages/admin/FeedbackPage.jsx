import React from 'react';

const FeedbackPage = () => {
  // Example feedback data
  const feedback = [
    { id: 1, name: 'John Doe', message: 'Great dashboard, very helpful!', date: '2026-01-20' },
    { id: 2, name: 'Jane Smith', message: 'Would love more pest details.', date: '2026-01-22' },
    { id: 3, name: 'Paul Farmer', message: 'Map is very useful for my farm.', date: '2026-01-25' },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Farmer Feedback</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {feedback.map(f => (
          <div key={f.id} className="border-b pb-2 mb-2">
            <p className="font-medium text-green-700">{f.name}</p>
            <p className="text-gray-700">{f.message}</p>
            <p className="text-xs text-gray-500">{f.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
