import styles from "../styles/modules/app.module.css"
import ActivityModal from "./Activity/ActivityModal"

function AppHeader() {
  return (
    <div className={styles.appHeader}>
      <ActivityModal/>
    </div>
  )
}

export default AppHeader