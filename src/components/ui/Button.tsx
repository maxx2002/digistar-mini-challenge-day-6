import React from "react";
import { FiPlus } from "react-icons/fi";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type ButtonVariant =
  | "default"
  | "add"
  | "edit"
  | "delete"
  | "filter"
  | "filter-active";

interface ButtonProps {
  onClick?: () => void;
  label?: string;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  variant = "default",
}) => {
  const variantStyles = {
    default:
      "border border-dashed border-darkgray hover:border-solid hover:bg-lightblue hover:border-blue hover:text-blue transition w-full transition",
    add: "border border-dashed border-darkgray hover:scale-105 transition",
    edit: "bg-lightblue text-blue hover:scale-110 transition",
    delete: "bg-gray text-darkgray hover:scale-110 transition",
    filter: "border text-darkgray hover:scale-105 transition",
    "filter-active": "border bg-lightblue text-blue hover:scale-105 transition",
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
      {(variant === "filter" || variant === "filter-active") && (
        <LuChevronsUpDown />
      )}
    </button>
  );
};

export default Button;
