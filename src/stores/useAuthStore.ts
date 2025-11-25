import { create } from "zustand";
import type { IEditProfileForm, IProfileType } from "../types";
import type { User } from "@supabase/supabase-js";

interface State {
    profile: IProfileType | null;
    user: User | null;
    setUser: (u: User | null) => void;
    setProfile: (user: IProfileType | null) => void;
    updateProfileInfo: (updates: IEditProfileForm) => void;
    increaseProfileElo: (value: number) => void;
}
export const useAuthStore = create<State>((set) => ({
    profile: null,
    user: null,
    setUser: (user) => set({ user: user }),
    setProfile: (profile: IProfileType | null) => {
        set({
            profile: profile,
        });
    },
    updateProfileInfo: (updates: IEditProfileForm) => {
        const existingProfile = useAuthStore.getState().profile;
        if (!existingProfile) return;
        set({
            profile: {
                ...existingProfile,
                ...updates,
            },
        });
    },
    increaseProfileElo: (value: number) => {
        const existingProfile = useAuthStore.getState().profile;
        if (!existingProfile) return;
        set({
            profile: {
                ...existingProfile,
                elo: existingProfile.elo + value,
            },
        });
    },
}));
