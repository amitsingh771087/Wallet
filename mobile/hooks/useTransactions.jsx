// react custom hooks
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Alert } from "react-native";

const API_URI = process.env.EXPO_PUBLIC_API_URI;

console.log(API_URI);

export const useTransactions = (user_id) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expence: 0,
  });

  const [isLoading, setLoading] = useState(false);

  //   use effect to fetch transactions when user_id changes
  const fetchTransactions = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URI}/transactions/${user_id}`);

      setTransactions(res.data.transaction);
    } catch (err) {
      console.log(`Error fetching transactions: ${err}`);
    }
  }, [user_id]);
  const fetchSummary = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URI}/transactions/summary/${user_id}`);

      setSummary(res.data);
    } catch (err) {
      console.log(`Error fetching transactions: ${err}`);
    }
  }, [user_id]);
  const loadData = useCallback(async () => {
    if (!user_id) return;

    setLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.log(`Error loading data: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [user_id]);

  const deleteTransaction = async (id) => {
    try {
      const res = await axios.delete(`${API_URI}/transactions/${id}`);

      if (res.status !== 200) throw new Error("Failed to delete transaction");
      // refetch transactions and summary
      await loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.log(`Error deleting transaction: ${error}`);
      Alert.alert("Error", "Failed to delete transaction");
    }
  };

  return { transactions, summary, isLoading, loadData, deleteTransaction };
};
