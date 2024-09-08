import ExpenseCard from "../../../components/ui/ExpenseCard";
import SpinnerLoading from "../../../components/ui/SpinnerLoading";
import { Expense } from "../../../interfaces/Expense";

interface ExpenseListProps {
  expensesLoading: boolean;
  expensesError: string | null;
  expenseList: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expensesLoading,
  expensesError,
  expenseList,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {expensesLoading && <SpinnerLoading />}
      {expensesError && (
        <p className="text-darkred">Expense: {expensesError}</p>
      )}
      {!expensesLoading && expenseList.length > 0
        ? expenseList.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense} />
          ))
        : !expensesLoading && !expensesError && <p>No expenses found</p>}
    </div>
  );
};

export default ExpenseList;
