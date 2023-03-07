import React from 'react'
import { Outlet } from 'react-router-dom'

export const Main = () => {

  
  return (
    <main>
      <div className='orangeBg'></div>
      <Outlet/>
    </main>
  )
}
