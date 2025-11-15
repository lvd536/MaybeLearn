import { create } from "zustand";
import type { IProfileType } from "../types";
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
}));
