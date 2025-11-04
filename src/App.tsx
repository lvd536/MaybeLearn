import { useAuthListener } from "./hooks/useAuthListener";
import HomePage from "./pages/Home/HomePage";
import { fetchCourses } from "./stores/useCoursesStore";
import { fetchTests } from "./stores/useTestsStore";
function App() {
    useAuthListener();
    fetchCourses();
    fetchTests();
    return (
        <>
            <HomePage />
        </>
    );
}

export default App;
