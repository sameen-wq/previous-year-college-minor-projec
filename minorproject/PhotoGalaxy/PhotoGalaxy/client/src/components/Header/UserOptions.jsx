import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { logoutUser } from "../../features/userAuth/userAuthSlice"
import toast from "react-hot-toast"

export default function UserOptions() {
  const dispatch = useDispatch()

  const {
    user: { isLoggedIn },
  } = useSelector((store) => store.userAuth)

  async function handleLogout() {
    try {
      await dispatch(logoutUser())
    } catch (error) {
      toast.error("Error logging out!")
    }
  }
  return (
    <div
      data-aos="fade-in"
      className="absolute right-0 top-12 shadow-md flex flex-col gap-2 bg-[#d4a373] text-white rounded p-2"
    >
      {isLoggedIn ? (
        <ul>
          <li className="border-b-amber-800 border-opacity-25 border-b-2 px-3 py-2">
            <NavLink as={Link} to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li className="border-b-amber-800 border-opacity-25 border-b-2 px-3 py-2">
            <NavLink onClick={handleLogout}>Log Out</NavLink>
          </li>
        </ul>
      ) : (
        <ul>
          <li className="border-b-amber-800 border-opacity-25 border-b-2 px-3 py-2 whitespace-nowrap">
            <NavLink as={Link} to="/login">
              Log In
            </NavLink>
          </li>
          <li className="border-b-amber-800 border-opacity-25 border-b-2 px-3 py-2 whitespace-nowrap">
            <NavLink as={Link} to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  )
}
