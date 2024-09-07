import React, { createContext, ReactNode, useContext } from "react";
import { Expense } from "../interfaces/Expense";
import { Wallet } from "../interfaces/Wallet";
import { Category } from "../interfaces/Category";
import useGetAllExpenses from "../hooks/expense/useGetAllExpense";
import useGetAllWallets from "../hooks/wallet/useGetAllWallets";
import useGetAllCategories from "../hooks/category/useGetAllCategories";

interface DataContextType {
  expenses: Expense[];
  expensesLoading: boolean;
  expensesError: string | null;
  wallets: Wallet[];
  walletsLoading: boolean;
  walletsError: string | null;
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  refetchExpenses: () => void;
  refetchWallets: () => void;
  refetchCategories: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { expenses, expensesLoading, expensesError, refetchExpenses } =
    useGetAllExpenses();
  const { wallets, walletsLoading, walletsError, refetchWallets } =
    useGetAllWallets();
  const { categories, categoriesLoading, categoriesError, refetchCategories } =
    useGetAllCategories();

  return (
    <DataContext.Provider
      value={{
        expenses,
        expensesLoading,
        expensesError,
        wallets,
        walletsLoading,
        walletsError,
        categories,
        categoriesLoading,
        categoriesError,
        refetchExpenses,
        refetchWallets,
        refetchCategories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
