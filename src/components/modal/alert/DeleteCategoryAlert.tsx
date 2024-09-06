import React from "react";
import { MdDelete } from "react-icons/md";
import Button from "../../ui/Button";

type DeleteCategoryAlertProps = {
  onCancel: () => void;
};

const DeleteCategoryAlert: React.FC<DeleteCategoryAlertProps> = ({
  onCancel,
}) => {
  return (
    <div className="mx-auto">
      <div className="flex items-center justify-center mb-4 text-red-500">
        <MdDelete size={100} className="text-blue" />
      </div>
      <h1 className="mb-2 text-xl font-bold text-center">
        Are you sure you want to delete this?
      </h1>
      <p className="mb-4 text-center">
        This action cannot be undone. This will permanently delete the category.
      </p>
      <div className="flex items-center justify-between gap-4 mt-8">
        <Button label="Cancel" variant="cancel" onClick={onCancel} />
        <Button label="Delete" variant="destroy" />
      </div>
    </div>
  );
};

export default DeleteCategoryAlert;
