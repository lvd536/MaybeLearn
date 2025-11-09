import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useAuthListener } from "./hooks/useAuthListener";
import { SignUp, SignIn } from "./pages/Auth";
import CoursePage from "./pages/Catalog/Courses/CoursePage";
import CoursesCatalog from "./pages/Catalog/Courses/CoursesCatalog";
import TestPage from "./pages/Catalog/Tests/TestPage";
import TestsCatalog from "./pages/Catalog/Tests/TestsCatalog";
import HomePage from "./pages/Home/HomePage";
import Profile from "./pages/Profile/Profile";
import { fetchCourses } from "./stores/useCoursesStore";
import { fetchTests } from "./stores/useTestsStore";
import ResetPassword from "./pages/Auth/ResetPassword";
function App() {
    useAuthListener();
    fetchCourses();
    fetchTests();
    return (
        <BrowserRouter>
            <div className="container mx-auto">
                <NavBar />
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/register"} element={<SignUp />} />
                    <Route path={"/login"} element={<SignIn />} />
                    <Route path={"/resetPassword"} element={<ResetPassword />} />
                    <Route path={"/profile"} element={<Profile />} />
                    <Route path={"/home"} element={<HomePage />} />
                    <Route
                        path={"/catalog/courses"}
                        element={<CoursesCatalog />}
                    />
                    <Route path={"/catalog/tests"} element={<TestsCatalog />} />
                    <Route path={"/catalog/test"} element={<TestPage />} />
                    <Route path={"/catalog/course"} element={<CoursePage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
