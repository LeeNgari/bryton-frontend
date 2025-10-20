import React, { useState } from 'react';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { SubscriptionTable } from '../subscriptions/SubscriptionTable';
import { Pagination } from '../common/Pagination';
import { SubscriptionModal } from '../common/SubscriptionModal';
import { ConfirmModal } from '../common/ConfirmModal';
import { StudentNotFoundModal } from '../common/StudentNotFoundModal';
import { Receipt } from '../../types';
import api from '../../services/api';

export const SubscriptionsTab: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Receipt | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showStudentNotFoundModal, setShowStudentNotFoundModal] = useState(false);
  const [receiptData, setReceiptData] = useState<Partial<Receipt> | null>(null);

  const {
    subscriptions,
    loading,
    isSearching,
    currentPage,
    totalCount,
    pageSize,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    fetchSubscriptions,
  } = useSubscriptions();

  const handleSave = async (data: Partial<Receipt>) => {
    try {
      const { data: studentResponse } = await api.get(`/students?filters[StudentId][$eq]=${data.student}`);
      if (studentResponse.data.length === 0) {
        setReceiptData(data);
        setShowStudentNotFoundModal(true);
        return;
      }
      const studentId = studentResponse.data[0].id;

       const newReceiptData = {
          PaymentDate: data.PaymentDate,
          TotalAmount: data.TotalAmount,
          student: studentId,
          semester: Number(data.semester),
          pick_up_point: Number(data.pick_up_point),
        };

      if (editingSubscription) {
        await api.put(`/receipts/${editingSubscription.id}`, { data: newReceiptData });
      } else {
        await api.post('/receipts', { data: newReceiptData });
      }

      setShowModal(false);
      setEditingSubscription(null);
      fetchSubscriptions();
    } catch (error) {
      console.error('Error saving receipt:', error);
      alert('Error saving receipt');
    }
  };

  const handleCreateStudentAndReceipt = async () => {
    if (!receiptData) return;

    try {
      // Create a new student
      const { data: newStudentResponse } = await api.post('/students', {
        data: {
          StudentId: receiptData.student,
          Name: receiptData.student, // You might want to improve how the student name is handled
          Active: true,
        },
      });

      const newStudentId = newStudentResponse.data.id;

      const newReceiptData = {
        PaymentDate: receiptData.PaymentDate,
        TotalAmount: receiptData.TotalAmount,
        student: newStudentId,
        semester: Number(receiptData.semester),
        pick_up_point: Number(receiptData.pick_up_point),
      };

      // Create a new receipt
      await api.post('/receipts', { data: newReceiptData });

      setShowStudentNotFoundModal(false);
      setShowModal(false);
      setEditingSubscription(null);
      fetchSubscriptions();
    } catch (error) {
      console.error('Error creating student and receipt:', error);
      alert('Error creating student and receipt');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      await api.delete(`/receipts/${deletingId}`);
      setDeletingId(null);
      fetchSubscriptions();
    } catch (error) {
      console.error('Error deleting receipt:', error);
      alert('Error deleting receipt');
    }
  };

  const handleSearch = () => {
    fetchSubscriptions();
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <input
              type="text"
              placeholder="Search by Receipt ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors mb-4 sm:mb-0"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                'Search'
              )}
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                setEditingSubscription(null);
                setShowModal(true);
              }}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Add Subscription
            </button>
          </div>
        </div>
        <SubscriptionTable
          subscriptions={subscriptions}
          loading={loading}
          onEdit={(subscription) => {
            setEditingSubscription(subscription);
            setShowModal(true);
          }}
          onDelete={setDeletingId}
        />
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {showModal && (
        <SubscriptionModal
          subscription={editingSubscription}
          onClose={() => {
            setShowModal(false);
            setEditingSubscription(null);
          }}
          onSave={handleSave}
        />
      )}

      {deletingId && (
        <ConfirmModal
          title="Delete Receipt"
          message="Are you sure you want to delete this receipt? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}

      {showStudentNotFoundModal && (
        <StudentNotFoundModal
          studentId={receiptData?.student?.toString() || ''}
          onCancel={() => setShowStudentNotFoundModal(false)}
          onCreateStudent={handleCreateStudentAndReceipt}
        />
      )}
    </div>
  );
};