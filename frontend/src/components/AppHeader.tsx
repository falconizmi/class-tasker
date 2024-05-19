import React, { useState } from 'react'
import Button from './Buttons/Button'
import SelectButton from './Buttons/SelectButton'
import styles from "../styles/modules/app.module.css"
import TodoModal from './TodoModal'

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className={styles.appHeader}>
      <h1>hello from header</h1>
      <Button variant='primary' onClick={() => setModalOpen(true)}>Add task</Button>
      <Button variant='primary' onClick={() => setModalOpen(true)}>Add class</Button>
      <SelectButton id='status'>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Incomplete</option>
      </SelectButton>
      <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  )
}

export default AppHeader
