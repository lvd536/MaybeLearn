import { memo } from "react";
import { setAnswerInfo } from "../../../stores/Catalog/Creation/useTestCreationStore";
import type { IQuestion } from "../../../types";
import Input from "../Input";
import LessonTitle from "../LessonTitle";

interface IAnswerProps {
    questionIndex: number;
    answerIndex: number;
    question: IQuestion;
}

function Answer({ questionIndex, answerIndex, question }: IAnswerProps) {
    return (
        <div key={answerIndex} className="flex flex-col gap-2">
            <LessonTitle>Answer {answerIndex + 1}</LessonTitle>
            <Input
                placeholder="Answer"
                value={question.answers[answerIndex].answer}
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
                <label htmlFor="isCorrect">Correct answer?</label>
                <input
                    name="isCorrect"
                    type="checkbox"
                    checked={question.answers[answerIndex].is_correct}
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
    );
}

export default memo(Answer);
