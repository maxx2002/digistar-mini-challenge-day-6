import { FaWallet } from "react-icons/fa";
import Button from "./ui/Button";
import ExpenseCard from "./ui/ExpenseCard";
import { useState } from "react";
import Modal from "./modal/Modal";

function Content() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isChangeWalletModalOpen, setChangeWalletModalOpen] = useState(false);

  return (
    <div className="px-10 py-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <FaWallet className="text-orange" size={44} />
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-blue">Home Wallet</h2>
            <p
              className="text-sm font-medium cursor-pointer text-darkgray"
              onClick={() => setChangeWalletModalOpen(true)}
            >
              Change default wallet
            </p>
          </div>
        </div>
        <Button
          label="Add Transaction"
          variant="add"
          onClick={() => setAddModalOpen(true)}
        />
      </div>
      <div className="flex items-center gap-4 mb-8">
        <Button label="Group By" variant="filter" />
        <Button label="Dates" variant="filter-active" />
        <Button label="Flow Type" variant="filter" />
      </div>
      <div className="flex items-center justify-between mb-6">
        <h6 className="text-lg font-semibold">January 15th, 2024</h6>
        <div className="flex items-center gap-10 text-darkgray">
          <p>Number of transactions: 04</p>
          <p>Value: $7408.9</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ExpenseCard category="Food" date="July 15th, 2024" amount={20.15} />
        <ExpenseCard
          category="Shopping"
          date="July 17th, 2024"
          amount={50.59}
        />
        <ExpenseCard
          category="Credits and Loans"
          date="July 18th, 2024"
          amount={220.5}
        />
        <ExpenseCard
          category="Freelance from Upwork"
          date="July 19th, 2024"
          amount={250.45}
        />
      </div>

      <Modal
        type="expense-form"
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <Modal
        type="change-wallet-form"
        isOpen={isChangeWalletModalOpen}
        onClose={() => setChangeWalletModalOpen(false)}
      />
    </div>
  );
}

export default Content;
