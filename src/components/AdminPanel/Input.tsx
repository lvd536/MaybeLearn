type InputProps = {
    placeholder: string;
    value: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
    value,
    placeholder,
    onChange,
    required,
}: InputProps) {
    return (
        <input
            name="adminInput"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="ring-1 ring-indigo-500 p-2 rounded-sm"
            required={required}
        />
    );
}
