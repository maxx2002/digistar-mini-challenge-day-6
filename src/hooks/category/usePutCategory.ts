import { useState } from "react";
import axios from "axios";
import { Category } from "../../interfaces/Category";

const usePutCategory = () => {
  const [updateCategoryLoading, setUpdateCategoryLoading] =
    useState<boolean>(false);
  const [updateCategoryError, setUpdateCategoryError] = useState<string | null>(
    null
  );

  const updateCategory = async (id: string, name: string, wallet: string) => {
    setUpdateCategoryLoading(true);
    try {
      const response = await axios.put<{ message: string; category: Category }>(
        `https://digistar-demo-be.vercel.app/api/categories/${id}`,
        { name, wallet }
      );
      return response.data.category;
    } catch (err) {
      setUpdateCategoryError("Failed to update category. Please try again.");
      console.error(err);
    } finally {
      setUpdateCategoryLoading(false);
    }
  };

  return { updateCategory, updateCategoryLoading, updateCategoryError };
};

export default usePutCategory;
