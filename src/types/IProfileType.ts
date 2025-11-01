export default interface IProfileType {
    id: number,
    display_name: string,
    avatar_url: string,
    bio: string,
    points: number,
    role: string,
    rank: string,
    createdAt?: string
}