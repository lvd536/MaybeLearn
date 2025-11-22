type ModuleTitleProps = {
    children: React.ReactNode;
};

export default function ModuleTitle({ children }: ModuleTitleProps) {
    return (
        <h3 className="text-base sm:text-lg self-center mt-2 mb-1">
            {children}
        </h3>
    );
}
