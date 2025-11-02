import { useAuthListener } from "./hooks/useAuthListener";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home/HomePage";
function App() {
    useAuthListener();
    return (
        <>
            <NavBar/>
            <HomePage/>
            <Footer/>
        </>
    );
}

export default App;
