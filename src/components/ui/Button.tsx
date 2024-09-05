import React from "react";
import { FiPlus } from "react-icons/fi";

type ButtonVariant = "plus" | "primary" | "secondary";

interface ButtonProps {
  onClick?: () => void;
  label?: string;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  variant = "plus",
}) => {
  const variantStyles = {
    plus: "border-dashed border-darkgray hover:bg-gray-100",
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center p-2 border-2 rounded-lg transition ${variantStyles[variant]}`}
    >
      {variant === "plus" && <FiPlus className="text-darkgray" />}
      {label}
    </button>
  );
};

export default Button;
