import React from 'react';
import { Receipt } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';
import { Spinner } from '../common/Spinner';

interface SubscriptionTableProps {
  subscriptions: Receipt[];
  loading: boolean;
  onEdit: (subscription: Receipt) => void;
  onDelete: (id: number) => void;
}

export const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  subscriptions,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (subscriptions.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">No subscriptions found</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full hidden md:table">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Receipt Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Student ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Pick-up Point
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Semester
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Payment Date
              </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subscriptions.map((subscription) => {
            return (
              <tr key={subscription.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                  {subscription.ReceiptId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {subscription.student?.StudentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {subscription.pick_up_point?.Name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Ksh. {subscription.TotalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {subscription.semester?.Name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(subscription.PaymentDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(subscription)}
                      className="p-1 text-gray-600 hover:text-black"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(subscription.id)}
                      className="p-1 text-gray-600 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          )}
        </tbody>
      </table>

      <div className="md:hidden divide-y divide-gray-200">
        {subscriptions.map((subscription) => {
          return (
            <div key={subscription.id} className="p-4 hover:bg-gray-50">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Receipt Number</p>
                  <p className="text-sm font-medium text-black">{subscription.ReceiptId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Student ID</p>
                  <p className="text-sm text-gray-900">{subscription.student?.StudentId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Amount</p>
                  <p className="text-sm text-gray-900">Ksh. {subscription.TotalAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Semester</p>
                  <p className="text-sm text-gray-900">{subscription.semester?.Name}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(subscription)}
                    className="p-2 text-gray-600 hover:text-black"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(subscription.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        )}
      </div>
    </div>
  );
};
