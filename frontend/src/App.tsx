import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Home from "./components/pages/Home";
import LoginForm from "./components/pages/Login";
import RegisterForm from "./components/pages/Register";
import "./App.css"

function App() {
  return (
  <div className="flex flex-col min-h-screen flex-grow justify-center py-5 md:py-0 w-full max-w-7xl mx-auto">
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  </div>
  );
}

export default App