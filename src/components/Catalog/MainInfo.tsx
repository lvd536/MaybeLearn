import { Pencil, Trash } from "../../assets";
import type { ICourseData, ITestData } from "../../types";

interface IMainInfoProps {
    itemData: ICourseData | ITestData;
    userCredits:
        | {
              name: string;
              avatar: string;
              role: string;
          }
        | null
        | undefined;
    isAdmin: boolean;
    isCompleted: boolean;
    handleEdit: () => void;
    handleRemove: () => void;
}

export default function MainInfo({
    itemData,
    userCredits,
    isAdmin,
    isCompleted,
    handleEdit,
    handleRemove,
}: IMainInfoProps) {
    return (
        <div className="flex flex-col justify-between gap-3">
            <span
                className={`font-normal text-sm ${
                    itemData.level === "Easy"
                        ? "text-green-400/80"
                        : itemData.level === "Middle"
                        ? "text-amber-400/80"
                        : "text-red-500/80"
                }`}
            >
                {itemData.level}
            </span>
            <span className="flex gap-2 items-center font-bold text-base">
                {itemData.title}
                {isCompleted && (
                    <div className="text-[10px] font-normal rounded-xl bg-green-500 p-1">
                        Completed
                    </div>
                )}
                {isAdmin && (
                    <div className="flex ml-2 gap-2">
                        <button onClick={handleEdit}>
                            <Pencil />
                        </button>
                        <button onClick={handleRemove}>
                            <Trash />
                        </button>
                    </div>
                )}
            </span>
            <span className="font-normal text-sm text-card">
                {itemData.description}
            </span>
            <div className="flex items-center gap-2">
                {userCredits?.avatar && (
                    <img
                        src={userCredits?.avatar}
                        alt=""
                        className="rounded-full w-6 h-6"
                    />
                )}
                <span className="font-normal text-sm text-card">
                    {userCredits?.name}
                </span>
            </div>
        </div>
    );
}
