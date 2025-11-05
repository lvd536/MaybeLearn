import { useEffect, useRef, useState } from "react";
import ModuleTitle from "../../../components/Catalog/ModuleTitle";
import ParagraphTitle from "../../../components/Catalog/ParagraphTitle";
import Description from "../../../components/Catalog/Tests/Description";
import CodeNode from "../../../components/CodeNode";
import { getTest } from "../../../stores/useTestsStore";
import type { IFormattedQuestion } from "../../../types";

export default function TestPage() {
    const [question, setQuestion] = useState<number>(0);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
    const [questions, setQuestions] = useState<IFormattedQuestion[]>([]);
    const answerButton = useRef(null);

    const activeTestId = parseInt(localStorage.getItem("testId") ?? "1");
    const currentItem = getTest(activeTestId);

    useEffect(() => {
        if (currentItem) {
            const formattedQuestions: IFormattedQuestion[] =
                currentItem.data.questions.map((q) => ({
                    question: q.question,
                    isCode: q.isCode,
                    task: q.task,
                    answers: q.answers,
                    isPassed: false,
                }));
            setQuestions(formattedQuestions);
        }
    }, [currentItem]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isCorrectAnswer) {
            const updatedQuestions = questions.map((q, index) =>
                index === question ? { ...q, isPassed: true } : q
            );
            setQuestions(updatedQuestions);

            console.log(updatedQuestions);

            if (question === questions.length - 1) {
                alert("You have passed the test!");
            } else {
                setQuestion((prev) => prev + 1);
            }
        }
    };

    const handleClick = (isCorrect: boolean) => setIsCorrectAnswer(isCorrect);

    return (
        <>
            {currentItem && questions.length > 0 && (
                <div className="flex justify-between">
                    <div className="flex flex-col gap-4">
                        <ModuleTitle>{currentItem.data.title}</ModuleTitle>
                        <Description>
                            {currentItem.data.description}
                        </Description>
                        <ul className="flex gap-2">
                            {questions.map((q, index) => (
                                <li
                                    key={index}
                                    className={`flex font-medium w-10 h-10 
                                        ${
                                            q.isPassed
                                                ? "bg-green-300/70"
                                                : question === index
                                                ? "bg-button-background/70"
                                                : "bg-button-background"
                                        } 
                                        rounded-xl p-2 items-center justify-center`}
                                    onClick={() => {
                                        if (!q.isPassed) {
                                            setQuestion(index);
                                        }
                                    }}
                                >
                                    {index + 1}
                                </li>
                            ))}
                        </ul>
                        <ParagraphTitle>Question {question + 1}</ParagraphTitle>
                        <span>{questions[question].question}</span>
                        {questions[question].isCode ? (
                            <CodeNode
                                code={questions[question].task}
                                language="javascript"
                                showLineNumbers={true}
                                startingLineNumber={1}
                            />
                        ) : (
                            <span>{questions[question].task}</span>
                        )}
                        <form
                            action=""
                            className="flex flex-col"
                            onSubmit={handleSubmit}
                        >
                            {questions[question].answers.map(
                                (answer, index) => (
                                    <div
                                        className="question flex gap-2"
                                        key={index}
                                    >
                                        <input
                                            type="radio"
                                            name={`question`}
                                            id={`number${index}`}
                                            onClick={() =>
                                                handleClick(answer.is_correct)
                                            }
                                        />
                                        <label
                                            htmlFor={`number${index}`}
                                            className="flex"
                                        >
                                            {answer.answer}
                                        </label>
                                    </div>
                                )
                            )}
                            <button
                                type="submit"
                                className="bg-button-background rounded-xs p-2 mt-5"
                                ref={answerButton}
                            >
                                Answer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
