import { Check } from "../../../../assets";

interface INavItemProps {
    title: string;
    index: number;
    isActive: boolean;
    isFinished: boolean;
    setActiveModule: (value: React.SetStateAction<string | undefined>) => void;
    setNewFinishedTitles: (id: string) => void;
}

export default function NavItem({
    index,
    title,
    isActive,
    isFinished,
    setActiveModule,
    setNewFinishedTitles,
}: INavItemProps) {
    return (
        <div className="flex items-center gap-2" key={index}>
            <button
                className={`flex w-100 items-start justify-between font-medium text-sm p-2 transition-all duration-600 rounded-xl ${
                    isFinished
                        ? "bg-green-300/50"
                        : isActive
                        ? "bg-button-background"
                        : "bg-button-background/30"
                }`}
                onClick={() => {
                    if (!isFinished) {
                        setActiveModule(title);
                    }
                }}
                key={index}
            >
                {title}
            </button>
            <button
                className="flex w-9 h-9 rounded-full p-2 bg-button-background items-center justify-center"
                onClick={() => setNewFinishedTitles(title)}
            >
                <Check />
            </button>
        </div>
    );
}
