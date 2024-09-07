import { useState } from "react";
import axios from "axios";

const useDeleteWallet = () => {
  const [deleteWalletLoading, setDeleteWalletLoading] =
    useState<boolean>(false);
  const [deleteWalletError, setDeleteWalletError] = useState<string | null>(
    null
  );

  const deleteWallet = async (id: string) => {
    setDeleteWalletLoading(true);
    try {
      await axios.delete<{ message: string }>(
        `https://digistar-demo-be.vercel.app/api/wallets/${id}`
      );
      return { success: true };
    } catch (err) {
      setDeleteWalletError("Failed to delete wallet. Please try again.");
      console.error(err);
      return { success: false };
    } finally {
      setDeleteWalletLoading(false);
    }
  };

  return { deleteWallet, deleteWalletLoading, deleteWalletError };
};

export default useDeleteWallet;
