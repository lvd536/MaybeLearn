import { setCourseInfo } from "../../../stores/Catalog/Creation/useCourseCreationStore";
import type { IMainInfo } from "../../../types";
import TextInput from "../TextInput";

export default function MainInfo({
    title,
    level,
    description,
    image,
}: IMainInfo) {
    return (
        <div className="flex flex-col gap-2 mb-5">
            <h1>Main Info</h1>
            <TextInput
                id={`mainInfoTitle`}
                placeholder="Title"
                value={title}
                onChange={(e) => {
                    setCourseInfo("title", e.target.value);
                }}
            />
            <select
                name="adminType"
                id="adminInput"
                className="ring-1 ring-indigo-500 p-2 rounded-sm bg-button-background"
                value={level}
                onChange={(e) => setCourseInfo("level", e.target.value)}
                required
            >
                <option value="Easy">Easy</option>
                <option value="Middle">Middle</option>
                <option value="Hard">Hard</option>
            </select>
            <TextInput
                id={`mainInfoDescription`}
                placeholder="Description"
                value={description}
                onChange={(e) => {
                    setCourseInfo("description", e.target.value);
                }}
            />
            <TextInput
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
