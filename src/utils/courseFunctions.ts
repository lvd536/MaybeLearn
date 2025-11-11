import type { ICourseData } from "../types"
import { addNewCourse } from "./course";

interface ICourseFunctions {
    coursesTemplate: ICourseData,
    setCoursesTemplate: React.Dispatch<React.SetStateAction<ICourseData>>
    currentModule: number,
    setCurrentModule: React.Dispatch<React.SetStateAction<number>>
}

export class CourseFunctions {
    
    coursesTemplate: ICourseData;
    setCoursesTemplate: React.Dispatch<React.SetStateAction<ICourseData>>;
    currentModule: number;
    setCurrentModule: React.Dispatch<React.SetStateAction<number>>;
    
    constructor({
        coursesTemplate,
        setCoursesTemplate,
        currentModule,
        setCurrentModule
    }: ICourseFunctions) {
        this.coursesTemplate = coursesTemplate;
        this.setCoursesTemplate = setCoursesTemplate;
        this.currentModule = currentModule;
        this.setCurrentModule = setCurrentModule;
    }

    addModule() {
            this.setCoursesTemplate({
                ...this.coursesTemplate,
                modules: [
                    ...this.coursesTemplate.modules,
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
            });
        }
        removeModule() {
            if (this.coursesTemplate.modules.length === 1) return;
    
            this.setCoursesTemplate({
                ...this.coursesTemplate,
                modules: this.coursesTemplate.modules.slice(
                    0,
                    this.coursesTemplate.modules.length - 1
                ),
            });
        }
        setCourseInfo(name: string, value: string) {
            this.setCoursesTemplate({
                ...this.coursesTemplate,
                [name]: value,
            });
        }
        setLessonInfo(
            moduleIndex: number,
            lessonIndex: number,
            name: string,
            value: string
        ) {
            this.setCoursesTemplate({
                ...this.coursesTemplate,
                modules: this.coursesTemplate.modules.map((module, index) =>
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
            });
        }
        setModuleInfo(moduleIndex: number, name: string, value: string) {
            this.setCoursesTemplate((prevTemplate) => ({
                ...prevTemplate,
                modules: prevTemplate.modules.map((module, index) =>
                    index === moduleIndex ? { ...module, [name]: value } : module
                ),
            }));
        }
        addLesson() {
            this.setCoursesTemplate({
                ...this.coursesTemplate,
                modules: this.coursesTemplate.modules.map((module, index) =>
                    index === this.currentModule
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
            });
        }
        removeLesson() {
            if (this.coursesTemplate.modules[this.currentModule].lessons.length === 1) return;
    
            this.setCoursesTemplate({
                ...this.coursesTemplate,
                modules: this.coursesTemplate.modules.map((module, index) =>
                    index === this.currentModule
                        ? {
                              ...module,
                              lessons: module.lessons.slice(
                                  0,
                                  module.lessons.length - 1
                              ),
                          }
                        : module
                ),
            });
        }
        handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            addNewCourse(this.coursesTemplate);
        }
}