import { useEffect, useState } from "react";
import {
    ModuleTitle,
    ParagraphTitle,
    Description,
} from "../../../components/Catalog/";
import { CodeNode } from "../../../components/Other/";
import { getTest } from "../../../stores/useTestsStore";
import type { IFormattedQuestion } from "../../../types";
import { RadioButton, NavItem } from "../../../components/Catalog";
import { sendTestCompletionData } from "../../../utils/test";
import Congrats from "../../../assets/Congrats.png";
import { Link } from "react-router-dom";

export default function TestPage() {
    const [question, setQuestion] = useState<number>(0);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
    const [questions, setQuestions] = useState<IFormattedQuestion[]>([]);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
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

    useEffect(() => {
        (async () => {
            if (isCompleted) {
                await sendTestCompletionData(
                    currentItem?.id || 1,
                    currentItem?.data.points || 0
                );
            }
        })();
    }, [isCompleted, currentItem?.id, currentItem?.data.points]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isCorrectAnswer) {
            const updatedQuestions = questions.map((q, index) =>
                index === question ? { ...q, isPassed: true } : q
            );
            setQuestions(updatedQuestions);

            if (question === questions.length - 1) setIsCompleted(true);
            else setQuestion((prev) => prev + 1);
        }
    };

    const handleClick = (isCorrect: boolean) => setIsCorrectAnswer(isCorrect);

    return (
        <>
            {currentItem && !isCompleted && questions.length > 0 && (
                <div className="flex justify-between">
                    <div className="flex flex-col gap-4">
                        <ModuleTitle>{currentItem.data.title}</ModuleTitle>
                        <Description>
                            {currentItem.data.description}
                        </Description>
                        <ul className="flex gap-2">
                            {questions.map((q, index) => (
                                <NavItem
                                    question={q}
                                    currentQuestion={question}
                                    index={index}
                                    OnClick={() => {
                                        if (!q.isPassed) {
                                            setQuestion(index);
                                        }
                                    }}
                                    key={index}
                                />
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
                                    <RadioButton
                                        answer={answer}
                                        index={index}
                                        handleClick={handleClick}
                                        key={index}
                                    />
                                )
                            )}
                            <button
                                type="submit"
                                className="bg-button-background rounded-xs p-2 mt-5"
                            >
                                Answer
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {currentItem && isCompleted && (
                <div className="flex flex-col gap-5 justify-start items-center h-screen">
                    <h1 className="text-2xl font-bold">Congratulations!</h1>
                    <span className="text-xl font-medium">
                        Test {currentItem.data.title} is completed
                    </span>
                    <span>You earn {currentItem.data.points} points!</span>
                    <img
                        src={Congrats}
                        alt="congratulations image"
                        className="max-w-100"
                    />
                    <Link
                        to={"/"}
                        className="flex items-center justify-center text-xl font-medium rounded-xl bg-button-background py-2 px-10"
                    >
                        Home Page
                    </Link>
                </div>
            )}
        </>
    );
}
