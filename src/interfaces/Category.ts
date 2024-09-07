import { Wallet } from "./Wallet";

export interface Category {
  _id: string;
  name: string;
  wallet: Wallet | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
