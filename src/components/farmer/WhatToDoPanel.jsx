/**
 * What To Do Panel Component
 * Actionable advice for pest management
 */

import React from 'react';

const WhatToDoPanel = ({ pest }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          ✅ What To Do Now - {pest.pestName}
        </h2>
        <p className="text-amber-100 text-sm">Action plan for the next 7-10 days</p>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 space-y-6">
        {/* Scouting Advice */}
        <div className="border-b pb-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">👀</span>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">1. Scouting Advice</h3>
              <p className="text-gray-600 text-xs md:text-sm mt-1">
                Walk your field 2-3 times per week. Check at least 5 locations (4 corners + center).
              </p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg ml-10">
            <p className="text-gray-800 text-sm font-medium">{pest.scoutingAdvice}</p>
          </div>
        </div>

        {/* Prevention Steps */}
        <div className="border-b pb-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">2. Prevention & Management Steps</h3>
              <p className="text-gray-600 text-xs md:text-sm mt-1">
                Actions to reduce pest pressure and manage the population.
              </p>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg ml-10">
            <p className="text-gray-800 text-sm font-medium">{pest.preventionSteps}</p>
          </div>
        </div>

        {/* Control Readiness */}
        <div>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">🚀</span>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">3. Control Readiness & Next Steps</h3>
              <p className="text-gray-600 text-xs md:text-sm mt-1">
                Prepare equipment and inputs. Know when to act.
              </p>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg ml-10">
            <p className="text-gray-800 text-sm font-medium">{pest.controlReadiness}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
          <p className="font-bold text-gray-800 text-sm mb-3">⏰ Timeline for Action</p>
          <div className="space-y-2 text-sm">
            <div className="flex gap-3">
              <span className="font-semibold text-gray-700 min-w-fit">Days 1–3:</span>
              <span className="text-gray-600">
                Increase scouting intensity. Start prevention measures if applicable.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-gray-700 min-w-fit">Days 4–7:</span>
              <span className="text-gray-600">
                Monitor weather. Prepare control inputs (if needed). Alert your extension officer.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-gray-700 min-w-fit">Days 7–10:</span>
              <span className="text-gray-600">
                Be ready to apply controls if pest population threshold is reached (consult advisor).
              </span>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="font-semibold text-blue-900 text-sm mb-2">📞 Need Help?</p>
          <p className="text-blue-800 text-xs md:text-sm">
            Contact your local agricultural extension officer or take a photo and upload it to get confirmation
            from our experts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatToDoPanel;
