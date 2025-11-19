import { setCourseInfo } from "../../../stores/Catalog/Creation/useCourseCreationStore";
import type { IMainInfo } from "../../../types";
import Input from "../Input";

export default function MainInfo({
    title,
    level,
    description,
    image,
}: IMainInfo) {
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
            <Input
                placeholder="Image"
                value={image}
                onChange={(e) => {
                    setCourseInfo("image", e.target.value);
                }}
            />
        </div>
    );
}
