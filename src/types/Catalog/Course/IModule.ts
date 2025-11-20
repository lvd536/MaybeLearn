export default interface IModule {
    title: string;
    lessons: {
        title: string;
        content: string;
        media: string | null;
    }[];
}
