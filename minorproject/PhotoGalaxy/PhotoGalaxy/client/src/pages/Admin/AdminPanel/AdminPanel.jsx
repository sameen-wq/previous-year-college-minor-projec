import React, { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import { AdminSideNav, AdminTopNav } from ".."

export default function AdminPanel() {
  useEffect(() => {
    document.title = "Admin Panel"
  }, [])

  return (
    <>
      <AdminTopNav />
      <main className=" p-4">
        <div className="container mx-auto p-4 grid grid-cols-12 gap-4 mt-8">
          <Link to="/" className="text-xs underline text-blue-500">
            Home
          </Link>
          <ul className="col-start-1 col-end-4 bg-[#023047] rounded-lg text-gray-50 block w-full">
            <AdminSideNav />
          </ul>

          <div className="col-start-4 col-end-12 p-4 border-2 rounded-lg">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}
