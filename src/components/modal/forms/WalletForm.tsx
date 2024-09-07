import { useState, useEffect } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import usePostWallet from "../../../hooks/wallet/usePostWallet";
import usePutWallet from "../../../hooks/wallet/usePutWallet";
import ActionSuccessAlert from "../alert/ActionSuccessAlert";
import { useDataContext } from "../../../contexts/DataContext";
import { Wallet } from "../../../interfaces/Wallet";

interface WalletFormProps {
  wallet?: Wallet;
}

const WalletForm: React.FC<WalletFormProps> = ({ wallet }: WalletFormProps) => {
  const { refetchWallets } = useDataContext();

  const [walletName, setWalletName] = useState("");
  const [isCompleted, setCompleted] = useState(false);

  const { createWallet, createWalletLoading, createWalletError } =
    usePostWallet();
  const { updateWallet, updateWalletLoading, updateWalletError } =
    usePutWallet();

  useEffect(() => {
    if (wallet) {
      setWalletName(wallet.name);
    }
  }, [wallet]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (walletName.trim() === "") {
      return;
    }

    if (wallet) {
      await updateWallet(wallet._id, { name: walletName });
      if (!updateWalletError) {
        refetchWallets();
        setCompleted(true);
      }
    } else {
      await createWallet(walletName);
      if (!createWalletError) {
        refetchWallets();
        setCompleted(true);
      }
    }
  };

  return (
    <div className="mx-auto">
      {isCompleted ? (
        <ActionSuccessAlert
          action={wallet ? "update" : "create"}
          type="wallet"
        />
      ) : (
        <>
          <h1 className="mb-6 text-2xl font-bold">
            {wallet ? "Update Wallet" : "Create Wallet"}
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <Input
              id="name"
              label="Wallet Name"
              value={walletName}
              placeholder="Enter Wallet name"
              onChange={handleInputChange}
            />
            {(createWalletError || updateWalletError) && (
              <p className="py-2 text-darkred">
                {createWalletError || updateWalletError}
              </p>
            )}
            <Button
              type="submit"
              label={
                createWalletLoading || updateWalletLoading
                  ? wallet
                    ? "Updating..."
                    : "Adding..."
                  : wallet
                  ? "Update Wallet"
                  : "Add Wallet"
              }
              disabled={createWalletLoading || updateWalletLoading}
            />
          </form>
        </>
      )}
    </div>
  );
};

export default WalletForm;
