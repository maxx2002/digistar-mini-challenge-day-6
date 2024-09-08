import React from "react";

interface ModalCloseButtonProps {
  onClose: () => void;
  refetch?: () => void;
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  onClose,
  refetch,
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
      aria-label="Close"
    >
      &times;
    </button>
  );
};

export default ModalCloseButton;
