import PageTitle from "@/components/shadcn/page-title";
import AppContent from "../AppContent";
import { Button } from "../shadcn/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserByEmail } from "@/utils/userUtils";


function Home() {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const { user, isLoading, isError } = useUserByEmail(userEmail);
  
  if (isLoading) {
    return <div>Wating</div>;
  }

  if (isError) {
    return <div>Error occured</div>;
  }

  if (!user) {
    return <div>User not found</div>
  }

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

      <PageTitle title="TODO List"/>
      <div>
        <AppContent user={user} />
      </div>
    </div>
  );
}

export default Home;
