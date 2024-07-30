import React, { useEffect, useState } from "react"
import gradientBg from "../../assets/gradient-bg.svg"
import { toast } from "react-hot-toast"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { SiteLogo } from "../../components/common"
import {
  loginAdmin,
  setCredentials,
} from "../../features/adminAuth/adminAuthSlice"

const AdminLoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState([])
  let errorList = errors.map((error, index) => <li key={index}>{error}</li>)

  const {
    admin: { isLoggedIn },
  } = useSelector((store) => store.adminAuth)

  useEffect(() => {
    if (isLoggedIn) {
      toast.error("You must log out first to log in!")
      navigate("/admin")
    }
  }, [])

  function handleFormInput(e) {
    setErrors([])
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function submitForm(e) {
    e.preventDefault()
    if (!validateForm(formData)) return
    try {
      const payload = await dispatch(
        loginAdmin({
          email: formData.email.toLowerCase(),
          password: formData.password,
        })
      ).unwrap()

      await dispatch(setCredentials())

      console.log("payload", payload)
      toast.success(`Successfully logged in as '${payload.admin.email}'!`)

      navigate("/admin/dashboard")
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
      console.log(email.match(/\s+/))
      setErrors((prevErrors) => [
        ...prevErrors,
        "* Email cannot contain white spaces!",
      ])
    }
    return isValid
  }

  return (
    <main
      style={{
        backgroundImage: `url(${gradientBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-screen flex justify-center items-center text-gray-100"
    >
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
          <SiteLogo logoColor={"light"} />
        </h2>

        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider underline underline-offset-4 text-center">
          Admin Login
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleFormInput}
              value={formData.email}
              placeholder="Enter email"
              required
              // minLength={3}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="mb-4 relative">
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
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleFormInput}
              placeholder="Enter password"
              required
              // minLength={8}
            />
          </div>
          {/*  ERRORS  */}
          <ul className="text-red-500 text-xs font-semibold my-2 mt-5 uppercase tracking-wide">
            {errorList}
          </ul>
          <button
            type="submit"
            onClick={submitForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
      </div>
    </main>
  )
}

export default AdminLoginPage
