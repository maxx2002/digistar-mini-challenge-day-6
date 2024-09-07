import { useState } from "react";
import axios from "axios";

const useDeleteCategory = () => {
  const [deleteCategoryLoading, setDeleteCategoryLoading] =
    useState<boolean>(false);
  const [deleteCategoryError, setDeleteCategoryError] = useState<string | null>(
    null
  );

  const deleteCategory = async (id: string) => {
    setDeleteCategoryLoading(true);
    try {
      const response = await axios.delete<{ message: string }>(
        `https://digistar-demo-be.vercel.app/api/categories/${id}`
      );
      return response.data.message;
    } catch (err) {
      setDeleteCategoryError("Failed to delete category. Please try again.");
      console.error(err);
    } finally {
      setDeleteCategoryLoading(false);
    }
  };

  return { deleteCategory, deleteCategoryLoading, deleteCategoryError };
};

export default useDeleteCategory;
