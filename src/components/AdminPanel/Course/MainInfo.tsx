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
                id={`mainInfoTitle`}
                placeholder="Title"
                value={title}
                onChange={(e) => {
                    setCourseInfo("title", e.target.value);
                }}
            />
            <Input
                id={`mainInfoLevel`}
                placeholder="Level"
                value={level}
                onChange={(e) => {
                    setCourseInfo("level", e.target.value);
                }}
            />
            <Input
                id={`mainInfoDescription`}
                placeholder="Description"
                value={description}
                onChange={(e) => {
                    setCourseInfo("description", e.target.value);
                }}
            />
            <Input
                id={`mainInfoImage`}
                placeholder="Image"
                value={image}
                required={false}
                onChange={(e) => {
                    setCourseInfo("image", e.target.value);
                }}
            />
        </div>
    );
}
