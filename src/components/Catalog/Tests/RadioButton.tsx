type RadioButtonProps = {
    answer: { answer: string; is_correct: boolean };
    index: number;
    handleClick: (answer: boolean) => void;
};

export default function RadioButton({
    answer,
    index,
    handleClick,
}: RadioButtonProps) {
    return (
        <div className="flex gap-2" key={index}>
            <input
                type="radio"
                name={`question`}
                id={`number${index}`}
                onClick={() => handleClick(answer.is_correct)}
            />
            <label htmlFor={`number${index}`} className="flex">
                {answer.answer}
            </label>
        </div>
    );
}
