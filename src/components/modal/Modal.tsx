import DeleteCategoryAlert from "./alert/DeleteCategoryAlert";
import DeleteExpenseAlert from "./alert/DeleteExpenseAlert";
import DeleteWalletAlert from "./alert/DeleteWalletAlert";
import CategoryForm from "./forms/CategoryForm";
import ChangeWalletForm from "./forms/ChangeWalletForm";
import ExpenseForm from "./forms/ExpenseForm";
import WalletForm from "./forms/WalletForm";

type ModalProps = {
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
  category?: any;
  wallet?: any;
  expense?: any;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-60"
        onClick={onClose}
      ></div>

      <div className="relative p-8 bg-white rounded-lg shadow-lg w-156">
        <button
          className="absolute text-4xl font-bold text-blue top-2 right-4"
          onClick={onClose}
        >
          &times;
        </button>
        {type === "category-form" && <CategoryForm />}
        {type === "wallet-form" && <WalletForm />}
        {type === "expense-form" && <ExpenseForm />}
        {type === "change-wallet-form" && <ChangeWalletForm />}
        {type === "delete-category" && (
          <DeleteCategoryAlert onCancel={onClose} />
        )}
        {type === "delete-wallet" && <DeleteWalletAlert onCancel={onClose} />}
        {type === "delete-expense" && <DeleteExpenseAlert onCancel={onClose} />}
      </div>
    </div>
  );
};

export default Modal;
