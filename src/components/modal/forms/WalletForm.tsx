import { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const WalletForm: React.FC = () => {
  const [walletName, setWalletName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto rounded-lg">
      <h1 className="mb-6 text-2xl font-bold">Create Wallet</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <Input
          id="name"
          label="Wallet Name"
          value={walletName}
          placeholder="Enter Wallet name"
          onChange={handleInputChange}
        />

        <Button type="submit" label="Add Wallet" />
      </form>
    </div>
  );
};

export default WalletForm;
