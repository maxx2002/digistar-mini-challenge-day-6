import { Category } from "../../interfaces/Category";
import { Expense } from "../../interfaces/Expense";
import { Wallet } from "../../interfaces/Wallet";
import DeleteAlert from "./alert/DeleteAlert";
import CategoryForm from "./forms/CategoryForm";
import ChangeWalletForm from "./forms/ChangeWalletForm";
import ExpenseForm from "./forms/ExpenseForm";
import WalletForm from "./forms/WalletForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type:
    | "category-form"
    | "wallet-form"
    | "expense-form"
    | "change-wallet-form"
    | "delete-category"
    | "delete-wallet"
    | "delete-expense";
  category?: Category;
  wallet?: Wallet;
  setCurrentWallet?: (wallet: Wallet) => void;
  expense?: Expense;
}

const Modal: React.FC<ModalProps> = ({
  category,
  wallet,
  setCurrentWallet,
  expense,
  isOpen,
  onClose,
  type,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-60" />

      <div className="relative p-8 bg-white rounded-lg shadow-lg w-156">
        {type === "category-form" && (
          <CategoryForm category={category} onClose={onClose} />
        )}
        {type === "wallet-form" && (
          <WalletForm wallet={wallet} onClose={onClose} />
        )}
        {type === "expense-form" && (
          <ExpenseForm expense={expense} onClose={onClose} />
        )}
        {type === "change-wallet-form" && (
          <ChangeWalletForm
            currentWallet={wallet}
            setCurrentWallet={setCurrentWallet}
            onClose={onClose}
          />
        )}
        {type === "delete-category" && (
          <DeleteAlert category={category} onCancel={onClose} />
        )}
        {type === "delete-wallet" && (
          <DeleteAlert wallet={wallet} onCancel={onClose} />
        )}
        {type === "delete-expense" && (
          <DeleteAlert expense={expense} onCancel={onClose} />
        )}
      </div>
    </div>
  );
};

export default Modal;
