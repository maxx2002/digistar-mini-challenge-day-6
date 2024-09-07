import { IoIosNotificationsOutline } from "react-icons/io";
import Button from "./ui/Button";
import WalletCategoryCard from "./ui/WalletCategoryCard";
import { useState } from "react";
import Modal from "./modal/Modal";
import SpinnerLoading from "./ui/SpinnerLoading";
import { useDataContext } from "../contexts/DataContext";

const Sidebar = () => {
  const {
    wallets,
    walletsLoading,
    walletsError,
    categories,
    categoriesLoading,
    categoriesError,
  } = useDataContext();

  const [isAddWalletModalOpen, setAddWalletModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  return (
    <div className="p-6 mb-2">
      <div className="flex items-center justify-end gap-3 mb-10">
        <IoIosNotificationsOutline className="size-8" />
        <img
          src="/images/avatar.jpg"
          alt="avatar"
          className="rounded-md size-12"
        />
      </div>
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Wallets</h1>
          <Button variant="add" onClick={() => setAddWalletModalOpen(true)} />
        </div>
        <div className="flex flex-col gap-6 mt-6">
          {walletsLoading && <SpinnerLoading />}
          {walletsError && (
            <p className="text-darkred">
              Failed to load wallets. Please try again.
            </p>
          )}
          {!walletsLoading && wallets?.length > 0
            ? wallets.map((wallet) => (
                <WalletCategoryCard key={wallet._id} wallet={wallet} />
              ))
            : !walletsLoading && <p>No wallets found</p>}
        </div>
      </div>
      <hr className="border-gray" />
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <Button variant="add" onClick={() => setAddCategoryModalOpen(true)} />
        </div>
        <div className="flex flex-col gap-6 mt-6">
          {categoriesLoading && <SpinnerLoading />}
          {categoriesError && <p className="text-darkred">{categoriesError}</p>}
          {categories?.length > 0
            ? categories.map((category) => (
                <WalletCategoryCard key={category._id} category={category} />
              ))
            : !categoriesLoading &&
              !categoriesError && <p>No categories found</p>}
        </div>
      </div>

      <Modal
        type="wallet-form"
        isOpen={isAddWalletModalOpen}
        onClose={() => setAddWalletModalOpen(false)}
      />
      <Modal
        type="category-form"
        isOpen={isAddCategoryModalOpen}
        onClose={() => setAddCategoryModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
