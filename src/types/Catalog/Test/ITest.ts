import type IQuestion from "./IQuestion";

export default interface ITest {
    id: number;
    author_id: number;
    data: {
        title: string;
        description: string;
        level: string;
        points: number;
        questions: IQuestion[];
    };
    created_at: string;
}
