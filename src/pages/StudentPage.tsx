import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Student } from '../types';
import { Spinner } from '../components/common/Spinner';

const useStudent = (StudentId: string | undefined) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!StudentId) return;
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/students?filters[StudentId][$eq]=${StudentId}&populate=*`);
        if (data.data.length > 0) {
          setStudent(data.data[0]);
        } else {
          setStudent(null);
        }
      } catch (error) {
        console.error('Error fetching student:', error);
      }
      setLoading(false);
    };

    fetchStudent();
  }, [StudentId]);

  return { student, loading };
}

export const StudentPage = () => {
  const { StudentId } = useParams<{ StudentId: string }>();
  const { student, loading } = useStudent(StudentId);

  console.log("StudentId received in student page", StudentId)
  const navigate = useNavigate();

  if (loading) {
    return <Spinner />;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{student.Name}</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Back
          </button>
        </div>
        <p className="mb-2"><span className="font-semibold">Student ID:</span> {student.StudentId}</p>
        <p className="mb-4"><span className="font-semibold">Active:</span> {student.Active ? 'Yes' : 'No'}</p>

        <h2 className="text-xl font-bold mt-6 mb-4">Receipts</h2>
        <div className="overflow-x-auto">
          <div className="min-w-full hidden md:table">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {student.receipts.map((receipt) => (
                  <tr key={receipt.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.ReceiptId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.PaymentDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.TotalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden">
            {student.receipts.map((receipt) => (
              <div key={receipt.id} className="border-b border-gray-200 p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Receipt ID</p>
                    <p className="text-sm font-medium text-black">{receipt.ReceiptId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Payment Date</p>
                    <p className="text-sm font-medium text-black">{receipt.PaymentDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                    <p className="text-sm font-medium text-black">{receipt.TotalAmount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-bold mt-6 mb-4">Boarding Passes</h2>
        <div className="overflow-x-auto">
          <div className="min-w-full hidden md:table">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boarding Pass ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {student.boarding_passes.map((boardingPass) => (
                  <tr key={boardingPass.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{boardingPass.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{boardingPass.semester?.Name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{boardingPass.active ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden">
            {student.boarding_passes.map((boardingPass) => (
              <div key={boardingPass.id} className="border-b border-gray-200 p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Boarding Pass ID</p>
                    <p className="text-sm font-medium text-black">{boardingPass.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Semester</p>
                    <p className="text-sm font-medium text-black">{boardingPass.semester?.Name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Active</p>
                    <p className="text-sm font-medium text-black">{boardingPass.active ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
