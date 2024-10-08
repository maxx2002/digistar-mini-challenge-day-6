import { MdCheckCircle } from "react-icons/md";

type ActionSuccessAlertProps = {
  action: "create" | "update" | "delete" | "change";
  type: "category" | "wallet" | "expense";
};

const ActionSuccessAlert: React.FC<ActionSuccessAlertProps> = ({
  action,
  type,
}) => {
  const actionMessages = {
    create: "created",
    update: "updated",
    delete: "deleted",
    change: "changed",
  };

  const typeMessages = {
    category: "category",
    wallet: "wallet",
    expense: "expense",
  };

  const icon = <MdCheckCircle className="size-32 text-green" />;

  const message = `The ${typeMessages[type]} was ${actionMessages[action]} successfully.`;

  return (
    <div className="flex flex-col items-center justify-center">
      {icon}
      <span className="mt-4 text-xl font-medium">{message}</span>
    </div>
  );
};

export default ActionSuccessAlert;
