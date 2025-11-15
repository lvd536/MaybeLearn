import { create } from "zustand";
import type { INotify } from "../types";

interface INotifyStore {
    notifications: INotify[];
    addNotification: (notification: INotify) => void;
    removeNotification: (id: number) => void;
}

export const useNotifyStore = create<INotifyStore>((set) => ({
    notifications: [],
    addNotification: (notification: INotify) => {
        set((state) => ({
            notifications: [...state.notifications, notification],
        }));
    },
    removeNotification: (id: number) => {
        set((state) => ({
            notifications: state.notifications.filter(
                (notification) => notification.id !== id
            ),
        }));
    },
}));
