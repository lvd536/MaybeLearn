export default interface ITest {
    id: number;
    author_id: number;
    data: {
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
    };
    created_at: string;
}
