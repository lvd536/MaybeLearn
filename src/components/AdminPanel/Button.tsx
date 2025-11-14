
type ButtonProps = {
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({children, onClick}: ButtonProps) {
    return (
        <button
            className="bg-black/30 p-2 rounded-sm w-50"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
