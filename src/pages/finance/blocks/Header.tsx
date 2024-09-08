import { FaWallet } from "react-icons/fa";
import Button from "../../../components/ui/Button";
import { Wallet } from "../../../interfaces/Wallet";

interface HeaderProps {
  currentWallet: Wallet | null;
  setChangeWalletModalOpen: (isOpen: boolean) => void;
  setAddModalOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentWallet,
  setChangeWalletModalOpen,
  setAddModalOpen,
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <FaWallet className="text-orange" size={44} />
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-blue">
            {currentWallet?.name} Wallet
          </h2>
          <p
            className="text-sm font-medium cursor-pointer text-darkgray"
            onClick={() => setChangeWalletModalOpen(true)}
          >
            Change current wallet
          </p>
        </div>
      </div>
      <Button
        label="Add Transaction"
        variant="add"
        onClick={() => setAddModalOpen(true)}
      />
    </div>
  );
};

export default Header;
