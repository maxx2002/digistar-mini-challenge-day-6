const SpinnerLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-10 h-10 border-2 rounded-full border-blue border-t-gray animate-spin"></div>
    </div>
  );
};

export default SpinnerLoading;
