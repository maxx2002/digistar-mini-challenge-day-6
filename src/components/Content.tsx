import { FaWallet } from "react-icons/fa";
import Button from "./ui/Button";
import ExpenseCard from "./ui/ExpenseCard";
import { useEffect, useState } from "react";
import Modal from "./modal/Modal";
import SpinnerLoading from "./ui/SpinnerLoading";
import { formatDate } from "../utils/formatDate";
import { Expense } from "../interfaces/Expense";
import { Wallet } from "../interfaces/Wallet";
import { useDataContext } from "../contexts/DataContext";
import SearchField from "./ui/SearchField";

const Content = () => {
  const { expenses, expensesLoading, expensesError, wallets } =
    useDataContext();

  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState(0);
  const [value, setValue] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (expenses && wallets.length > 0) {
      if (isInitialLoad) {
        setCurrentWallet(wallets[0]);
        setIsInitialLoad(false);
      }
      if (currentWallet) {
        const filteredExpenses = expenses.filter(
          (expense) => expense.wallet?._id === currentWallet?._id
        );
        setExpenseList(filteredExpenses);

        setTransactions(filteredExpenses.length);
        const totalAmount = filteredExpenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        setValue(totalAmount);
      }
    }
  }, [expenses, wallets, currentWallet, isInitialLoad]);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isChangeWalletModalOpen, setChangeWalletModalOpen] = useState(false);

  return (
    <div className="px-10 py-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <FaWallet className="text-orange" size={44} />
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-blue">
              {currentWallet?.name} Wallet
            </h2>
            <p
              className="text-sm font-medium cursor-pointer text-darkgray"
              onClick={() => setChangeWalletModalOpen(true)}
            >
              Change current wallet
            </p>
          </div>
        </div>
        <Button
          label="Add Transaction"
          variant="add"
          onClick={() => setAddModalOpen(true)}
        />
      </div>
      <div className="flex items-center justify-between w-full mb-8 gap-x-4">
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex items-center justify-end gap-x-4 min-w-96">
          <Button label="Category" variant="filter" />
          <Button label="Date" variant="filter-active" />
          <Button label="Flow Type" variant="filter" />
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h6 className="text-lg font-semibold">{formatDate(Date())}</h6>
        <div className="flex items-center gap-10 text-darkgray">
          <p>Number of transactions: {transactions}</p>
          <p>Value: ${value}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        {expensesLoading && <SpinnerLoading />}
        {expensesError && (
          <p className="text-darkred">Expense: {expensesError}</p>
        )}
        {expenseList.length > 0
          ? expenseList.map((expense) => (
              <ExpenseCard
                key={expense._id}
                title={expense.title}
                category={expense.category?.name || "no category"}
                date={expense.createdAt}
                amount={expense.amount}
              />
            ))
          : !expensesLoading && !expensesError && <p>No expenses found</p>}
      </div>

      <Modal
        type="expense-form"
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <Modal
        type="change-wallet-form"
        wallet={currentWallet ?? undefined}
        setCurrentWallet={setCurrentWallet}
        isOpen={isChangeWalletModalOpen}
        onClose={() => setChangeWalletModalOpen(false)}
      />
    </div>
  );
};

export default Content;
