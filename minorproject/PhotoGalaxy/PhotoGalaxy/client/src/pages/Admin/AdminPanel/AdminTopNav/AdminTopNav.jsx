import React from "react"
import { FaUserAlt, FaUserCircle } from "react-icons/fa"

const AdminTopNav = () => {
  return (
    <div className="w-full bg-[#023047] text-white h-20">
      <div className="container mx-auto flex items-center justify-between ">
        <h1 className="text-4xl font-bold m-4">Admin Panel</h1>
        <div className="flex items-center justify-around gap-4">
          <time className="text-base font-semibold">11:43 AM, Fri </time>
          <FaUserCircle size={33} />
        </div>
      </div>
    </div>
  )
}

export default AdminTopNav
