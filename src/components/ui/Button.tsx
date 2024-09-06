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
  | "filter-active"
  | "destroy"
  | "cancel";

interface ButtonProps {
  onClick?: () => void;
  label?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  variant = "default",
  type = "button",
}) => {
  const variantStyles = {
    default:
      "border bg-lightblue border-blue text-blue hover:bg-blue hover:text-white transition w-full transition justify-center",
    add: "border border-dashed border-darkgray hover:scale-105 transition text-darkgray",
    edit: "bg-lightblue text-blue hover:scale-110 transition",
    delete: "bg-gray text-darkgray hover:scale-110 transition",
    filter: "border text-darkgray hover:scale-105 transition",
    "filter-active": "border bg-lightblue text-blue hover:scale-105 transition",
    destroy:
      "border border-red hover:border-darkred bg-red text-darkred hover:text-white hover:bg-darkred transition w-full transition justify-center",
    cancel:
      "border bg-gray text-darkgray hover:bg-darkgray hover:text-white transition w-full transition justify-center",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-2 font-medium p-3 rounded-lg transition ${variantStyles[variant]}`}
    >
      {variant === "add" && <FiPlus className="text-darkgray" />}
      {variant === "edit" && <FaRegEdit className="text-blue" />}
      {variant === "delete" && <IoClose className="text-darkgray" />}
      {label}
      {(variant === "filter" || variant === "filter-active") && (
        <LuChevronsUpDown />
      )}
    </button>
  );
};

export default Button;
