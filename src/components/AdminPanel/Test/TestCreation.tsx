import { useState, useEffect } from "react";
import {
    getCurrentQuestion,
    getTestTemplate,
    resetTestTemplate,
    setTestTemplate,
} from "../../../stores/Catalog/Creation/useTestCreationStore";
import { addNewTest, updateTestById } from "../../../utils/test";
import { getTestById } from "../../../stores/Catalog/useTestsStore";
import { useNotifyStore } from "../../../stores/useNotifyStore";
import TestControls from "./TestControls";
import MainInfo from "./MainInfo";
import Question from "./Question";

interface ITestCreationProps {
    testId: number | null;
}

export default function TestCreation({ testId }: ITestCreationProps) {
    const [originalTestId, setOriginalTestId] = useState<number | null>(null);
    const testsTemplate = getTestTemplate();
    const currentQuestion = getCurrentQuestion();
    const addNotify = useNotifyStore((state) => state.addNotification);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (originalTestId) {
            updateTestById(testsTemplate, originalTestId);
            addNotify({
                id: new Date().getSeconds(),
                type: "success",
                description: `Edit test with id ${originalTestId} success`,
                title: "Test Creation",
            });
        } else if (!originalTestId) {
            addNewTest(testsTemplate);
            addNotify({
                id: new Date().getSeconds(),
                type: "success",
                description: "Success test creation",
                title: "Test Creation",
            });
        }
    }
    useEffect(() => {
        if (testId !== null) {
            const test = getTestById(testId);
            if (test) {
                setOriginalTestId(testId);
                setTestTemplate(test.data);
            }
        } else {
            resetTestTemplate();
        }
    }, []);
    return (
        <>
            <TestControls
                currentQuestion={currentQuestion}
                questionsLength={testsTemplate.questions.length}
            />
            <form
                action=""
                className="flex flex-col gap-2 items-center justify-center bg-black/25 p-2 rounded-sm w-full"
                onSubmit={handleSubmit}
            >
                <MainInfo
                    description={testsTemplate.description}
                    level={testsTemplate.level}
                    title={testsTemplate.title}
                />
                <div className="grid grid-cols-2 gap-8 w-full">
                    {testsTemplate.questions.map((question, questionIndex) => (
                        <Question
                            question={question}
                            questionIndex={questionIndex}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="p-2 bg-button-background rounded-sm my-5 shadow-2xs shadow-indigo-500"
                >
                    {originalTestId ? "Edit" : "Create"} test
                </button>
            </form>
        </>
    );
}
