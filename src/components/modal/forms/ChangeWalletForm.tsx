import { useState } from "react";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

const ChangeWalletForm: React.FC = () => {
  const [selectedWallet, setSelectedWallet] = useState("wallet1");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWallet(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const walletOptions = [
    { label: "Wallet 1", value: "wallet1" },
    { label: "Wallet 2", value: "wallet2" },
    { label: "Wallet 3", value: "wallet3" },
  ];

  return (
    <div className="mx-auto rounded-lg">
      <h1 className="mb-6 text-2xl font-bold">Change Wallet</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <Select
          id="wallet"
          label="Select Wallet"
          options={walletOptions}
          value={selectedWallet}
          onChange={handleSelectChange}
        />

        <Button type="submit" label="Update Wallet" />
      </form>
    </div>
  );
};

export default ChangeWalletForm;
