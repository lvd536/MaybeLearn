export default function Button({
    type,
    children,
    ...rest
}: {
    type: "submit" | "reset" | "button" | undefined;
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type={type}
            className="bg-button-background p-2 rounded-sm w-50"
            {...rest}
        >
            {children}
        </button>
    );
}
