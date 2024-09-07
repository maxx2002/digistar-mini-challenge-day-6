import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Category } from "../../interfaces/Category";

interface GetAllCategoriesResponse {
  data: Category[];
  message: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const useGetAllCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const response = await axios.get<GetAllCategoriesResponse>(
        "https://digistar-demo-be.vercel.app/api/categories"
      );
      setCategories(response.data.data);
      setCategoriesError(null);
    } catch (error) {
      setCategoriesError(
        error instanceof Error ? error.message : "Failed to load categories"
      );
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    categoriesLoading,
    categoriesError,
    refetchCategories: fetchCategories,
  };
};

export default useGetAllCategories;
