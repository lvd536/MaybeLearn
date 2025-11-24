import type { NavigateFunction } from "react-router-dom";

interface INavButtonsProps {
    page: string;
    nextButtonActive: boolean;
    previousButtonActive: boolean;
    navigate: NavigateFunction;
}

export default function NavButtons({
    page,
    previousButtonActive,
    nextButtonActive,
    navigate,
}: INavButtonsProps) {
    return (
        <div className="flex gap-2">
            {previousButtonActive && (
                <button
                    className="flex justify-center bg-catalog-card rounded-sm p-2 w-20"
                    onClick={() =>
                        navigate(
                            `/admin/management/${parseInt(page || "1") - 1}`
                        )
                    }
                >
                    Previous
                </button>
            )}
            <p className="flex justify-center bg-catalog-card rounded-sm p-2 w-20">
                Page {page}
            </p>
            {nextButtonActive && (
                <button
                    className="flex justify-center bg-catalog-card rounded-sm p-2 w-20"
                    onClick={() =>
                        navigate(
                            `/admin/management/${parseInt(page || "1") + 1}`
                        )
                    }
                >
                    Next
                </button>
            )}
        </div>
    );
}
