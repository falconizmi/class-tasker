import PageTitle from "./components/PageTitle";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import styles from "./styles/modules/app.module.css";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <PageTitle>TODO List</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
