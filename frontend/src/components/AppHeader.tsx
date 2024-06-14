import styles from "../styles/modules/app.module.css"
import AddActivityModal from "./Activity/AddActivityModal"

function AppHeader() {
  return (
    <div className={styles.appHeader}>
      <AddActivityModal/>
    </div>
  )
}

export default AppHeader