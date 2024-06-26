import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";


import logo from "../../assets/logoipsum-280.svg"



 
// icons
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const SidebarContext = createContext()

export const Sidebar = ({ children, navbarOpen,handleSidebarClick }) => {

  const {currentUser} = useSelector((state)=>state.auth)

  const [expanded, isExpanded] = useState(true)

  // const handleResize = () =>{
  //   const width = window.innerWidth;
  //   if(width <= 768){
  //     isExpanded(false);
  //   }
  //   else{
  //     isExpanded(true)
  //   }
  // }

  // useEffect(()=>{
  //   handleResize()

  //   window.addEventListener("resize",handleResize)

  //   return () =>{
  //     window.removeEventListener("resize",handleResize)
  //   }
  // },[])


  return (
    <aside className={`lg:relative h-full  absolute top-0 left-0 z-10 transition-all duration-500 lg:translate-x-0  ${navbarOpen ? "translate-x-0 bg-white " : "-translate-x-[500px]"} `}>
      <nav className="h-full flex flex-col justify-between z-50  w-full  border-r-4 shadow-sm ">
        {/* Logo Section */}

        <div className="flex flex-col">

        
        <div className={`p-4 pb-2 h-24 flex items-center gap-2 ${expanded ? "justify-between" : "justify-center"}`}>

          <Link to="/"><img className={`overflow-hidden transition-all ${expanded ? "w-32" : "hidden"}`} src={logo}  alt="logo" /></Link>

          <button onClick={()=>isExpanded((current)=>!current)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            {
              expanded ? <FaArrowRight /> : <FaArrowLeft/>
            }
          </button>
        </div>




        {/* Sidebar Item section */}

        <SidebarContext.Provider value={{expanded}}>
        <div className="flex items-center px-6">
          <ul className="flex flex-col gap-7 w-full">{children}</ul>
        </div>
        </SidebarContext.Provider>

        </div>



        {/* Profile and email section */}
        <div className="border-t flex p-3 justify-center">
          <img className="w-10 h-10 rounded-full" src={currentUser.rest.profilePicture}  alt="profilepic" />

          <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-full" : "hidden"}`}>

              <div className="leading-4">
                <h4 className="font-semibold">{currentUser.rest.name}</h4>
                <span className="text-xs text-gray-600">
                  {currentUser.rest.email}
                </span>
              </div>

          </div>
        </div>

      </nav>
    </aside>
  );
};

export function SidebarItem({ icon, text, active, alert }) {


  const {expanded} = useContext(SidebarContext)
  return (
    
    <li className={`relative flex  items-center justify-start py-2 px-3 rounded-md cursor-pointer transition group ${active ? "bg-slate-800 text-white" : "hover:bg-slate-600 hover:text-white"}`}>
      {icon}

      <span className={`overflow-hidden transition-all ${expanded ? "w-full" : "w-0"}`}>{text}</span>

      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-slate-950 ${expanded ? "" : "top-2"}`}>

        </div>
      )}



      {
        !expanded && (
          <div className={`absolute left-20 rounded-md px-2 py-1 bg-slate-900 text-white invisible -translate-x-3 transition-all opacity-20 group-hover:visible  group-hover:opacity-100 group-hover:translate-x-0`}>
            {text}
          </div>
        )
      }
    </li>
    
  );
}

