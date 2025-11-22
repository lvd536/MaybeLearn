import { setTestInfo } from "../../../stores/Catalog/Creation/useTestCreationStore";
import type { IMainInfo } from "../../../types";
import Input from "../Input";

export default function MainInfo({
    title,
    level,
    description,
    image,
    points,
}: IMainInfo) {
    return (
        <div className="flex flex-col gap-2 mb-5">
            <h1>Main Info</h1>
            <Input
                placeholder="Title"
                value={title}
                onChange={(e) => {
                    setTestInfo("title", e.target.value);
                }}
            />
            <Input
                placeholder="Level"
                value={level}
                onChange={(e) => {
                    setTestInfo("level", e.target.value);
                }}
            />
            <Input
                placeholder="Points"
                value={points!.toString()}
                onChange={(e) => {
                    setTestInfo("points", e.target.value);
                }}
            />
            <Input
                placeholder="Description"
                value={description}
                onChange={(e) => {
                    setTestInfo("description", e.target.value);
                }}
            />
            <Input
                placeholder="Image"
                value={image}
                required={false}
                onChange={(e) => {
                    setTestInfo("image", e.target.value);
                }}
            />
        </div>
    );
}
