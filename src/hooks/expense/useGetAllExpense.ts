import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Expense } from "../../interfaces/Expense";

interface UseGetAllExpenseResponse {
  data: Expense[];
  message: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const useGetAllExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expensesLoading, setExpensesLoading] = useState<boolean>(true);
  const [expensesError, setExpensesError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    setExpensesLoading(true);
    try {
      let currentPage = 1;
      const limit = 10;
      const allExpenses: Expense[] = [];

      while (true) {
        const response = await axios.get<UseGetAllExpenseResponse>(
          `https://digistar-demo-be.vercel.app/api/expense-items?page=${currentPage}&limit=${limit}`
        );

        allExpenses.push(...response.data.data);

        if (response.data.page >= response.data.totalPages) {
          break;
        }

        currentPage++;
      }

      setExpenses(allExpenses);
      setExpensesError(null);
    } catch (error) {
      setExpensesError(
        error instanceof Error ? error.message : "Failed to load expenses"
      );
    } finally {
      setExpensesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return {
    expenses,
    expensesLoading,
    expensesError,
    refetchExpenses: fetchExpenses,
  };
};

export default useGetAllExpenses;
