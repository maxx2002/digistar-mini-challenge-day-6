import { useState, useEffect } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import { useDataContext } from "../../../contexts/DataContext";
import usePostCategory from "../../../hooks/category/usePostCategory";
import ActionSuccessAlert from "../alert/ActionSuccessAlert";
import { Category } from "../../../interfaces/Category";
import usePutCategory from "../../../hooks/category/usePutCategory";

interface CategoryFormProps {
  category?: Category;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
}: CategoryFormProps) => {
  const [categoryName, setCategoryName] = useState(category?.name || "");
  const [selectedWallet, setSelectedWallet] = useState<string>("");

  const { wallets, refetchCategories } = useDataContext();
  const { createCategory, createCategoryLoading, createCategoryError } =
    usePostCategory();
  const { updateCategory, updateCategoryLoading, updateCategoryError } =
    usePutCategory();

  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setSelectedWallet(category?.wallet?._id || "");
    }
  }, [category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleWalletChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWallet(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (category) {
        await updateCategory(category._id, categoryName, selectedWallet);
      } else {
        await createCategory(categoryName, selectedWallet);
      }

      if (!createCategoryError && !updateCategoryError) {
        refetchCategories();
        setCompleted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const walletOptions = wallets.map((wallet) => ({
    label: wallet.name,
    value: wallet._id,
  }));

  return (
    <div className="mx-auto">
      {isCompleted ? (
        <ActionSuccessAlert
          action={category ? "update" : "create"}
          type="category"
        />
      ) : (
        <>
          <h1 className="mb-6 text-2xl font-bold">
            {category ? "Update Category" : "Create Category"}
          </h1>
          {(createCategoryError || updateCategoryError) && (
            <p className="text-red-500">
              {createCategoryError || updateCategoryError}
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <Input
              id="name"
              label="Category Name"
              value={categoryName}
              placeholder="Enter category name"
              onChange={handleInputChange}
            />

            <Select
              id="wallet"
              label="Select Wallet"
              value={selectedWallet}
              onChange={handleWalletChange}
              options={walletOptions}
            />

            <Button
              type="submit"
              label={
                createCategoryLoading
                  ? "Adding..."
                  : updateCategoryLoading
                  ? "Updating..."
                  : category
                  ? "Update Category"
                  : "Add Category"
              }
              disabled={createCategoryLoading || updateCategoryLoading}
            />
          </form>
        </>
      )}
    </div>
  );
};

export default CategoryForm;
