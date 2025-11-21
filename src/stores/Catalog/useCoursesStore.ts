import { create } from "zustand";
import { client } from "../../services/supabase";
import type { ICourse } from "../../types";

interface ICoursesStore {
    courses: ICourse[];
    getCourses: () => ICourse[];
    getCourseById: (id: number) => ICourse | undefined;
    fetchCourses: () => Promise<ICourse[] | undefined>;
    getCourse: (id: number) => ICourse | undefined;
    addCourse: (course: ICourse) => void;
    updateCourse: (course: ICourse) => void;
    deleteCourse: (id: number) => void;
}

const coursesStore = create<ICoursesStore>((set, get) => ({
    courses: [],

    getCourseById: (id: number) => {
        const course = get().courses.find(
            (course: ICourse) => course.id === id
        );
        return course;
    },

    getCourses: () => {
        get().fetchCourses();
        return get().courses;
    },

    fetchCourses: async () => {
        try {
            const { data, error } = await client.from("lessons").select("*");
            if (error) {
                console.error("Error fetching courses:", error);
            } else {
                set({ courses: data });
                return data;
            }
        } catch (err) {
            console.error("Unexpected error fetching courses:", err);
        }
    },

    getCourse: (id: number): ICourse | undefined => {
        const course = get().courses.find(
            (course: ICourse) => course.id === id
        );
        if (!course) {
            console.warn(`Course with id ${id} not found.`);
        }
        return course;
    },

    addCourse: (course: ICourse) => {
        client
            .from("lessons")
            .insert([course])
            .then(() => {
                get().fetchCourses();
            });
    },

    updateCourse: (course: ICourse) => {
        client
            .from("lessons")
            .update(course)
            .eq("id", course.id)
            .then(() => {
                get().fetchCourses();
            });
    },

    deleteCourse: (id: number) => {
        client
            .from("lessons")
            .delete()
            .eq("id", id)
            .then(() => {
                get().fetchCourses();
            });
    },
}));

export const getCourses = () => coursesStore.getState().getCourses();
export const getCourseById = (id: number) =>
    coursesStore.getState().getCourseById(id);
export const getCoursesStable = () =>
    coursesStore((s: ICoursesStore) => s.courses);
export const fetchCourses = () => coursesStore.getState().fetchCourses();
export const addCourse = (course: ICourse) =>
    coursesStore.getState().addCourse(course);
export const getCourse = (id: number) => coursesStore.getState().getCourse(id);
export const deleteCourse = (id: number) =>
    coursesStore.getState().deleteCourse(id);
