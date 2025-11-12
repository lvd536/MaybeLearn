import { create } from "zustand";
import { client } from "../../services/supabase";
import type { ITest } from "../../types";

interface ITestsStore {
    tests: ITest[];
    getTests: () => ITest[];
    fetchTests: () => Promise<ITest[] | undefined>;
    getTest: (id: number) => ITest | undefined;
    addTest: (course: ITest) => void;
    updateTest: (course: ITest) => void;
    deleteTest: (id: number) => void;
}

const coursesStore = create<ITestsStore>((set, get) => ({
    tests: [],

    getTests: () => {
        get().fetchTests();
        return get().tests;
    },

    fetchTests: async () => {
        try {
            const { data, error } = await client.from("tests").select("*");
            if (error) {
                console.error("Error fetching tests:", error);
            } else {
                set({ tests: data });
                return data;
            }
        } catch (err) {
            console.error("Unexpected error fetching tests:", err);
        }
    },

    getTest: (id: number): ITest | undefined => {
        const test = get().tests.find((test: ITest) => test.id === id);
        if (!test) {
            console.warn(`Test with id ${id} not found.`);
        }
        return test;
    },

    addTest: (test: ITest) => {
        client
            .from("tests")
            .insert([test])
            .then(() => {
                get().fetchTests();
            });
    },

    updateTest: (test: ITest) => {
        client
            .from("tests")
            .update(test)
            .eq("id", test.id)
            .then(() => {
                get().fetchTests();
            });
    },

    deleteTest: (id: number) => {
        client
            .from("tests")
            .delete()
            .eq("id", id)
            .then(() => {
                get().fetchTests();
            });
    },
}));

export const getTests = () => coursesStore.getState().getTests();
export const fetchTests = () => coursesStore.getState().fetchTests();
export const addTest = (test: ITest) => coursesStore.getState().addTest(test);
export const getTest = (id: number) => coursesStore.getState().getTest(id);
export const deleteTest = (id: number) =>
    coursesStore.getState().deleteTest(id);
