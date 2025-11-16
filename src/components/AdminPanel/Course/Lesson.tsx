import { setLessonInfo } from "../../../stores/Catalog/Creation/useCourseCreationStore";
import type { IModule } from "../../../types";
import Input from "../Input";
import LessonTitle from "../LessonTitle";

interface ILessonProps {
    moduleIndex: number;
    lessonIndex: number;
    module: IModule;
}

export default function Lesson({
    moduleIndex,
    lessonIndex,
    module,
}: ILessonProps) {
    return (
        <div key={lessonIndex} className="flex flex-col gap-2">
            <LessonTitle>Lesson {lessonIndex + 1}</LessonTitle>
            <Input
                placeholder="Lesson Title"
                value={module.lessons[lessonIndex].title}
                onChange={(e) => {
                    setLessonInfo(
                        moduleIndex,
                        lessonIndex,
                        "title",
                        e.target.value
                    );
                }}
            />
            <Input
                placeholder="Lesson Content"
                value={module.lessons[lessonIndex].content}
                onChange={(e) => {
                    setLessonInfo(
                        moduleIndex,
                        lessonIndex,
                        "content",
                        e.target.value
                    );
                }}
            />
        </div>
    );
}
