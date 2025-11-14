import { create } from "zustand";
import type { ICourseData } from "../../../types";

interface ICourseCreationStore {
    courseId: number | null;
    courseTemplate: ICourseData;
    setCourseTemplate: (data: ICourseData) => void;
    currentModule: number;
    setCurrentModule: (number: number) => void;

    resetCourseTemplate: () => void;
    addModule: () => void;
    removeModule: () => void;
    setCourseInfo: (name: string, value: string) => void;
    setLessonInfo: (
        moduleIndex: number,
        lessonIndex: number,
        name: string,
        value: string
    ) => void;
    setModuleInfo: (moduleIndex: number, name: string, value: string) => void;
    addLesson: () => void;
    removeLesson: () => void;
    setCourseId: (id: number) => void;
}

const initialTemplate: ICourseData = {
    title: "",
    level: "",
    description: "",
    // image: "",
    modules: [
        {
            title: "",
            lessons: [
                {
                    title: "",
                    content: "",
                },
            ],
        },
    ],
};

const courseCreationStore = create<ICourseCreationStore>((set, get) => ({
    courseId: 0,
    courseTemplate: initialTemplate,
    currentModule: 0,
    resetCourseTemplate: () => {
        set({
            courseTemplate: initialTemplate,
            courseId: null,
        });
    },
    setCourseTemplate: (data: ICourseData) => {
        set({ courseTemplate: data, courseId: null });
    },
    setCurrentModule: (number: number) => {
        set({ currentModule: number });
    },
    addModule: () => {
        set({
            courseTemplate: {
                ...get().courseTemplate,
                modules: [
                    ...get().courseTemplate.modules,
                    {
                        title: "",
                        lessons: [
                            {
                                title: "",
                                content: "",
                            },
                        ],
                    },
                ],
            },
        });
    },
    removeModule: () => {
        if (get().courseTemplate.modules.length === 1) return;

        set({
            courseTemplate: {
                ...get().courseTemplate,
                modules: get().courseTemplate.modules.slice(
                    0,
                    get().courseTemplate.modules.length - 1
                ),
            },
        });
    },
    setCourseInfo: (name: string, value: string) => {
        set({
            courseTemplate: {
                ...get().courseTemplate,
                [name]: value,
            },
        });
    },
    setLessonInfo: (
        moduleIndex: number,
        lessonIndex: number,
        name: string,
        value: string
    ) => {
        set({
            courseTemplate: {
                ...get().courseTemplate,
                modules: get().courseTemplate.modules.map((module, index) =>
                    index === moduleIndex
                        ? {
                              ...module,
                              lessons: module.lessons.map((lesson, index) =>
                                  index === lessonIndex
                                      ? { ...lesson, [name]: value }
                                      : lesson
                              ),
                          }
                        : module
                ),
            },
        });
    },
    setModuleInfo: (moduleIndex: number, name: string, value: string) => {
        set({
            courseTemplate: {
                ...get().courseTemplate,
                modules: get().courseTemplate.modules.map((module, index) =>
                    index === moduleIndex
                        ? { ...module, [name]: value }
                        : module
                ),
            },
        });
    },
    addLesson: () => {
        set({
            courseTemplate: {
                ...get().courseTemplate,
                modules: get().courseTemplate.modules.map((module, index) =>
                    index === get().currentModule
                        ? {
                              ...module,
                              lessons: [
                                  ...module.lessons,
                                  {
                                      title: "",
                                      content: "",
                                  },
                              ],
                          }
                        : module
                ),
            },
        });
    },
    removeLesson: () => {
        if (
            get().courseTemplate.modules[get().currentModule].lessons.length ===
            1
        )
            return;
        set({
            courseTemplate: {
                ...get().courseTemplate,
                modules: get().courseTemplate.modules.map((module, index) =>
                    index === get().currentModule
                        ? {
                              ...module,
                              lessons: module.lessons.slice(
                                  0,
                                  module.lessons.length - 1
                              ),
                          }
                        : module
                ),
            },
        });
    },
    setCourseId: (id: number) => {
        set({
            courseId: id,
        });
    },
}));

export const getCourseTemplate = () =>
    courseCreationStore((s: ICourseCreationStore) => s.courseTemplate);
export const getCurrentModule = () =>
    courseCreationStore((s: ICourseCreationStore) => s.currentModule);
export const setCurrentModule = (number: number) =>
    courseCreationStore.getState().setCurrentModule(number);
export const setCourseId = (id: number) =>
    courseCreationStore.getState().setCourseId(id);
export const getCourseId = () =>
    courseCreationStore((s: ICourseCreationStore) => s.courseId);

export const addModule = () => courseCreationStore.getState().addModule();
export const removeModule = () => courseCreationStore.getState().removeModule();
export const setCourseInfo = (name: string, value: string) =>
    courseCreationStore.getState().setCourseInfo(name, value);
export const setLessonInfo = (
    moduleIndex: number,
    lessonIndex: number,
    name: string,
    value: string
) =>
    courseCreationStore
        .getState()
        .setLessonInfo(moduleIndex, lessonIndex, name, value);
export const setModuleInfo = (
    moduleIndex: number,
    name: string,
    value: string
) => courseCreationStore.getState().setModuleInfo(moduleIndex, name, value);
export const setCourseTemplate = (data: ICourseData) =>
    courseCreationStore.getState().setCourseTemplate(data);
export const addLesson = () => courseCreationStore.getState().addLesson();
export const removeLesson = () => courseCreationStore.getState().removeLesson();
export const resetCourseTemplate = () =>
    courseCreationStore.getState().resetCourseTemplate();
