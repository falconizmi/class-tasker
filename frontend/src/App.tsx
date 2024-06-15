import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Home from "./components/pages/Home";
import LoginForm from "./components/pages/Login";
import RegisterForm from "./components/pages/Register";
// import { isAuthenticated } from "./utils/auth";

// const PrivateRoute = ({ element }: { element: JSX.Element }) => {
//   return isAuthenticated() ? element : <Navigate to="/login" />;
// };

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
}

export default App