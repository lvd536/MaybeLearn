import { memo, useMemo } from "react";
import { setQuestionInfo } from "../../../stores/Catalog/Creation/useTestCreationStore";
import type { IQuestion } from "../../../types";
import Input from "../Input";
import ModuleTitle from "../ModuleTitle";
import Answer from "./Answer";

interface IQuestionProps {
    questionIndex: number;
    question: IQuestion;
}

function Question({ questionIndex, question }: IQuestionProps) {
    const answers = useMemo(
        () =>
            question.answers.map((_, index) => (
                <Answer
                    answerIndex={index}
                    questionIndex={questionIndex}
                    question={question}
                    key={index}
                />
            )),
        [question, questionIndex]
    );
    return (
        <div
            key={questionIndex}
            className="flex flex-col gap-3 bg-button-background p-5 rounded-sm shadow-2xl shadow-button-background"
        >
            <ModuleTitle>Question {questionIndex + 1}</ModuleTitle>
            <Input
                placeholder="Question"
                value={question.question}
                onChange={(e) => {
                    setQuestionInfo(questionIndex, "question", e.target.value);
                }}
            />
            <Input
                placeholder="Task"
                value={question.task}
                onChange={(e) => {
                    setQuestionInfo(questionIndex, "task", e.target.value);
                }}
            />
            <div className="flex items-center justify-between gap-2 ring-1 ring-indigo-500 p-2 rounded-sm">
                <label htmlFor="isCorrect">Task contains code?</label>
                <input
                    name="isCorrect"
                    type="checkbox"
                    checked={question.isCode}
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
            {answers}
        </div>
    );
}

export default memo(Question);
