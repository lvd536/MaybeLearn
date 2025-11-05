export default interface IFormattedQuestion {
    question: string;
    task: string;
    answers: {
        answer: string;
        is_correct: boolean;
    }[];
    isCode: boolean;
    isPassed: boolean;
}