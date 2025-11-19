import type IQuestion from "./IQuestion";

export default interface ITestData {
    title: string;
    description: string;
    level: string;
    points: number;
    questions: IQuestion[];
    image: string;
}
