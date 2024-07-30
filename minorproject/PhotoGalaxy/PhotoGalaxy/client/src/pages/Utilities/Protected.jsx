import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function Protected({ children }) {
  const {
    user: { isLoggedIn },
  } = useSelector((store) => store.userAuth)

  return !isLoggedIn ? <Navigate to={"/login"} /> : <div>{children}</div>
}
