import { Link } from "react-router-dom";
import { Congrats } from "../../../../assets";

interface ICongratsPageProps {
    title: string;
}

export default function CongratsPage({ title }: ICongratsPageProps) {
    return (
        <div className="flex flex-col gap-5 justify-start items-center h-screen">
            <h1 className="text-2xl font-bold">Congratulations!</h1>
            <span className="text-xl font-medium">
                Course {title} is completed
            </span>
            <span>You earn fixed 100 points!</span>
            <img
                src={Congrats}
                alt="congratulations image"
                className="max-w-100"
                loading="lazy"
            />
            <Link
                to={"/"}
                className="flex items-center justify-center text-xl font-medium rounded-xl bg-button-background py-2 px-10"
            >
                Home Page
            </Link>
        </div>
    );
}
