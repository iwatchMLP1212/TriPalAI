type LabeledInputProps = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  name: string;
};

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  type,
  name,
  placeholder,
  id,
}) => {
  return (
    <div>
      <label
        htmlFor={`labeldinput-id-${id}`}
        className="block text-lg font-medium"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={`labeldinput-id-${id}`}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
        focus:ring-primary focus:border-primary transition-all text-md"
      />
    </div>
  );
};

export default LabeledInput;
