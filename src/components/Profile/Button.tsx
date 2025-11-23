type Button = {
    type: "submit" | "reset" | "button" | undefined;
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ type, children, ...rest }: Button) {
    return (
        <button
            type={type}
            className="bg-button-background p-2 rounded-sm sm:w-50"
            {...rest}
        >
            {children}
        </button>
    );
}
