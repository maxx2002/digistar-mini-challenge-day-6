import React, { useMemo, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import Button from "./Button";
import Modal from "../modal/Modal";
import { Wallet } from "../../interfaces/Wallet";
import { Category } from "../../interfaces/Category";
import { getRandomBgColor } from "../../utils/getRandomBgColor";
import { useDataContext } from "../../contexts/DataContext";

interface WalletCategoryCardProps {
  wallet?: Wallet;
  category?: Category;
}

const WalletCategoryCard: React.FC<WalletCategoryCardProps> = ({
  wallet,
  category,
}) => {
  const { refetchWallets, refetchCategories } = useDataContext();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const bgColor = useMemo(() => getRandomBgColor(), []);

  const Icon = wallet ? FaWallet : BiSolidCategory;

  const amount = useMemo(() => {
    if (wallet) {
      return wallet?.expenseItems?.reduce((acc, item) => {
        const amount = item.flowType === "outcome" ? -item.amount : item.amount;
        return acc + amount;
      }, 0);
    } else if (category) {
      return (
        category?.wallet?.expenseItems?.reduce((acc, item) => {
          const amount =
            item.flowType === "outcome" ? -item.amount : item.amount;
          return acc + amount;
        }, 0) || 0
      );
    }
    return 0;
  }, [wallet, category]);

  const handleClose = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);

    if (wallet) {
      refetchWallets();
    } else if (category) {
      refetchCategories();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div
          className={`min-w-10 h-10 ${bgColor} flex items-center justify-center rounded-lg`}
        >
          <Icon className="text-white" size={24} />
        </div>

        <div>
          <h3 className="font-semibold">
            {wallet ? wallet?.name : category?.name}
          </h3>
          <p className="text-sm text-darkgray">
            {amount < 0 ? `-$${Math.abs(amount)}` : `$${amount}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="edit" onClick={() => setEditModalOpen(true)} />
        <Button variant="delete" onClick={() => setDeleteModalOpen(true)} />
      </div>

      <Modal
        type={wallet ? "wallet-form" : "category-form"}
        wallet={wallet}
        category={category}
        isOpen={isEditModalOpen}
        onClose={handleClose}
      />
      <Modal
        type={wallet ? "delete-wallet" : "delete-category"}
        wallet={wallet}
        category={category}
        isOpen={isDeleteModalOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default WalletCategoryCard;
