import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { Receipt } from '../types';
import qs from 'qs';

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = 25;

  const fetchSubscriptions = useCallback(async () => {
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
              ReceiptId: {
                $eq: searchQuery,
              },
            },
          }),
          populate: '*',
        },
        {
          encodeValuesOnly: true,
        }
      );

      const { data } = await api.get(`/receipts?${query}`);

      setSubscriptions(data.data);
      setTotalCount(data.meta.pagination.total);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchSubscriptions();
  }, [currentPage]);

  return {
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
  };
};
