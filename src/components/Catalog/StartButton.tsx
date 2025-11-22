import { Link } from "react-router-dom";

interface IStartButtonProps {
    isCompleted: boolean;
    redirectTo: string;
    itemId: string;
}

export default function StartButton({
    isCompleted,
    redirectTo,
    itemId,
}: IStartButtonProps) {
    return (
        <>
            {isCompleted ? (
                <span className="bg-button-background/70 py-2 px-3 rounded-xl cursor-not-allowed">
                    Completed
                </span>
            ) : (
                <Link
                    to={`/catalog/${redirectTo}/${itemId}`}
                    className="bg-button-background py-2 px-3 rounded-xl"
                >
                    Start
                </Link>
            )}
        </>
    );
}
