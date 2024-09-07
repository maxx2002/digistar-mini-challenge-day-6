import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Button from "../../ui/Button";
import useDeleteWallet from "../../../hooks/wallet/useDeleteWallet";
import { Wallet } from "../../../interfaces/Wallet";
import { Category } from "../../../interfaces/Category";
import { Expense } from "../../../interfaces/Expense";
import ActionSuccessAlert from "./ActionSuccessAlert";
import { useDataContext } from "../../../contexts/DataContext";

type DeleteAlertProps = {
  wallet?: Wallet;
  category?: Category;
  expense?: Expense;
  onCancel: () => void;
};

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  wallet,
  category,
  expense,
  onCancel,
}) => {
  const { refetchWallets, refetchCategories, refetchExpenses } =
    useDataContext();

  const { deleteWallet, deleteWalletLoading, deleteWalletError } =
    useDeleteWallet();

  const [isDeleteCompleted, setDeleteCompleted] = useState(false);

  const handleDelete = async () => {
    if (wallet) {
      await deleteWallet(wallet._id);

      if (deleteWalletError) {
        return;
      } else {
        refetchWallets();
        setDeleteCompleted(true);
        return;
      }
    }
  };

  const title = wallet
    ? wallet.name
    : category
    ? category.name
    : expense
    ? expense.title
    : "";
  const type = wallet ? "wallet" : category ? "category" : "expense";

  return (
    <div className="mx-auto">
      {isDeleteCompleted ? (
        <ActionSuccessAlert action="delete" type={type} />
      ) : (
        <>
          <div className="flex items-center justify-center mb-4 text-red-500">
            <MdDelete size={100} className="text-blue" />
          </div>
          <h1 className="mb-2 text-xl font-bold text-center">
            Are you sure you want to delete {title} {type}?
          </h1>
          <p className="mb-4 text-center">
            This action cannot be undone. This will permanently delete the{" "}
            {type}.
          </p>
          <div className="flex items-center justify-between gap-4 mt-8">
            <Button label="Cancel" variant="cancel" onClick={onCancel} />
            <Button
              label={deleteWalletLoading ? "Deleting..." : "Delete"}
              variant="destroy"
              onClick={handleDelete}
            />
          </div>
          {deleteWalletError && (
            <p className="text-center text-darkred">{deleteWalletError}</p>
          )}
        </>
      )}
    </div>
  );
};

export default DeleteAlert;
