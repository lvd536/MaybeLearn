import { create } from "zustand";
import { client } from "../../services/supabase";
import type { ITest } from "../../types";

interface ITestsStore {
    tests: ITest[];
    getTestById: (id: number) => ITest | undefined;
    getTests: () => ITest[];
    fetchTests: () => Promise<ITest[] | undefined>;
    getTest: (id: number) => ITest | undefined;
    addTest: (course: ITest) => void;
    updateTest: (course: ITest) => void;
    deleteTest: (id: number) => void;
}

const testsStore = create<ITestsStore>((set, get) => ({
    tests: [],

    getTestById: (id: number) => {
        const test = get().tests.find((test: ITest) => test.id === id);
        return test;
    },

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

export const getTests = () => testsStore.getState().getTests();
export const getTestsStable = () => testsStore((s: ITestsStore) => s.tests);
export const fetchTests = () => testsStore.getState().fetchTests();
export const addTest = (test: ITest) => testsStore.getState().addTest(test);
export const getTest = (id: number) => testsStore.getState().getTest(id);
export const deleteTest = (id: number) => testsStore.getState().deleteTest(id);
export const getTestById = (id: number) =>
    testsStore.getState().getTestById(id);
