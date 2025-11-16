import {
    removeQuestion,
    removeAnswer,
    setCurrentQuestion,
    addQuestion,
    addAnswer,
} from "../../../stores/Catalog/Creation/useTestCreationStore";
import Button from "../Button";

interface ITestControlsProps {
    currentQuestion: number;
    questionsLength: number;
}

export default function TestControls({
    currentQuestion,
    questionsLength,
}: ITestControlsProps) {
    return (
        <div className="flex items-center justify-center gap-5 my-3">
            <div className="flex flex-col gap-2 items-center">
                <Button onClick={removeQuestion}>Remove quest. -</Button>
                <Button onClick={removeAnswer}>Remove answer -</Button>
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
                    value={currentQuestion}
                    onChange={(e) => {
                        if (
                            parseInt(e.target.value) < questionsLength &&
                            parseInt(e.target.value) >= 0
                        ) {
                            setCurrentQuestion(parseInt(e.target.value));
                        }
                    }}
                />
            </div>
            <div className="flex flex-col gap-2 items-center">
                <Button onClick={addQuestion}>Add question +</Button>
                <Button onClick={addAnswer}>Add answer +</Button>
            </div>
        </div>
    );
}
