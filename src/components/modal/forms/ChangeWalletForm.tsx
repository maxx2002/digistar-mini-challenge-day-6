import { useState, useEffect } from "react";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { Wallet } from "../../../interfaces/Wallet";
import { useDataContext } from "../../../contexts/DataContext";
import ModalCloseButton from "../../ui/ModalCloseButton";

interface ChangeWalletFormProps {
  currentWallet?: Wallet;
  setCurrentWallet?: (wallet: Wallet) => void;
  onClose: () => void;
}

const ChangeWalletForm: React.FC<ChangeWalletFormProps> = ({
  currentWallet,
  setCurrentWallet,
  onClose,
}: ChangeWalletFormProps) => {
  const { wallets } = useDataContext();

  const [selectedWallet, setSelectedWallet] = useState<string>("");

  useEffect(() => {
    if (currentWallet) {
      setSelectedWallet(currentWallet._id);
    }
  }, [currentWallet]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWallet(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (setCurrentWallet && selectedWallet) {
      const selected = wallets.find((wallet) => wallet._id === selectedWallet);
      if (selected) {
        setCurrentWallet(selected);
        onClose();
      }
    }
  };

  const walletOptions = wallets.map((wallet) => ({
    label: wallet.name,
    value: wallet._id,
  }));

  return (
    <div className="mx-auto">
      <ModalCloseButton onClose={onClose} />
      <h1 className="mb-6 text-2xl font-bold">Change Current Wallet</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <Select
          id="wallet"
          label="Select Wallet"
          options={walletOptions}
          value={selectedWallet}
          onChange={handleSelectChange}
        />
        <Button type="submit" label="Change Current Wallet" />
      </form>
    </div>
  );
};

export default ChangeWalletForm;
