import { useState } from "react";
import axios from "axios";
import { Wallet } from "../../interfaces/Wallet";

const usePutWallet = () => {
  const [updateWalletLoading, setUpdateWalletLoading] =
    useState<boolean>(false);
  const [updateWalletError, setUpdateWalletError] = useState<string | null>(
    null
  );

  const updateWallet = async (id: string, wallet: Partial<Wallet>) => {
    setUpdateWalletLoading(true);
    try {
      const response = await axios.put<{ message: string; wallet: Wallet }>(
        `https://digistar-demo-be.vercel.app/api/wallets/${id}`,
        wallet
      );
      return response.data.wallet;
    } catch (err) {
      setUpdateWalletError("Failed to update wallet. Please try again.");
      console.error(err);
    } finally {
      setUpdateWalletLoading(false);
    }
  };

  return { updateWallet, updateWalletLoading, updateWalletError };
};

export default usePutWallet;
