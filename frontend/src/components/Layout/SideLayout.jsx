import React, { useEffect, useState } from 'react'
import { Sidebar,SidebarItem } from './Sidebar'
import { Link } from 'react-router-dom'

import { AiFillHome } from "react-icons/ai";
import { HiDocumentSearch } from "react-icons/hi";
import { FaRupeeSign } from "react-icons/fa";
import { HiClipboardList } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import {useLocation} from "react-router-dom"

export const SideLayout = ({navbarOpen,handleSidebarClick}) => {
  const location = useLocation()
  return (
    <>
        <Sidebar navbarOpen={navbarOpen}  handleSidebarClick={handleSidebarClick}>
          <Link className={location.pathname === "/" ? "bg-slate-900 text-white rounded-md" : ""} onClick={handleSidebarClick}  to="/"> <SidebarItem icon={<AiFillHome size={20} />}  alert text="Dashboard" /></Link>
          <Link onClick={handleSidebarClick} to="/analysis"> <SidebarItem icon={<HiDocumentSearch size={20} />} text="Analysis"/></Link>
          <Link  className={location.pathname === "/transactions"  ? "bg-slate-900 text-white rounded-md" : ""} onClick={handleSidebarClick} to="/transactions"> <SidebarItem icon={<FaRupeeSign size={20} />} text="Transactions" /></Link>
          <Link onClick={handleSidebarClick} to="/calander"><SidebarItem icon={<HiClipboardList size={20} />} text="Calender" /></Link>
          <Link onClick={handleSidebarClick} to="/account"><SidebarItem icon={<MdAccountCircle size={20} />} text="Account" /></Link>
        </Sidebar>
    </>
  )
}