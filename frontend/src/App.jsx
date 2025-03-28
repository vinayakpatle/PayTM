import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from './pages/Dashboard';
import Send from "./pages/Send";
import ErrorPage from "./pages/ErrorPage";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Signup />} />;
            <Route path="/signup" element={<Signup />} />;
            <Route path="/signin" element={<Signin />} />;
            <Route path="/dashboard" element={<Dashboard />} />;
            <Route path="/send" element={<Send />} />;
            <Route path="*" element={<ErrorPage />} />;
        </Routes>
    </BrowserRouter>
  )
}

export default App
