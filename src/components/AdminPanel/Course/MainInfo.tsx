import { setCourseInfo } from "../../../stores/Catalog/Creation/useCourseCreationStore";
import Input from "../Input";

interface IMainInfoProps {
    title: string;
    level: string;
    description: string;
}

export default function MainInfo({
    title,
    level,
    description,
}: IMainInfoProps) {
    return (
        <div className="flex flex-col gap-2 mb-5">
            <h1>Main Info</h1>
            <Input
                placeholder="Title"
                value={title}
                onChange={(e) => {
                    setCourseInfo("title", e.target.value);
                }}
            />
            <Input
                placeholder="Level"
                value={level}
                onChange={(e) => {
                    setCourseInfo("level", e.target.value);
                }}
            />
            <Input
                placeholder="Description"
                value={description}
                onChange={(e) => {
                    setCourseInfo("description", e.target.value);
                }}
            />
        </div>
    );
}
