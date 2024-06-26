import { useState } from 'react';
import { SideLayout } from '../components/Layout/SideLayout';
import { Outlet } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";


export const Home = () => {

  const [navbarOpen, setNavbarOpen] = useState(false)

  const handleSidebarClick = () =>{
    setNavbarOpen(prev => !prev)
  }

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      <button className='absolute z-50 top-3 left-5 lg:hidden'  onClick={handleSidebarClick}>
      <FiMenu />
      </button>
        <div className='sticky h-full'>
          <SideLayout navbarOpen={navbarOpen} handleSidebarClick={handleSidebarClick}/>
        </div>
        <div className='flex-1 overflow-y-scroll'>
          <div className='p-4'>
          <Outlet/>
          </div>
        </div>
    </div>
  )
}