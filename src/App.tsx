import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/Other/";
import { useAuthListener } from "./hooks/useAuthListener";
import { SignUp, SignIn, ResetPassword } from "./pages/Auth";
import {
    CoursePage,
    CoursesCatalog,
    TestPage,
    TestsCatalog,
} from "./pages/Catalog/";
import { HomePage } from "./pages/Home/";
import { Profile } from "./pages/Profile/";
import { fetchCourses } from "./stores/Catalog/useCoursesStore";
import { fetchTests } from "./stores/Catalog/useTestsStore";
import { AdminPanel } from "./pages/AdminPanel/";
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
                    <Route
                        path={"/resetPassword"}
                        element={<ResetPassword />}
                    />
                    <Route path={"/profile"} element={<Profile />} />
                    <Route path={"/home"} element={<HomePage />} />
                    <Route
                        path={"/catalog/courses"}
                        element={<CoursesCatalog />}
                    />
                    <Route path={"/catalog/tests"} element={<TestsCatalog />} />
                    <Route path={"/catalog/test"} element={<TestPage />} />
                    <Route path={"/catalog/course"} element={<CoursePage />} />
                    <Route path={"/admin"} element={<AdminPanel />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
