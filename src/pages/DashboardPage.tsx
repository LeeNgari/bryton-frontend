import React, { useState } from 'react';
import { Users, DollarSign } from 'lucide-react';
import { StudentsTab } from '../components/dashboard/StudentsTab';
import { SubscriptionsTab } from '../components/dashboard/SubscriptionsTab';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'subscriptions'>('students');

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'students'
                ? 'text-soft-black border-b-2 border-soft-black'
                : 'text-gray-600 hover:text-soft-black'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Students</span>
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'subscriptions'
                ? 'text-soft-black border-b-2 border-soft-black'
                : 'text-gray-600 hover:text-soft-black'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>Subscriptions</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-gray-50">
        {activeTab === 'students' ? <StudentsTab /> : <SubscriptionsTab />}
      </div>
    </div>
  );
};