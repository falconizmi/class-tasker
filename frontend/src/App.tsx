import { useState } from 'react'
import PageTitle from './components/PageTitle'
import styles from "./styles/modules/app.module.css"
import AppHeader from './components/AppHeader'
import AppContent from './components/AppContent'

function App() {

  return (
    <div className='container'>
      <PageTitle>TODO List</PageTitle>
      <div className={styles.app__wrapper}>
        <AppHeader/>
        <AppContent/>
      </div>
    </div>
  )
}

export default App
