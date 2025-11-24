import type { IInputProps } from "../../types";

export default function TextInput({
    value,
    placeholder,
    onChange,
    required,
    id,
    name,
}: IInputProps) {
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
