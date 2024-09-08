interface InputProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-medium text-gray-500">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border rounded-md border-darkgray focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default Input;
