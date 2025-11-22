import { memo, useEffect, useState } from "react";
import {
    setLessonInfo,
    setMediaInfo,
} from "../../../stores/Catalog/Creation/useCourseCreationStore";
import Input from "../Input";
import LessonTitle from "../LessonTitle";
import type { IMedia } from "../../../types";

interface ILessonProps {
    moduleIndex: number;
    lessonIndex: number;
    lesson: {
        title: string;
        content: string;
        media: IMedia | undefined;
    };
}

function Lesson({ moduleIndex, lessonIndex, lesson }: ILessonProps) {
    const [haveMedia, setHaveMedia] = useState<boolean>(
        lesson.media !== undefined
    );

    useEffect(() => {
        setHaveMedia(lesson.media !== undefined);
    }, [lesson.media]);

    const handleIsMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked && lesson.media === undefined) {
            lesson.media = {
                type: "video",
                url: "",
            };
            setHaveMedia(true);
        } else {
            lesson.media = undefined;
            setHaveMedia(false);
        }
    };
    return (
        <div key={lessonIndex} className="flex flex-col gap-2">
            <LessonTitle>
                Module {moduleIndex + 1} {"=>"} Lesson {lessonIndex + 1}
            </LessonTitle>
            <Input
                id={`title${lessonIndex}`}
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
                id={`content${lessonIndex}`}
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
            <div className="flex items-center justify-between gap-2 ring-1 ring-indigo-500 p-2 rounded-sm">
                <label htmlFor="adminIsMedia">Have Media</label>
                <input
                    type="checkbox"
                    name="adminInput"
                    id="adminIsMedia"
                    checked={haveMedia}
                    className="accent-gray-500 w-5 h-5"
                    onChange={(e) => handleIsMediaChange(e)}
                />
            </div>
            {haveMedia && lesson.media && (
                <>
                    <select
                        name="adminType"
                        id="adminInput"
                        className="ring-1 ring-indigo-500 p-2 rounded-sm bg-button-background"
                        value={lesson.media.type}
                        onChange={(e) => {
                            setMediaInfo(
                                moduleIndex,
                                lessonIndex,
                                "type",
                                e.target.value
                            );
                        }}
                    >
                        <option value="video">Video</option>
                        <option value="photo">Photo</option>
                    </select>
                    <Input
                        id={`url${lessonIndex}`}
                        placeholder="Media Url"
                        value={lesson.media.url}
                        onChange={(e) => {
                            setMediaInfo(
                                moduleIndex,
                                lessonIndex,
                                "url",
                                e.target.value
                            );
                        }}
                    />
                </>
            )}
        </div>
    );
}

export default memo(Lesson);
