import {
    removeModule,
    removeLesson,
    setCurrentModule,
    addModule,
    addLesson,
} from "../../../stores/Catalog/Creation/useCourseCreationStore";
import Button from "../Button";

interface ICourseControlsProps {
    modulesLength: number;
    currentModule: number;
}

export default function CourseControls({
    modulesLength,
    currentModule,
}: ICourseControlsProps) {
    return (
        <div className="flex items-center justify-center gap-5 my-3">
            <div className="flex flex-col gap-2 items-center">
                <Button onClick={removeModule}>Remove module -</Button>
                <Button onClick={removeLesson}>Remove lesson -</Button>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <span className="flex text-xs sm:text-base items-center justify-center bg-black/30 p-2 rounded-sm w-30 sm:w-50">
                    Course Creation
                </span>
                <input
                    type="number"
                    name="currentModule"
                    id="currentModule"
                    placeholder="moduleId"
                    className="bg-black/30 p-1 sm:p-2 rounded-sm w-30 sm:w-50"
                    value={currentModule}
                    onChange={(e) => {
                        if (
                            parseInt(e.target.value) < modulesLength &&
                            parseInt(e.target.value) >= 0
                        ) {
                            setCurrentModule(parseInt(e.target.value));
                        }
                    }}
                />
            </div>
            <div className="flex flex-col gap-2 items-center">
                <Button onClick={addModule}>Add module +</Button>
                <Button onClick={addLesson}>Add lesson +</Button>
            </div>
        </div>
    );
}
