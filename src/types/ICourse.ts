import type {IModule} from './';

export default interface ICourse {
    id: number;
    author_id: number;
    data: {
        title: string;
        description: string;
        level: string;
        modules: IModule[];
    };
    created_at: string;
}