import React from 'react';
import { useStudents } from '../../hooks/useStudents';
import { StudentTable } from '../students/StudentTable';
import { Pagination } from '../common/Pagination';

export const StudentsTab: React.FC = () => {
  const {
    students,
    loading,
    isSearching,
    currentPage,
    totalCount,
    pageSize,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    fetchStudents,
  } = useStudents();

  const handleSearch = () => {
    fetchStudents();
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 flex space-x-4">
          <input
            type="text"
            placeholder="Search by Student ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
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
        <StudentTable students={students} loading={loading} />
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};