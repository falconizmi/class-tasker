import PageTitle from "./components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import styles from "./styles/modules/app.module.css";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import { getTasks } from "./api/taskApi";

function App() {
  const activities = useQuery({ queryKey: ["activities"], queryFn: getTasks });

  if (activities.isLoading || !activities.data) {
    return <div></div>;
  }

  if (activities.isError) {
    return <div>Error occured</div>;
  }

  console.log(activities.data);

  return (
    <>
      <div className="container">
        <PageTitle>TODO List</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      {activities.data.map((activity) => (
        <div key={activity.id}>{activity.name}</div>
      ))}
      <button>CLick ME</button>
    </>
  );
}

export default App;
