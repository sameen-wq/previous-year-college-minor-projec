import React from "react"
import { Link } from "react-router-dom"
import lightLogo from "../../assets/logo-white.svg"
import darkLogo from "../../assets/logo-black.svg"

export default function SiteLogo({ logoColor }) {
  return (
    <Link to="/">
      <img
        src={logoColor === "light" ? lightLogo : darkLogo}
        width={200}
        height={45}
      />
    </Link>
  )
}
