import type IMedia from "./IMedia";

export default interface IModule {
    title: string;
    lessons: {
        title: string;
        content: string;
        media: IMedia | null;
    }[];
}
