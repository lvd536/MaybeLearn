import type ITestData from "./ITestData";

export default interface ITest {
    id: number;
    author_id: number;
    data: ITestData;
    created_at: string;
}
