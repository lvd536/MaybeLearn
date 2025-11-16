export default interface IQuestion {
    question: string;
    task: string;
    answers: {
        answer: string;
        is_correct: boolean;
    }[];
    isCode: boolean;
}
