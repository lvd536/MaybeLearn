type InputProps = {
    type: string;
    name: string;
    placeholder: string;
    minLength: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
};

export default function Input({
    type,
    name,
    placeholder,
    minLength,
    onChange,
    value,
}: InputProps) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="ring-1 ring-indigo-500 rounded-xs p-2"
            required
            minLength={minLength}
            onChange={onChange}
            value={value}
        />
    );
}
