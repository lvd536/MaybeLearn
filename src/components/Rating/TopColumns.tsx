export default function TopColumns() {
    return (
        <ul className="flex items-center self-start w-full">
            <li className="font-bold w-2/12">Rank</li>
            <li className="font-bold w-6/12 sm:w-4/12">Player</li>
            <li className="hidden sm:block font-bold w-2/12">Role</li>
            <li className="font-bold w-2/12">Points</li>
            <li className="hidden sm:block font-bold w-2/12">Joined</li>
        </ul>
    );
}
