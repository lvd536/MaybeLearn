type StatsCardProps = {
    name: string;
    value: number;
};

export default function StatsCard({ name, value }: StatsCardProps) {
    return (
        <li className="flex flex-col justify-between ring-1 ring-stats rounded-lg w-[251px] h-[96px] p-4">
            <span className="font-bold text-xl">{value}</span>
            <span className="font-normal text-sm text-card">{name}</span>
        </li>
    );
}
