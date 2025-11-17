import type { ICourse, ITest } from "../../../types";

interface ICompletionProps {
    item: {
        item: ICourse | ITest;
        completed_at: Date;
    };
}

export default function CompletionItem({item}: ICompletionProps) {
    return (
        <div
            className="flex items-center justify-between bg-catalog-card rounded-sm p-3 shadow-card"
            key={item.item.id}
        >
            <div className="flex flex-col gap-2">
                <h3 className="font-medium">{item.item.data.title}</h3>
                <p className="text-sm text-white/40">
                    {item.item.data.description}
                </p>
                <p
                    className={`font-normal text-sm ${
                        item.item.data.level === "Easy"
                            ? "text-green-400/80"
                            : item.item.data.level === "Middle"
                            ? "text-amber-400/80"
                            : "text-red-500/80"
                    }`}
                >
                    {item.item.data.level}
                </p>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
                <p className="font-medium">100 Points</p>
                <p className="font-medium text-gray-500/40 text-sm">
                    {item.completed_at.toDateString()}
                </p>
            </div>
        </div>
    );
}
