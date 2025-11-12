import { Catalog } from "../../../components/Catalog/";
import { getCourses } from "../../../stores/Catalog/useCoursesStore";

export default function CoursesCatalog() {
    const courses = getCourses();
    return (
        <>
            {courses ? (
                <Catalog
                    title="Courses"
                    description="Explore our courses and learning paths"
                    redirectTo="course"
                    items={courses}
                />
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}
