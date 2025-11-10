
type NavItemProps = {
    isActive: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}

export default function NavItem({isActive, onClick, children}: NavItemProps) {
    return (
        <li
            className={`bg-button-background/80 rounded-sm p-2 w-50 transition-bg duration-300 hover:bg-button-background ${
                isActive && "ring-1 ring-white"
            }`}
            onClick={onClick}
        >
            {children}
        </li>
    );
}
