import { useState } from "react";
import axios from "axios";
import { Expense } from "../../interfaces/Expense";

const usePostExpense = () => {
  const [createExpenseLoading, setCreateExpenseLoading] =
    useState<boolean>(false);
  const [createExpenseError, setCreateExpenseError] = useState<string | null>(
    null
  );

  const createExpense = async (
    title: string,
    amount: number,
    wallet: string,
    category: string,
    flowType: "income" | "outcome"
  ) => {
    setCreateExpenseLoading(true);
    try {
      const response = await axios.post<{ message: string; expense: Expense }>(
        "https://digistar-demo-be.vercel.app/api/expense-items",
        { title, amount, wallet, category, flowType }
      );
      return response.data.expense;
    } catch (err) {
      setCreateExpenseError("Failed to create expense. Please try again.");
      console.error(err);
    } finally {
      setCreateExpenseLoading(false);
    }
  };

  return { createExpense, createExpenseLoading, createExpenseError };
};

export default usePostExpense;
