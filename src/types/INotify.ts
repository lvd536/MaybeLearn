export default interface INotify {
    id: number;
    title: string;
    description: string;
    type: "success" | "warning" | "error";
}
