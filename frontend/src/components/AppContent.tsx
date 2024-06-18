import React from 'react'
import ActivityPage from './pages/ActivityPage'
import ClassSideBar from "./AppSideBar"

function AppContent() {
  return (
    <div className="flex">
    <ClassSideBar classes={[{id: "", name: "cvik", code: "MB"}]}/>
    <div className="w-full overflow-x-auto">
      <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
        <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
          <div className="w-full md:max-w-6xl">
          <ActivityPage/>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AppContent
