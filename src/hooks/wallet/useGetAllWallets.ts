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
      const response = await axios.get<GetAllWalletsResponse>(
        "https://digistar-demo-be.vercel.app/api/wallets"
      );
      setWallets(response.data.data);
    } catch (err) {
      setWalletsError(
        err instanceof Error ? err.message : "Failed to load wallets"
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
