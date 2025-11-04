import { useRef, useState } from "react";
import ModuleTitle from "../../../components/Catalog/ModuleTitle";
import ParagraphTitle from "../../../components/Catalog/ParagraphTitle";
import Description from "../../../components/Catalog/Tests/Description";
import CodeNode from "../../../components/CodeNode";
import { getTest } from "../../../stores/useTestsStore";

export default function TestPage() {
    const [question, setQuestion] = useState<number>(0);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
    const answerButton = useRef(null);
    const activeTestId = parseInt(localStorage.getItem("testId") ?? "1");
    const currentItem = getTest(activeTestId);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isCorrectAnswer) console.log("correct!");
    };
    const handleClick = (isCorrect: boolean) => {
        setIsCorrectAnswer(isCorrect);
    };
    return (
        <>
            {currentItem && (
                <div className="flex justify-between">
                    <div className="flex flex-col gap-4">
                        <ModuleTitle>{currentItem.data.title}</ModuleTitle>
                        <Description>
                            {currentItem.data.description}
                        </Description>
                        <ul className="flex gap-2">
                            {currentItem.data.questions.map((q, index) => (
                                <li
                                    className={`flex font-medium w-10 h-10 ${
                                        question === index
                                            ? "bg-button-background/70"
                                            : "bg-button-background"
                                    } rounded-xl p-2 items-center justify-center`}
                                    onClick={() => setQuestion(index)}
                                >
                                    {index + 1}
                                </li>
                            ))}
                        </ul>
                        <ParagraphTitle>Question {question + 1}</ParagraphTitle>
                        <span>
                            {currentItem.data.questions[question].question}
                        </span>
                        {currentItem.data.questions[question].isCode ? (
                            <CodeNode
                                code={currentItem.data.questions[0].task}
                                language="javascript"
                                showLineNumbers={true}
                                startingLineNumber={1}
                            />
                        ) : (
                            <span>
                                {currentItem.data.questions[question].task}
                            </span>
                        )}
                        <form
                            action=""
                            className="flex flex-col"
                            onSubmit={handleSubmit}
                        >
                            {currentItem.data.questions[question].answers.map(
                                (answer, index) => (
                                    <div
                                        className="question flex gap-2"
                                        key={index}
                                    >
                                        <input
                                            type="radio"
                                            name={`number`}
                                            id={`number`}
                                            onClick={() =>
                                                handleClick(answer.is_correct)
                                            }
                                        />
                                        <label
                                            htmlFor={`number`}
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
