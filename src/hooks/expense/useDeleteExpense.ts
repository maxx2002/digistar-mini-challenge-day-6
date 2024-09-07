import { useState } from "react";
import axios from "axios";

const useDeleteExpense = () => {
  const [deleteExpenseLoading, setDeleteExpenseLoading] =
    useState<boolean>(false);
  const [deleteExpenseError, setDeleteExpenseError] = useState<string | null>(
    null
  );

  const deleteExpense = async (id: string) => {
    setDeleteExpenseLoading(true);
    try {
      const response = await axios.delete<{ message: string }>(
        `https://digistar-demo-be.vercel.app/api/expense-items/${id}`
      );
      return response.data.message;
    } catch (err) {
      setDeleteExpenseError("Failed to delete expense. Please try again.");
      console.error(err);
    } finally {
      setDeleteExpenseLoading(false);
    }
  };

  return { deleteExpense, deleteExpenseLoading, deleteExpenseError };
};

export default useDeleteExpense;
