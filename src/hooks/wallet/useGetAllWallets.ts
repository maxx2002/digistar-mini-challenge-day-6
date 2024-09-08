import axios from "axios";
import { Wallet } from "../../interfaces/Wallet";
import { useCallback, useEffect, useState } from "react";

interface GetAllWalletsResponse {
  data: Wallet[];
  message: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const useGetAllWallets = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [walletsLoading, setWalletsLoading] = useState<boolean>(false);
  const [walletsError, setWalletsError] = useState<string | null>(null);

  const fetchWallets = useCallback(async () => {
    setWalletsLoading(true);
    try {
      let currentPage = 1;
      const allWallets: Wallet[] = [];

      while (true) {
        const response = await axios.get<GetAllWalletsResponse>(
          `https://digistar-demo-be.vercel.app/api/wallets?page=${currentPage}`
        );

        allWallets.push(...response.data.data);

        if (response.data.page >= response.data.totalPages) {
          break;
        }

        currentPage++;
      }

      setWallets(allWallets);
      setWalletsError(null);
    } catch (error) {
      setWalletsError(
        error instanceof Error ? error.message : "Failed to load wallets"
      );
    } finally {
      setWalletsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  return {
    wallets,
    walletsLoading,
    walletsError,
    refetchWallets: fetchWallets,
  };
};

export default useGetAllWallets;
