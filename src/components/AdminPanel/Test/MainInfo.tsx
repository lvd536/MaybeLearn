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
                id={`mainInfoTitle`}
                placeholder="Title"
                value={title}
                onChange={(e) => {
                    setTestInfo("title", e.target.value);
                }}
            />
            <select
                name="adminType"
                id="adminInput"
                className="ring-1 ring-indigo-500 p-2 rounded-sm bg-button-background"
                value={level}
                onChange={(e) => setTestInfo("level", e.target.value)}
                required
            >
                <option value="Easy">Easy</option>
                <option value="Middle">Middle</option>
                <option value="Hard">Hard</option>
            </select>
            <Input
                id={`mainInfoPoints`}
                placeholder="Points"
                value={points!.toString()}
                onChange={(e) => {
                    setTestInfo("points", e.target.value);
                }}
            />
            <Input
                id={`mainInfoDescription`}
                placeholder="Description"
                value={description}
                onChange={(e) => {
                    setTestInfo("description", e.target.value);
                }}
            />
            <Input
                id={`mainInfoImage`}
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
