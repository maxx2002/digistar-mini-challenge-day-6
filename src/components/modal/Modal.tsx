type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-60"
        onClick={onClose}
      ></div>

      <div className="relative w-1/2 p-6 bg-white rounded-lg shadow-lg">
        <button
          className="absolute font-bold text-black top-2 right-2"
          onClick={onClose}
        >
          &times;
        </button>
        Tes
      </div>
    </div>
  );
};

export default Modal;
