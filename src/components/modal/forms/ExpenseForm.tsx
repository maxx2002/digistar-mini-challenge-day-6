import { useState, useEffect } from "react";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { useDataContext } from "../../../contexts/DataContext";
import usePostExpense from "../../../hooks/expense/usePostExpense";
import usePutExpense from "../../../hooks/expense/usePutExpense";
import ActionSuccessAlert from "../alert/ActionSuccessAlert";
import { Expense } from "../../../interfaces/Expense";

interface ExpenseFormProps {
  expense?: Expense;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expense,
}: ExpenseFormProps) => {
  const [title, setTitle] = useState(expense?.title || "");
  const [amount, setAmount] = useState<string>(
    expense?.amount.toString() || "0"
  );
  const [wallet, setWallet] = useState<string>(expense?.wallet?._id || "");
  const [category, setCategory] = useState<string>(
    expense?.category?._id || ""
  );
  const [flowType, setFlowType] = useState<string>(
    expense?.flowType || "income"
  );

  const { wallets, categories } = useDataContext();
  const { createExpense, createExpenseLoading, createExpenseError } =
    usePostExpense();
  const { updateExpense, updateExpenseLoading, updateExpenseError } =
    usePutExpense();

  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount.toString());
      setWallet(expense.wallet?._id || "");
      setCategory(expense.category?._id || "");
      setFlowType(expense.flowType);
    }
  }, [expense]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "title") {
      setTitle(value);
    } else if (id === "amount") {
      setAmount(value);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id === "wallet") {
      setWallet(value);
    } else if (id === "category") {
      setCategory(value);
    } else if (id === "flowType") {
      setFlowType(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (expense) {
        await updateExpense(
          expense._id,
          title,
          parseFloat(amount),
          wallet,
          category,
          flowType as "income" | "outcome"
        );
      } else {
        await createExpense(
          title,
          parseFloat(amount),
          wallet,
          category,
          flowType as "income" | "outcome"
        );
      }

      if (!createExpenseError || !updateExpenseError) {
        setCompleted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const walletOptions = wallets.map((w) => ({ label: w.name, value: w._id }));
  const categoryOptions = categories.map((c) => ({
    label: c.name,
    value: c._id,
  }));
  const flowTypeOptions = [
    { label: "Outcome", value: "outcome" },
    { label: "Income", value: "income" },
  ];

  return (
    <div className="mx-auto">
      {isCompleted ? (
        <ActionSuccessAlert
          action={expense ? "update" : "create"}
          type="expense"
        />
      ) : (
        <>
          <h1 className="mb-6 text-2xl font-bold">
            {expense ? "Update Expense" : "Create Expense"}
          </h1>
          {(createExpenseError || updateExpenseError) && (
            <p className="text-red-500">
              {createExpenseError || updateExpenseError}
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <Input
              id="title"
              label="Title"
              value={title}
              placeholder="Enter Title"
              onChange={handleInputChange}
            />

            <Input
              id="amount"
              label="Amount"
              value={amount}
              placeholder="Enter Amount"
              type="number"
              onChange={handleInputChange}
            />

            <Select
              id="wallet"
              label="Wallet"
              options={walletOptions}
              value={wallet}
              onChange={handleSelectChange}
            />

            <Select
              id="category"
              label="Category"
              options={categoryOptions}
              value={category}
              onChange={handleSelectChange}
            />

            <Select
              id="flowType"
              label="Flow Type"
              options={flowTypeOptions}
              value={flowType}
              onChange={handleSelectChange}
            />

            {(createExpenseError || updateExpenseError) && (
              <p className="py-2 text-darkred">
                {createExpenseError || updateExpenseError}
              </p>
            )}

            <Button
              type="submit"
              label={
                createExpenseLoading || updateExpenseLoading
                  ? expense
                    ? "Updating..."
                    : "Adding..."
                  : expense
                  ? "Update Expense"
                  : "Add Expense"
              }
              disabled={createExpenseLoading || updateExpenseLoading}
            />
          </form>
        </>
      )}
    </div>
  );
};

export default ExpenseForm;
