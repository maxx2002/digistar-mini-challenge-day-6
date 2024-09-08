import { formatDate } from "../../../utils/formatDate";

interface TransactionSummaryProps {
  transactions: number;
  value: number;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  transactions,
  value,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h6 className="text-lg font-semibold">{formatDate(Date())}</h6>
      <div className="flex items-center gap-10 text-darkgray">
        <p>Number of transactions: {transactions}</p>
        <p>Value: {value < 0 ? `-$${Math.abs(value)}` : `$${value}`}</p>
      </div>
    </div>
  );
};

export default TransactionSummary;
