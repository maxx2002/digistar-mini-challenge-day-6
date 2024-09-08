import React from "react";

interface ModalCloseButtonProps {
  onClose: () => void;
  refetch?: () => void;
  disabled?: boolean;
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  onClose,
  refetch,
  disabled,
}: ModalCloseButtonProps) => {
  const handleClick = () => {
    if (refetch) {
      refetch();
    }
    onClose();
  };

  return (
    <button
      className="absolute text-4xl font-bold text-blue top-2 right-4"
      onClick={handleClick}
      disabled={disabled}
      aria-label="Close"
    >
      &times;
    </button>
  );
};

export default ModalCloseButton;
