import { useEffect, useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import { Expense } from "../../interfaces/Expense";
import { Wallet } from "../../interfaces/Wallet";
import Modal from "../../components/modal/Modal";
import Header from "./blocks/Header";
import Filters from "./blocks/Filters";
import TransactionSummary from "./blocks/TransactionSummary";
import ExpenseList from "./blocks/ExpenseList";

const Finance = () => {
  const { expenses, expensesLoading, expensesError, wallets } =
    useDataContext();

  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState(0);
  const [value, setValue] = useState(0);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [filterFlowType, setFilterFlowType] = useState<string | null>(null);

  useEffect(() => {
    if (expenses && wallets.length > 0) {
      if (isInitialLoad) {
        setCurrentWallet(wallets[0]);
        setIsInitialLoad(false);
      }

      if (currentWallet) {
        let filteredExpenses = expenses.filter(
          (expense) => expense.wallet?._id === currentWallet?._id
        );

        if (searchTerm) {
          const lowerSearchTerm = searchTerm.toLowerCase();
          filteredExpenses = filteredExpenses.filter((expense) =>
            expense.title.toLowerCase().includes(lowerSearchTerm)
          );
        }

        if (filterCategory) {
          filteredExpenses = filteredExpenses.filter(
            (expense) => expense.category?.name === filterCategory
          );
        }

        if (filterDate) {
          filteredExpenses = filteredExpenses.filter((expense) => {
            const expenseDate = new Date(expense.createdAt)
              .toISOString()
              .split("T")[0];
            return expenseDate === filterDate;
          });
        }

        if (filterFlowType) {
          filteredExpenses = filteredExpenses.filter(
            (expense) => expense.flowType === filterFlowType
          );
        }

        setExpenseList(filteredExpenses);
        setTransactions(filteredExpenses.length);

        const totalAmount = filteredExpenses.reduce((acc, expense) => {
          if (expense.flowType === "income") {
            return acc + expense.amount;
          } else if (expense.flowType === "outcome") {
            return acc - expense.amount;
          }
          return acc;
        }, 0);

        setValue(totalAmount);
      }
    }
  }, [
    expenses,
    wallets,
    currentWallet,
    isInitialLoad,
    searchTerm,
    filterCategory,
    filterDate,
    filterFlowType,
  ]);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isChangeWalletModalOpen, setChangeWalletModalOpen] = useState(false);

  const handleClose = () => {
    setAddModalOpen(false);
  };

  return (
    <div className="px-10 py-4">
      <Header
        currentWallet={currentWallet}
        setChangeWalletModalOpen={setChangeWalletModalOpen}
        setAddModalOpen={setAddModalOpen}
      />

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        filterFlowType={filterFlowType}
        setFilterFlowType={setFilterFlowType}
      />

      <TransactionSummary transactions={transactions} value={value} />

      <ExpenseList
        expensesLoading={expensesLoading}
        expensesError={expensesError}
        expenseList={expenseList}
      />

      <Modal
        type="expense-form"
        isOpen={isAddModalOpen}
        onClose={handleClose}
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

export default Finance;
