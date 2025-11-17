import { memo } from "react";
import { setLessonInfo } from "../../../stores/Catalog/Creation/useCourseCreationStore";
import Input from "../Input";
import LessonTitle from "../LessonTitle";

interface ILessonProps {
    moduleIndex: number;
    lessonIndex: number;
    lesson: {
        title: string;
        content: string;
    };
}

function Lesson({ moduleIndex, lessonIndex, lesson }: ILessonProps) {
    return (
        <div key={lessonIndex} className="flex flex-col gap-2">
            <LessonTitle>
                Module {moduleIndex + 1} {"=>"} Lesson {lessonIndex + 1}
            </LessonTitle>
            <Input
                placeholder="Lesson Title"
                value={lesson.title}
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
                value={lesson.content}
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

export default memo(Lesson);
