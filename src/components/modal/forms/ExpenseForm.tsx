import { useState } from "react";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

const ExpenseForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<string>("0");
  const [wallet, setWallet] = useState("wallet1");
  const [category, setCategory] = useState("category1");
  const [flowType, setFlowType] = useState("expense");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const expenseData = {
    //   title,
    //   amount: parseFloat(amount),
    //   wallet,
    //   category,
    //   flowType,
    // };
  };

  const walletOptions = [{ label: "Wallet 1", value: "wallet1" }];

  const categoryOptions = [{ label: "Category 1", value: "category1" }];

  const flowTypeOptions = [
    { label: "Expense", value: "expense" },
    { label: "Income", value: "income" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Create Expense</h1>
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

        <Button type="submit" label="Add Expense" />
      </form>
    </div>
  );
};

export default ExpenseForm;
