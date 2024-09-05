import { IoIosNotificationsOutline } from "react-icons/io";
import Button from "./ui/Button";
import WalletCategoryCard from "./ui/WalletCategoryCard";

function Sidebar() {
  return (
    <div className="p-6">
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
          <Button variant="add" />
        </div>
        <div className="flex flex-col gap-6 mt-6">
          <WalletCategoryCard
            title="My Wallet"
            amount={950.45}
            variant="wallet"
          />
          <WalletCategoryCard
            title="Home Wallet"
            amount={552.53}
            variant="wallet"
          />
        </div>
      </div>
      <hr className="border-gray" />
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <Button variant="add" />
        </div>
        <div className="flex flex-col gap-6 mt-6">
          <WalletCategoryCard
            title="Bills"
            amount={340.25}
            variant="category"
          />
          <WalletCategoryCard
            title="Education"
            amount={450.57}
            variant="category"
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
