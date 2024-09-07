import { Category } from "./Category";
import { Wallet } from "./Wallet";

export interface Expense {
  category: Category | null;
  wallet: Wallet | null;
  amount: number;
  title: string;
  flowType: "income" | "outcome";
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
