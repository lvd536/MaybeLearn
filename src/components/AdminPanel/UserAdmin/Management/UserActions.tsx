import type { NavigateFunction } from "react-router-dom";
import { Pencil, Trash } from "../../../../assets";

interface IUserActions {
    id: number;
    handleRemove: (userId: number) => void;
    navigate: NavigateFunction;
}

export default function UserActions({
    id,
    handleRemove,
    navigate,
}: IUserActions) {
    return (
        <div className="flex flex-col h-full justify-between items-end">
            <div className="flex gap-2">
                <button
                    className="flex items-center justify-center bg-button-background p-1 rounded-sm w-6 h-6"
                    onClick={() => navigate(`/admin/user/edit/${id}`)}
                >
                    <Pencil />
                </button>
                <button
                    className="flex items-center justify-center bg-button-background p-1 rounded-sm w-6 h-6"
                    onClick={() => handleRemove(id)}
                >
                    <Trash />
                </button>
            </div>
            <p className="hidden lg:block text-white/15 text-xs">{id}</p>
        </div>
    );
}
