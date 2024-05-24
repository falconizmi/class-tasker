import React, { useState } from 'react'
import {Button} from './shadcn/button'
import styles from "../styles/modules/app.module.css"
import ActivityModal from "./Activity/ActivityModal"

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className={styles.appHeader}>
      <ActivityModal/>
      <Button onClick={() => setModalOpen(true)}>Add class</Button>
      {/* <ActivityModal modalOpen={modalOpen} setModalOpen={setModalOpen}/> */}
    </div>
  )
}

export default AppHeader
