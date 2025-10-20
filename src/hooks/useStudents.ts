import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { Student } from '../types';
import qs from 'qs';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = 25;

  const fetchStudents = useCallback(async () => {
    if (searchQuery) {
      setIsSearching(true);
    } else {
      setLoading(true);
    }
    try {
      const query = qs.stringify(
        {
          pagination: {
            page: currentPage,
            pageSize,
          },
          ...(searchQuery && { // Conditionally add filters
            filters: {
              StudentId: {
                $containsi: searchQuery,
              },
            },
          }),
        },
        {
          encodeValuesOnly: true,
        }
      );

      const { data } = await api.get(`/students?${query}`);

      setStudents(data.data);
      setTotalCount(data.meta.pagination.total);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

  return {
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
  };
};
