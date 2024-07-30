import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  loginUser,
  setCredentials,
} from "../../../features/userAuth/userAuthSlice"
import { toast } from "react-hot-toast"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const emptyFormData = { email: "", password: "" }
  const [formData, setFormData] = useState(emptyFormData)
  const [errors, setErrors] = useState([])
  let errorList = errors.map((error, index) => <li key={index}>{error}</li>)

  // SUBMIT THE FORM //
  async function handleLogin(event) {
    event.preventDefault()
    if (!validateForm(formData)) return
    try {
      const payload = await dispatch(
        loginUser({
          email: formData.email.toLowerCase(),
          password: formData.password,
        })
      ).unwrap()

      await dispatch(setCredentials())

      // console.log(payload)

      toast.success(`Successfully logged in as '${payload.user.email}'!`)

      navigate("/")
    } catch (error) {
      // console.log(error)
      toast.error(error.message)
    }
  }

  function validateForm(formData) {
    setErrors([])

    let isValid = true
    if (!formData.email) {
      isValid = false
      setErrors((prevErrors) => [...prevErrors, "* Email is required!"])
    }
    if (!formData.password) {
      isValid = false
      setErrors((prevErrors) => [...prevErrors, "* Password is required!"])
    }
    if (formData.email && /\s+/.test(formData.email)) {
      isValid = false
      // console.log(email.match(/\s+/))
      setErrors((prevErrors) => [
        ...prevErrors,
        "* Email cannot contain white spaces!",
      ])
    }
    return isValid
  }

  // TRACK FORM INPUT //
  function handleFormInput(event) {
    setErrors([])
    const name = event.target.name
    const value = event.target.value.trim()
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block mb-1 text-sm" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight tracking-wider focus:outline-none"
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormInput}
          placeholder="Enter email"
          autoComplete="on"
          required
        />
      </div>

      <div className="mb-4 relative">
        <span className="absolute bottom-1.5 right-1">
          {!showPassword ? (
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

        <label className="block mb-1 text-sm" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight tracking-wider focus:outline-none"
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleFormInput}
          placeholder="Enter password"
          required
        />
      </div>

      {/*  ERRORS  */}
      <ul className="text-red-500 text-xs font-semibold my-2 uppercase tracking-wide">
        {errorList}
      </ul>

      {/*  LOGIN BUTTON  */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none"
        type="submit"
      >
        Login
      </button>

      {/*  FORGOT PASSWORD  */}
      <Link
        className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800  px-2"
        to="/reset-password"
      >
        Forgot password?
      </Link>
    </form>
  )
}
