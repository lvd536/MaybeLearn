export default interface IInputProps {
    placeholder?: string;
    value: string;
    name?: string;
    required?: boolean;
    id?: string;
    children?: React.ReactNode;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}
