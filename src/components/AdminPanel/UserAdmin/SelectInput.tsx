import type { IInputProps } from "../../../types";

export default function SelectInput({
    value,
    onChange,
    required,
    id,
    name,
    children,
}: IInputProps) {
    return (
        <select
            name={name}
            id={id}
            className="ring-1 ring-indigo-500 p-2 rounded-sm bg-button-background w-30 sm:w-50"
            value={value}
            onChange={onChange}
            required={required}
        >
            {children}
        </select>
    );
}
