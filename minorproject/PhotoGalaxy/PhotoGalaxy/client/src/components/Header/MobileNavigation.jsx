import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { logoutUser } from "../../features/userAuth/userAuthSlice"
import toast from "react-hot-toast"
import { FaBars, FaCross, FaTimes } from "react-icons/fa"

export default function MobileNavigation() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const dispatch = useDispatch()

  function toggleMobileNavigation() {
    setMenuIsOpen((prevState) => !prevState)
  }

  async function handleLogout() {
    try {
      await dispatch(logoutUser())
      toast.success("Logged Out!", { duration: 4000 })
    } catch (error) {}
  }
  return (
    <div title="" className="w-full h-full" onClick={toggleMobileNavigation}>
      {menuIsOpen ? (
        ""
      ) : (
        <FaBars
          data-aos="fade-in"
          color="white"
          className="cursor-pointer"
          size={20}
        />
      )}
      {menuIsOpen && (
        <div>
          <ul className="absolute z-10 text-white h-screen flex items-center justify-center flex-col bg-header w-screen top-0 bottom-0 left-0 right-0">
            <FaTimes
              data-aos="fade-in"
              color="white"
              className="cursor-pointer absolute top-5 left-4 z-50"
              size={22}
            />
            <li className="p-3 border-b-2 border-b-amber-800 hover:bg-lightYellow hover:font-semibold active:bg-highlightOrange">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="p-3 border-b-2 border-b-amber-800 hover:bg-lightYellow hover:font-semibold active:bg-highlightOrange">
              <NavLink to={""}>Explore</NavLink>
            </li>
            <li className="p-3 border-b-2 border-b-amber-800 hover:bg-lightYellow hover:font-semibold active:bg-highlightOrange">
              <NavLink to={"/upload"}>Upload</NavLink>
            </li>
            <li className="p-3 border-b-2 border-b-amber-800 hover:bg-lightYellow hover:font-semibold active:bg-highlightOrange">
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            </li>
            <li className="p-3 border-b-2 border-b-amber-800 hover:bg-lightYellow hover:font-semibold active:bg-highlightOrange">
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
