import { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const CategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto rounded-lg">
      <h1 className="mb-6 text-2xl font-bold">Create Category</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <Input
          id="name"
          label="Category Name"
          value={categoryName}
          placeholder="Enter category name"
          onChange={handleInputChange}
        />

        <Button type="submit" label="Add Category" />
      </form>
    </div>
  );
};

export default CategoryForm;
