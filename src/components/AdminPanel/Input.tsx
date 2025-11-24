type InputProps = {
    placeholder: string;
    value: string;
    name?: string;
    required?: boolean;
    id?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
    value,
    placeholder,
    onChange,
    required,
    id,
    name,
}: InputProps) {
    return (
        <input
            name={name || "adminInput"}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="text-xs sm:text-base ring-1 ring-indigo-500 p-2 rounded-sm"
            required={required}
            id={id}
        />
    );
}
