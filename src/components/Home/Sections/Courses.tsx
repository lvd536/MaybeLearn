import { HomeCard } from "../../../assets/";
import { getCoursesStable } from "../../../stores/Catalog/useCoursesStore";
import Card from "../Card";
export default function Courses() {
    const courses = getCoursesStable().slice(0, 4);
    return (
        <>
            {courses.length > 0 && (
                <div className="flex flex-col gap-6">
                    <h1 className="hidden sm:inline font-bold text-2xl">
                        Popular Courses
                    </h1>
                    <ul className="hidden sm:flex flex-wrap gap-5">
                        {courses.map((c, index) => (
                            <Card
                                title={c.data.title}
                                description={c.data.description}
                                image={c.data.image || HomeCard}
                                key={index}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
