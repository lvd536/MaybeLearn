type TextProps = {
    children: React.ReactNode;
};

export default function Text({ children }: TextProps) {
    return <span className="font-normal text-base">{children}</span>;
}
