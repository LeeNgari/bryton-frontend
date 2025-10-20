import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../../types';

interface StudentTableProps {
  students: Student[];
  loading: boolean;
}

export const StudentTable: React.FC<StudentTableProps> = ({ students, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">No students found</div>
      </div>
    );
  }

  const handleRowClick = (StudentId: string) => {
    console.log("navigating to /student/", StudentId)
    navigate(`/student/${StudentId}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full hidden md:table">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Student ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Active
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} onClick={() => handleRowClick(student.StudentId)} className="hover:bg-gray-50 cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                {student.StudentId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {student.Name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.Active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {student.Active ? 'Active' : 'Inactive'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="md:hidden divide-y divide-gray-200">
        {students.map((student) => (
          <div key={student.id} onClick={() => handleRowClick(student.StudentId)} className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Student ID</p>
                <p className="text-sm font-medium text-black">{student.StudentId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Active</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    student.Active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {student.Active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
