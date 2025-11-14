export default interface ITestData {
    title: string;
    description: string;
    level: string;
    points: number;
    questions: {
        question: string;
        task: string;
        answers: {
            answer: string;
            is_correct: boolean;
        }[];
        isCode: boolean;
    }[];
}
