import { setModuleInfo } from "../../../stores/Catalog/Creation/useCourseCreationStore";
import type { IModule } from "../../../types";
import Input from "../Input";
import ModuleTitle from "../ModuleTitle";
import Lesson from "./Lesson";

interface IModuleProps {
    moduleIndex: number;
    module: IModule;
}

export default function Module({ moduleIndex, module }: IModuleProps) {
    return (
        <div
            key={moduleIndex}
            className="flex flex-col bg-button-background p-5 rounded-sm shadow-2xl shadow-button-background"
        >
            <ModuleTitle>Module {moduleIndex + 1}</ModuleTitle>
            <Input
                placeholder="Module Title"
                value={module.title}
                onChange={(e) => {
                    setModuleInfo(moduleIndex, "title", e.target.value);
                }}
            />
            {module.lessons.map((_, lessonIndex) => (
                <Lesson
                    lessonIndex={lessonIndex}
                    module={module}
                    moduleIndex={moduleIndex}
                    key={lessonIndex}
                />
            ))}
        </div>
    );
}
