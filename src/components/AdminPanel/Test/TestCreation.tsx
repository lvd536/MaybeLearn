import { useState, useEffect } from "react";
import {
    addAnswer,
    addQuestion,
    getCurrentQuestion,
    getTestTemplate,
    removeAnswer,
    removeQuestion,
    resetTestTemplate,
    setAnswerInfo,
    setCurrentQuestion,
    setQuestionInfo,
    setTestInfo,
    setTestTemplate,
} from "../../../stores/Catalog/Creation/useTestCreationStore";
import { Button, Input, ModuleTitle, LessonTitle } from "../";
import { addNewTest, updateTestById } from "../../../utils/test";
import { getTestById } from "../../../stores/Catalog/useTestsStore";
import { useNotifyStore } from "../../../stores/useNotifyStore";

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
                                parseInt(e.target.value) <
                                    testsTemplate.questions.length &&
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
            <form
                action=""
                className="flex flex-col gap-2 items-center justify-center bg-black/25 p-2 rounded-sm w-full"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2 mb-5">
                    <h1>Main Info</h1>
                    <Input
                        placeholder="Title"
                        value={testsTemplate.title}
                        onChange={(e) => {
                            setTestInfo("title", e.target.value);
                        }}
                    />
                    <Input
                        placeholder="Level"
                        value={testsTemplate.level}
                        onChange={(e) => {
                            setTestInfo("level", e.target.value);
                        }}
                    />
                    <Input
                        placeholder="Description"
                        value={testsTemplate.description}
                        onChange={(e) => {
                            setTestInfo("description", e.target.value);
                        }}
                    />
                </div>
                {/* <input
                    type="text"
                    placeholder="Image URL"
                    value={testsTemplate.image}
                    onChange={(e) => {
                        setCourseInfo("image", e.target.value);
                    }}
                    required
                /> */}
                <div className="grid grid-cols-2 gap-8 w-full">
                    {testsTemplate.questions.map((question, questionIndex) => (
                        <div
                            key={questionIndex}
                            className="flex flex-col gap-3 bg-button-background p-5 rounded-sm shadow-2xl shadow-button-background"
                        >
                            <ModuleTitle>
                                Question {questionIndex + 1}
                            </ModuleTitle>
                            <Input
                                placeholder="Question"
                                value={
                                    testsTemplate.questions[questionIndex]
                                        .question
                                }
                                onChange={(e) => {
                                    setQuestionInfo(
                                        questionIndex,
                                        "question",
                                        e.target.value
                                    );
                                }}
                            />
                            <Input
                                placeholder="Task"
                                value={
                                    testsTemplate.questions[questionIndex].task
                                }
                                onChange={(e) => {
                                    setQuestionInfo(
                                        questionIndex,
                                        "task",
                                        e.target.value
                                    );
                                }}
                            />
                            <div className="flex items-center justify-between gap-2 ring-1 ring-indigo-500 p-2 rounded-sm">
                                <label htmlFor="isCorrect">
                                    Task contains code?
                                </label>
                                <input
                                    name="isCorrect"
                                    type="checkbox"
                                    checked={
                                        testsTemplate.questions[questionIndex]
                                            .isCode
                                    }
                                    className="accent-gray-500 w-5 h-5"
                                    onChange={(e) => {
                                        setQuestionInfo(
                                            questionIndex,
                                            "isCode",
                                            e.target.checked
                                        );
                                    }}
                                />
                            </div>
                            {question.answers.map((_answer, answerIndex) => (
                                <div
                                    key={answerIndex}
                                    className="flex flex-col gap-2"
                                >
                                    <LessonTitle>
                                        Answer {answerIndex + 1}
                                    </LessonTitle>
                                    <Input
                                        placeholder="Answer"
                                        value={
                                            testsTemplate.questions[
                                                questionIndex
                                            ].answers[answerIndex].answer
                                        }
                                        onChange={(e) => {
                                            setAnswerInfo(
                                                questionIndex,
                                                answerIndex,
                                                "answer",
                                                e.target.value
                                            );
                                        }}
                                    />
                                    <div className="flex items-center justify-between gap-2 ring-1 ring-indigo-500 p-2 rounded-sm">
                                        <label htmlFor="isCorrect">
                                            Correct answer?
                                        </label>
                                        <input
                                            name="isCorrect"
                                            type="checkbox"
                                            checked={
                                                testsTemplate.questions[
                                                    questionIndex
                                                ].answers[answerIndex]
                                                    .is_correct
                                            }
                                            className="accent-gray-500 w-5 h-5"
                                            onChange={(e) => {
                                                setAnswerInfo(
                                                    questionIndex,
                                                    answerIndex,
                                                    "is_correct",
                                                    e.target.checked
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
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
