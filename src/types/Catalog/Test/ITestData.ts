import type IQuestion from "./IQuestion";

export default interface ITestData {
    title: string;
    description: string;
    level: string;
    elo: number;
    questions: IQuestion[];
    image: string;
}
