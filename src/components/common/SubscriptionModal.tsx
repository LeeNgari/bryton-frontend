import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Receipt, Semester, PickUpPoint, Price } from '../../types';
import api from '../../services/api';

interface SubscriptionModalProps {
  subscription: Receipt | null;
  onClose: () => void;
  onSave: (data: {
    PaymentDate: string;
    student: string;
    semester: string;
    pick_up_point: string;
    ValidUntil: string;
    TotalAmount: string;
  }) => void;
}


export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  subscription,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    student: '',
    semester: '',
    pick_up_point: '',
    ValidUntil: new Date().toISOString().split('T')[0],
    TotalAmount: '0',
  });
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [pickUpPoints, setPickUpPoints] = useState<PickUpPoint[]>([]);
  const [price, setPrices] = useState<Price []>([])

  useEffect(() => {
    // Fetch semesters
    api.get('/semesters').then(response => {
      setSemesters(response.data.data);
    });

    // Fetch pick-up points
    api.get('/pick-up-points').then(response => {
      setPickUpPoints(response.data.data);
    });

    // fetch prices
    api.get('/prices').then(response => {
      setPrices(response.data.data);
    });
  }, []);

  useEffect(() => {
    if (subscription) {
      setFormData({
        student: subscription.student?.StudentId || '',
        semester: subscription.semester?.id.toString() || '',
        pick_up_point: subscription.pick_up_point?.id.toString() || '',
        ValidUntil: subscription.ValidUntil,
        TotalAmount: subscription.TotalAmount,
      });
    }
  }, [subscription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      PaymentDate: new Date().toISOString().split('T')[0],
      student: formData.student,
      semester: formData.semester,
      pick_up_point: formData.pick_up_point,
      ValidUntil: formData.ValidUntil,
      TotalAmount: formData.TotalAmount,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-black">
            {subscription ? 'Edit Receipt' : 'Add Receipt'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Student ID *
            </label>
            <input
              type="text"
              required
              value={formData.student}
              onChange={(e) => setFormData({ ...formData, student: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              placeholder="e.g., STU001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Semester *
            </label>
            <select
              required
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            >
              <option value="">Select semester</option>
              {semesters.map(semester => (
                <option key={semester.id} value={semester.id}>{semester.Name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Pick-up Point *
            </label>
            <select
              required
              value={formData.pick_up_point}
              onChange={(e) => setFormData({ ...formData, pick_up_point: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            >
              <option value="">Select pick-up point</option>
              {pickUpPoints.map(point => (
                <option key={point.id} value={point.id}>{point.Name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Amount
            </label>
            <select
              required
              value={formData.TotalAmount}
              onChange={(e) => setFormData({ ...formData, TotalAmount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            >
              <option value="">Select pick-up point</option>
              {price.map(price => (
                <option key={price.id} value={price.TotalAmount}>{price.Name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {subscription ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
