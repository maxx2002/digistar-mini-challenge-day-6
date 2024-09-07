import { useState } from "react";
import axios from "axios";
import { Wallet } from "../../interfaces/Wallet";

const usePostWallet = () => {
  const [createWalletLoading, setCreateWalletLoading] =
    useState<boolean>(false);
  const [createWalletError, setCreateWalletError] = useState<string | null>(
    null
  );

  const createWallet = async (name: string) => {
    setCreateWalletLoading(true);
    try {
      const response = await axios.post<{ message: string; wallet: Wallet }>(
        "https://digistar-demo-be.vercel.app/api/wallets",
        { name }
      );
      return response.data.wallet;
    } catch (err) {
      setCreateWalletError("Failed to create wallet. Please try again.");
      console.error(err);
    } finally {
      setCreateWalletLoading(false);
    }
  };

  return { createWallet, createWalletLoading, createWalletError };
};

export default usePostWallet;
