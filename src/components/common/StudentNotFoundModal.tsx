import React from 'react';

interface StudentNotFoundModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const StudentNotFoundModal: React.FC<StudentNotFoundModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-soft-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-soft-black">Student Not Found</h3>
          <p className="mt-2 text-sm text-gray-600">
            The student ID you entered does not exist. Would you like to create a new student with this ID?
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-soft-black rounded-lg hover:bg-soft-gray transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-soft-black text-white rounded-lg hover:bg-soft-gray-dark transition-colors"
          >
            Create New Student
          </button>
        </div>
      </div>
    </div>
  );
};
