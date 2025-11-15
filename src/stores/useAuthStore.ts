import { create } from "zustand";
import type { IEditProfileForm, IProfileType } from "../types";
import type { User } from "@supabase/supabase-js";

interface State {
    profile: IProfileType | null;
    user: User | null;
    completedTests: number;
    completedCourses: number;
    setCompletedTests: (completedTests: number) => void;
    setCompletedCourses: (completedCourses: number) => void;
    setUser: (u: User | null) => void;
    setProfile: (user: IProfileType | null) => void;
    updateProfileInfo: (updates: IEditProfileForm) => void;
}
export const useAuthStore = create<State>((set) => ({
    profile: null,
    user: null,
    completedTests: 0,
    completedCourses: 0,
    setCompletedTests: (completedTests) =>
        set({ completedTests: completedTests }),
    setCompletedCourses: (completedCourses) =>
        set({ completedCourses: completedCourses }),
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
}));
