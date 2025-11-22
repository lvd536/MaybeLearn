import { memo, useMemo } from "react";
import { setModuleInfo } from "../../../stores/Catalog/Creation/useCourseCreationStore";
import type { IModule } from "../../../types";
import Input from "../Input";
import ModuleTitle from "../ModuleTitle";
import Lesson from "./Lesson";

interface IModuleProps {
    moduleIndex: number;
    module: IModule;
}

function Module({ moduleIndex, module }: IModuleProps) {
    const lessons = useMemo(
        () =>
            module.lessons.map((lesson, lessonIndex) => (
                <Lesson
                    lessonIndex={lessonIndex}
                    lesson={lesson}
                    moduleIndex={moduleIndex}
                    key={lessonIndex}
                />
            )),
        [module.lessons, moduleIndex]
    );
    return (
        <div
            key={moduleIndex}
            className="flex flex-col bg-button-background p-5 rounded-sm shadow-2xl shadow-button-background"
        >
            <ModuleTitle>Module {moduleIndex + 1}</ModuleTitle>
            <Input
                id={`moduleTitle${moduleIndex}`}
                placeholder="Module Title"
                value={module.title}
                onChange={(e) => {
                    setModuleInfo(moduleIndex, "title", e.target.value);
                }}
            />
            {lessons}
        </div>
    );
}

export default memo(Module);
