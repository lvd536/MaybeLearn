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
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    </StrictMode>
);
