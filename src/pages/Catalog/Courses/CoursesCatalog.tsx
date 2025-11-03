import Catalog from "../../../components/Catalog/Catalog";
import { getCourses } from "../../../stores/useCoursesStore";

export default function CoursesCatalog() {
    const items = getCourses();
    return (
        <>
            {items ? (
                <Catalog
                    title="Courses"
                    description="Explore our courses and learning paths"
                    redirectTo="course"
                    items={items}
                />
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}
