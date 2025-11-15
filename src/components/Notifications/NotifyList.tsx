import { useNotifyStore } from "../../stores/useNotifyStore";
import Notify from "./Notify";

export default function NotifyList() {
    const notifies = useNotifyStore((state) => state.notifications);
    return (
        <div className="fixed right-5 bottom-5">
            {notifies.map((notify, index) => (
                <Notify notify={notify} key={index} />
            ))}
        </div>
    );
}
