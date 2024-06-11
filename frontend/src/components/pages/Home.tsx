import styles from "../../styles/modules/app.module.css";
import PageTitle from "../PageTitle";
import AppHeader from "../AppHeader";
import AppContent from "../AppContent";
import { Button } from "../shadcn/button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container">
      <Button 
        onClick={handleLogout} 
        className="absolute top-4 right-4"
      >
        Logout
      </Button>

      <PageTitle>TODO List</PageTitle>
      <div className={styles.app__wrapper}>
        <AppHeader />
        <AppContent />
      </div>
    </div>
  );
}

export default Home;
