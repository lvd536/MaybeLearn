import { HomeCard } from "../../../assets/";
import { getCoursesStable } from "../../../stores/Catalog/useCoursesStore";
import Card from "../Card";
export default function Courses() {
    const courses = getCoursesStable().slice(0, 5);
    return (
        <div>
            <h1 className="font-bold text-2xl mb-12">Popular Courses</h1>
            <ul className="flex gap-5">
                {courses.map((c, index) => (
                    <Card
                        title={c.data.title}
                        description={c.data.description}
                        image={HomeCard}
                        key={index}
                    />
                ))}
            </ul>
        </div>
    );
}
