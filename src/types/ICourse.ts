import type ICourseData from "./ICourseData";

export default interface ICourse {
    id: number;
    author_id: number;
    data: ICourseData;
    created_at: string;
}
