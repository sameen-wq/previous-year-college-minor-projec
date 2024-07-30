import React from "react"
import { Outlet } from "react-router-dom"
import { Header, Footer } from "../../components"

export default function Layout() {
  return (
    <div className="mt-16 sm:mt-20">
      <div className=" grid grid-cols-1 h-screen">
        <Header />
        <Outlet />
        <div className="mt-auto">
          <Footer />
        </div>{" "}
      </div>
    </div>
  )
}
