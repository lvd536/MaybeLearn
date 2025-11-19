import type { IModule } from "../..";

export default interface ICourseData {
    title: string;
    description: string;
    level: string;
    modules: IModule[];
    image: string;
}
