import { MdOutlinePayments } from "react-icons/md";
import Button from "./Button";
import Modal from "../modal/Modal";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { Expense } from "../../interfaces/Expense";

type ExpenseCardProps = {
  expense: Expense;
};

const getRandomBgColor = () => {
  const colors = [
    "bg-blue",
    "bg-purple",
    "bg-orange",
    "bg-green",
    "bg-yellow",
    "bg-red",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
}: ExpenseCardProps) => {
  const bgColor = getRandomBgColor();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
      <div
        className={`flex items-center justify-center flex-shrink-0 w-12 h-12 ${bgColor} rounded-lg`}
      >
        <MdOutlinePayments className="text-white" size={24} />
      </div>
      <div className="flex items-center justify-between w-full ml-4">
        <div>
          <p className="text-lg font-medium text-black">
            {expense.title} - {expense.category?.name}
          </p>
          <p className="text-darkgray">{formatDate(expense.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="mr-8 font-bold text-black">
            {expense.flowType === "outcome" && "-"}${expense.amount}
          </p>
          <Button variant="edit" onClick={() => setEditModalOpen(true)} />
          <Button variant="delete" onClick={() => setDeleteModalOpen(true)} />
        </div>
      </div>

      <Modal
        type="expense-form"
        isOpen={isEditModalOpen}
        expense={expense}
        onClose={() => setEditModalOpen(false)}
      />
      <Modal
        type="delete-expense"
        isOpen={isDeleteModalOpen}
        expense={expense}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ExpenseCard;
