import { useEffect, useMemo } from "react";
import {
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
import { useParams } from "react-router-dom";

export default function TestCreation() {
    const { id: testId } = useParams();
    const testsTemplate = getTestTemplate();
    const questions = useMemo(
        () =>
            testsTemplate.questions.map((question, questionIndex) => (
                <Question
                    question={question}
                    questionIndex={questionIndex}
                    key={questionIndex}
                />
            )),
        [testsTemplate.questions]
    );
    const addNotify = useNotifyStore((state) => state.addNotification);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (testId) {
            updateTestById(testsTemplate, parseInt(testId));
            addNotify({
                id: new Date().getSeconds(),
                type: "success",
                description: `Edit test with id ${testId} success`,
                title: "Test Creation",
            });
        } else if (!testId) {
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
        if (testId) {
            const test = getTestById(parseInt(testId));
            if (test) {
                setTestTemplate(test.data);
            }
        } else {
            resetTestTemplate();
        }
    }, [testId]);
    return (
        <>
            <TestControls questionsLength={testsTemplate.questions.length} />
            <form
                action=""
                className="flex flex-col gap-2 items-center justify-center bg-black/25 p-2 rounded-sm w-full"
                onSubmit={handleSubmit}
            >
                <MainInfo
                    description={testsTemplate.description}
                    level={testsTemplate.level}
                    title={testsTemplate.title}
                    image={testsTemplate.image || ""}
                    points={testsTemplate.points}
                />
                <div className="grid grid-cols-2 gap-8 w-full">{questions}</div>
                <button
                    type="submit"
                    className="p-2 text-xs sm:text-base bg-button-background rounded-sm my-5 shadow-2xs shadow-indigo-500"
                >
                    {testId ? "Edit" : "Create"} test
                </button>
            </form>
        </>
    );
}
