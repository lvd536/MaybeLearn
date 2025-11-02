import { useAuthListener } from "./hooks/useAuthListener";
import HomePage from "./pages/Home/HomePage";
function App() {
    useAuthListener();
    return (
        <>
            <HomePage />
        </>
    );
}

export default App;
