import React, { useMemo, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import Button from "./Button";
import Modal from "../modal/Modal";

type CardVariant = "wallet" | "category";

interface WalletCategoryCardProps {
  title: string;
  amount: number;
  variant: CardVariant;
}

const bgColors = [
  "bg-blue",
  "bg-purple",
  "bg-orange",
  "bg-green",
  "bg-yellow",
  "bg-red",
];

const WalletCategoryCard: React.FC<WalletCategoryCardProps> = ({
  title,
  amount,
  variant,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const randomBgColor = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  }, []);

  const Icon = variant === "wallet" ? FaWallet : BiSolidCategory;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div
          className={`w-10 h-10 ${randomBgColor} flex items-center justify-center rounded-lg`}
        >
          <Icon className="text-white" size={24} />
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-darkgray">${amount.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="edit" onClick={() => setEditModalOpen(true)} />
        <Button variant="delete" onClick={() => setDeleteModalOpen(true)} />
      </div>

      <Modal
        type={variant === "category" ? "category-form" : "wallet-form"}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
      />
      <Modal
        type={variant === "category" ? "delete-category" : "delete-wallet"}
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default WalletCategoryCard;
