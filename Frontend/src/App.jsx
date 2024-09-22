import { useState } from 'react'
import Nav from './components/Nav'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
   <>
   <div className="flex-1 min-h-screen pb-[15vh] bg-black relative ">
   <Nav/>
   <Outlet/>
   </div>
   </>
  )
}

export default App
