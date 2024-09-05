import React from "react";
import { FiPlus } from "react-icons/fi";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type ButtonVariant = "add" | "edit" | "delete" | "filter" | "active";

interface ButtonProps {
  onClick?: () => void;
  label?: string;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, variant = "add" }) => {
  const variantStyles = {
    add: "border border-dashed border-darkgray hover:scale-105 transition",
    edit: "bg-lightblue text-blue hover:scale-110 transition",
    delete: "bg-gray text-darkgray hover:scale-110 transition",
    filter: "border text-darkgray hover:scale-105 transition",
    active: "border bg-lightblue text-blue hover:scale-105 transition",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 font-medium text-darkgray p-3 rounded-lg transition ${variantStyles[variant]}`}
    >
      {variant === "add" && <FiPlus />}
      {variant === "edit" && <FaRegEdit />}
      {variant === "delete" && <IoClose />}
      {label}
      {(variant === "filter" || variant === "active") && <LuChevronsUpDown />}
    </button>
  );
};

export default Button;
