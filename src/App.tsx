import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
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
import {
    AdminPanel,
    CourseCreation,
    TestCreation,
    UserEdit,
    UserManagement,
} from "./pages/AdminPanel/";
import NotifyList from "./components/Notifications/NotifyList";
import Rating from "./pages/Rating/Rating";
import { Info } from "./components/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
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

                    <Route element={<ProtectedRoute />}>
                        <Route path={"/rating"} element={<Rating />} />
                        <Route
                            path={"/catalog/courses"}
                            element={<CoursesCatalog />}
                        />
                        <Route
                            path={"/catalog/tests"}
                            element={<TestsCatalog />}
                        />
                        <Route
                            path={"/catalog/test/:id"}
                            element={<TestPage />}
                        />
                        <Route
                            path={"/catalog/course/:id"}
                            element={<CoursePage />}
                        />
                        <Route path="/admin" element={<AdminPanel />}>
                            <Route index element={<Info />} />
                            <Route
                                path="course/:id"
                                element={<CourseCreation />}
                            />
                            <Route path="test/:id" element={<TestCreation />} />
                            <Route path="course" element={<CourseCreation />} />
                            <Route path="test" element={<TestCreation />} />
                            <Route
                                path="management/:page"
                                element={<UserManagement />}
                            />
                            <Route
                                path="user/edit/:id"
                                element={<UserEdit />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </div>
            <NotifyList />
        </BrowserRouter>
    );
}

export default App;
