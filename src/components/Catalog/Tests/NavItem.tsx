import type { IFormattedQuestion } from "../../../types";

export default function NavItem({question, currentQuestion, index, OnClick}: {question: IFormattedQuestion, currentQuestion: number, index: number, OnClick: () => void}) {
    return (
        <li
            key={index}
            className={`flex font-medium w-10 h-10 
                                        ${
                                            question.isPassed
                                                ? "bg-green-300/70"
                                                : currentQuestion === index
                                                ? "bg-button-background/70"
                                                : "bg-button-background"
                                        } 
                                        rounded-xl p-2 items-center justify-center`}
            onClick={OnClick}
        >
            {index + 1}
        </li>
    );
}
