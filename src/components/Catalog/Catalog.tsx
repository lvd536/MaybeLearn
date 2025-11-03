import { Link } from "react-router-dom";
import CatalogCard from "../../assets/CatalogCard.png";
export default function Catalog({
    title,
    description,
    redirectTo,
}: {
    title: string;
    description: string;
    redirectTo: string;
}) {
    return (
        <div>
            <h1 className="font-bold text-3xl">{title}</h1>
            <span className="font-normal text-base text-card mt-4">
                {description}
            </span>
            <input
                type="search"
                name={`${title}SearchBar`}
                id={`${title}SearchBar`}
                placeholder={`Search ${title}`}
                className="w-full rounded-sm bg-button-background mt-3 mb-10 p-2"
            />
            <ul>
                <li className="flex items-center justify-between bg-catalog-card rounded-sm p-4">
                    <div className="flex flex-col items-baseline justify-between gap-15">
                        <div className="flex flex-col justify-between gap-3">
                            <span className="font-normal text-sm text-card">
                                Beginner
                            </span>
                            <span className="font-bold text-base">
                                Introduction to Python
                            </span>
                            <span className="font-normal text-sm text-card">
                                Learn the basics of Python programming language
                                with hands-on exercises.
                            </span>
                        </div>
                        <Link
                            to={`/catalog/${redirectTo}`}
                            className="bg-button-background py-2 px-3 rounded-xl"
                        >
                            Start
                        </Link>
                    </div>
                    <img src={CatalogCard} alt="" />
                </li>
            </ul>
        </div>
    );
}
