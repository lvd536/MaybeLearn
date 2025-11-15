import type { INotify } from "../../types";
import { useNotifyStore } from "../../stores/useNotifyStore";
import { Check, Warning, Error } from "../../assets";

type NotifyProps = { notify: INotify };

export default function Notify({ notify }: NotifyProps) {
    const removeNotification = useNotifyStore(
        (state) => state.removeNotification
    );
    const handleAnimationEnd = (id: number) => {
        removeNotification(id);
    };
    return (
        <div
            className="flex flex-col gap-5 min-h-20 bg-indigo-400 rounded-sm p-2 animate-notify"
            onAnimationEnd={() => handleAnimationEnd(notify.id)}
        >
            <div className="flex items-center justify-between gap-2">
                <h1 className="font-bold text-gray-100">{notify.title}</h1>
                <span>
                    {notify.type === "success" ? (
                        <Check />
                    ) : notify.type === "warning" ? (
                        <Warning />
                    ) : (
                        <Error />
                    )}
                </span>
            </div>
            <span>{notify.description}</span>
        </div>
    );
}
