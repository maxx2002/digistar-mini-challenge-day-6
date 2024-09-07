import { Expense } from "./Expense";

export interface Wallet {
  _id: string;
  name: string;
  expenseItems: Expense[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
