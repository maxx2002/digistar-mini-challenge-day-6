import { useState } from "react";
import axios from "axios";
import { Expense } from "../../interfaces/Expense";

const usePutExpense = () => {
  const [updateExpenseLoading, setUpdateExpenseLoading] =
    useState<boolean>(false);
  const [updateExpenseError, setUpdateExpenseError] = useState<string | null>(
    null
  );

  const updateExpense = async (
    id: string,
    title: string,
    amount: number,
    wallet: string,
    category: string,
    flowType: "income" | "outcome"
  ) => {
    setUpdateExpenseLoading(true);
    try {
      const response = await axios.put<{ message: string; expense: Expense }>(
        `https://digistar-demo-be.vercel.app/api/expense-items/${id}`,
        { title, amount, wallet, category, flowType }
      );
      return response.data.message;
    } catch (err) {
      setUpdateExpenseError("Failed to update expense. Please try again.");
      console.error(err);
    } finally {
      setUpdateExpenseLoading(false);
    }
  };

  return { updateExpense, updateExpenseLoading, updateExpenseError };
};

export default usePutExpense;
