import { useState } from "react";
import axios from "axios";
import { Category } from "../../interfaces/Category";

const usePostCategory = () => {
  const [createCategoryLoading, setCreateCategoryLoading] =
    useState<boolean>(false);
  const [createCategoryError, setCreateCategoryError] = useState<string | null>(
    null
  );

  const createCategory = async (name: string, wallet: string) => {
    setCreateCategoryLoading(true);
    try {
      const response = await axios.post<{
        message: string;
        category: Category;
      }>("https://digistar-demo-be.vercel.app/api/categories", {
        name,
        wallet,
      });
      return response.data.category;
    } catch (err) {
      setCreateCategoryError("Failed to create category. Please try again.");
      console.error(err);
    } finally {
      setCreateCategoryLoading(false);
    }
  };

  return { createCategory, createCategoryLoading, createCategoryError };
};

export default usePostCategory;
