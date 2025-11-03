import { useAuthListener } from "./hooks/useAuthListener";
import HomePage from "./pages/Home/HomePage";
import { fetchCourses } from "./stores/useCoursesStore";
function App() {
    useAuthListener();
    fetchCourses()
    return (
        <>
            <HomePage />
        </>
    );
}

export default App;
