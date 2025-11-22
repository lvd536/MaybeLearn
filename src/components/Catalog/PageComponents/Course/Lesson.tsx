import type { IMedia } from "../../../../types";
import { Text, ParagraphTitle } from "../../../../components/Catalog/";
import Media from "./Media";

interface ILessonProps {
    lesson: {
        title: string;
        content: string;
        media: IMedia | undefined;
    };
    index: number;
}

export default function Lesson({ index, lesson }: ILessonProps) {
    return (
        <div key={index}>
            <ParagraphTitle>{lesson.title}</ParagraphTitle>
            <Text>{lesson.content}</Text>
            <Media media={lesson.media} />
        </div>
    );
}
