import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp, SignIn } from "./pages/Auth";
import Profile from "./pages/Profile/Profile.tsx";
import HomePage from "./pages/Home/HomePage.tsx";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import CoursesCatalog from "./pages/Catalog/Courses/CoursesCatalog.tsx";
import TestsCatalog from "./pages/Catalog/Tests/TestsCatalog.tsx";
import TestPage from "./pages/Catalog/Tests/TestPage.tsx";
import CoursePage from "./pages/Catalog/Courses/CoursePage.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <div className="container mx-auto">
                <NavBar />
                <Routes>
                    <Route path={"/"} element={<App />} />
                    <Route path={"/register"} element={<SignUp />} />
                    <Route path={"/login"} element={<SignIn />} />
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
                <Footer />
            </div>
        </BrowserRouter>
    </StrictMode>
);
