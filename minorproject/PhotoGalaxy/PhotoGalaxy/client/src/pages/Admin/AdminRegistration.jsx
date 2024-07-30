import React, { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  signupAdmin,
  setCredentials,
} from "../../features/adminAuth/adminAuthSlice"
import { toast } from "react-hot-toast"

const initialFormData = {
  email: "",
  password: "",
}

const AdminRegistration = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)

  function handleInput(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function submitForm(e) {
    e.preventDefault()
    console.log(formData)
    try {
      const payload = await dispatch(
        signupAdmin({
          email: formData.email.toLowerCase(),
          password: formData.password,
        })
      ).unwrap()

      await dispatch(setCredentials())

      console.log("payload:", payload)
      toast.success(
        `Account created successfully for '${payload.admin.email}'!`
      )

      setFormData(initialFormData)
      // navigate("")
    } catch (error) {
      // console.log(error)
      toast.error(error.message)
    }
  }

  return (
    // <div className="flex items-center justify-center">
    <form className="w-1/4 mx-auto my-10 flex flex-col items-center">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleInput}
          value={formData.email}
          required
          minLength={3}
          className="bg-gray-100 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />
      </div>
      <div className="relative flex flex-col gap-2 my-2">
        <span className="absolute bottom-1.5 right-1">
          {showPassword ? (
            <FaEyeSlash
              className="text-dark cursor-pointer"
              size={24}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          ) : (
            <FaEye
              className="text-dark cursor-pointer"
              size={24}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          )}
        </span>
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          name="password"
          id="password"
          type={showPassword ? "text" : "password"}
          onChange={handleInput}
          value={formData.password}
          required
          pattern="^[^\s]{8,}$"
          minLength={8}
          className="bg-gray-100 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        />
      </div>

      <button
        onClick={submitForm}
        className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none"
      >
        Register
      </button>
    </form>
    // </div>
  )
}

export default AdminRegistration
