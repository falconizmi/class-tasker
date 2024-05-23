import React, { useState } from 'react'
import {Button} from './shadcn/button'
import SelectButton from './Buttons/SelectButton'
import styles from "../styles/modules/app.module.css"
import ActivityModal from "./Activity/ActivityModal"

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className={styles.appHeader}>
      <Button onClick={() => setModalOpen(true)}>Add task</Button>
      <Button onClick={() => setModalOpen(true)}>Add class</Button>
      <SelectButton id='status'>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Incomplete</option>
      </SelectButton>
      {/* <ActivityModal modalOpen={modalOpen} setModalOpen={setModalOpen}/> */}
      <ActivityModal/>
    </div>
  )
}

export default AppHeader
