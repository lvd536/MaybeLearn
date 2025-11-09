type ModuleTitleProps = {
    children: React.ReactNode;
};

export default function ModuleTitle({ children }: ModuleTitleProps) {
    return <h1 className="font-bold text-2xl">{children}</h1>;
}
