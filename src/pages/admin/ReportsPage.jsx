import React from 'react';

const ReportsPage = () => {
  // Example reports
  const reports = [
    { id: 1, title: 'January 2026 System Report', date: '2026-01-29', summary: 'All systems operational. 2 active pest alerts. 5 farms monitored.' },
    { id: 2, title: 'December 2025 System Report', date: '2025-12-31', summary: 'No major incidents. 1 pest alert resolved.' },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">System Reports</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {reports.map(r => (
          <div key={r.id} className="border-b pb-2 mb-2">
            <p className="font-bold text-blue-700">{r.title}</p>
            <p className="text-xs text-gray-500">{r.date}</p>
            <p className="text-gray-700">{r.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
