import React from "react"
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
  redirect,
  Navigate,
} from "react-router-dom"
import "./App.css"
import { Toaster } from "react-hot-toast"
import {
  Home,
  Login,
  PhotoUploadPage,
  Signup,
  UserDash,
  UserProfile,
  ResetPassword,
  Photo,
  ChangePassword,
  SearchPage,
} from "./pages"

import {
  AdminDash,
  AdminLoginPage,
  AdminPanel,
  AdminRegistration,
  ReportedItems,
  SiteAnalytics,
  SiteSettings,
  UserMgmt,
  AdminMgmt,
} from "./pages/Admin"
// import AOS from "aos"
// import "aos/dist/aos.css"
import Layout from "./pages/Utilities/Layout"
import Protected from "./pages/Utilities/Protected"
import AdminProtected from "./pages/Utilities/AdminProtected"

import { useDispatch, useSelector } from "react-redux"
import { setCredentials as setUserCredentials } from "./features/userAuth/userAuthSlice"
import { setCredentials as setAdminCredentials } from "./features/adminAuth/adminAuthSlice"
import TermsAndConditions from "./pages/TermsAndConditions"
import PrivacyPolicy from "./pages/PrivacyPolicy"

function App() {
  const dispatch = useDispatch()
  // const
  // useEffect(() => {
  dispatch(setUserCredentials())
  dispatch(setAdminCredentials())
  // if (isLoggedIn) {
  // dispatch(setAdminCredentials())
  // }
  // }, [window.location.pathname])

  // useEffect(() => {
  // AOS.init({
  //   easing: "ease-in-out",
  // })
  // }, [])

  // const navigate = useNavigate()

  if (window.location.pathname.endsWith("/admin")) {
    // navigate("/admin-login")
    redirect("/admin-login")
  }

  return (
    <Router>
      {/* <div className=" container flex flex-col justify-between p-0 h-screen"> */}
      <div>
        <Toaster
          toastOptions={{
            style: {
              borderRadius: "10px",
              // background: "#333",
              // color: "#fff",
            },
            duration: 4000,
          }}
        />
      </div>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<SearchPage />} />

          {/* public profile of each user */}
          <Route path="profile/:username" element={<UserProfile />} />

          {/* each photo page when any photo is clicked or the route is matched*/}
          <Route path="photo/:id" element={<Photo />} />

          {/*  PROTECTED ROUTES  */}
          <Route
            path="upload"
            element={
              <Protected>
                <PhotoUploadPage />
              </Protected>
            }
          />

          {/* User dashboard */}
          <Route
            path="dashboard"
            element={
              <Protected>
                <UserDash />
              </Protected>
            }
          />

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>

        {/* log in */}
        <Route path="/login" element={<Login />} />

        {/* sign up */}
        <Route path="/signup" element={<Signup />} />

        {/* PASSWORD, LOGIN AND SIGNUP PAGES ARE DIFFERENT FROM OTHERS */}

        {/* reset password */}
        <Route path="reset-password" element={<ResetPassword />} />

        {/* change password */}
        <Route
          // path={"change/some-unique-random-link"}
          path={"change-password/:token"}
          element={<ChangePassword />}
        />

        {/* ADMIN SIDE */}
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <Navigate to="/admin/dashboard" />
            </AdminProtected>
          }
        />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-signup" element={<AdminRegistration />} />

        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminPanel />
            </AdminProtected>
          }
        >
          <Route path="analytics" element={<SiteAnalytics />} />
          <Route path="dashboard" element={<AdminDash />} />
          <Route path="admin-mgmt" element={<AdminMgmt />} />
          <Route path="user-mgmt" element={<UserMgmt />} />
          <Route path="reported-contents" element={<ReportedItems />} />
          <Route path="settings" element={<SiteSettings />} />
        </Route>

        <Route path="/admin/*" element={<Navigate to={"/admin"} />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  )
}

export default App
