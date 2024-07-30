import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { GET_USER_BY_ID, UPDATE_USER } from "../../../constants"
import UserUploads from "./UserUploads"
import UserLikes from "./UserLikes"

export default function UserDash() {
  const [isEditing, setIsEditing] = useState(false)
  const [currentView, setCurrentView] = useState("Likes")
  const [currentUser, setCurrentUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: "",
    bio: "",
    website: "",
    uploads_count: 0,
    total_likes: 0,
  })

  const {
    user: { _id, accessToken },
  } = useSelector((store) => store.userAuth)

  useEffect(() => {
    // console.log(GET_USER_BY_ID + _id)
    fetch(GET_USER_BY_ID + _id)
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data)
        // console.log(data)
      })
      .catch(() => {
        toast("Error fetching user!")
        // console.log("Error fetching user!")
      })
  }, [_id])

  const handleUpdateProfile = () => {
    fetch(UPDATE_USER + _id, {
      method: "PATCH",
      body: JSON.stringify(currentUser),
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        toast.success("Profile updated!")
      })
      .catch((err) => {
        // console.log(err)
        toast.error("Error updating profile!")
      })
  }

  const toggleIsEditing = () => {
    if (isEditing) {
      handleUpdateProfile()
    }
    setIsEditing(!isEditing)
  }

  const handleProfileChange = (e) => {
    e.preventDefault()
    setCurrentUser((u) => ({ ...u, [e.target.name]: e.target.value }))
  }

  const handleChangePassword = () => {
    toast.success("Password reset mail sent!")
  }

  const handleDeleteAccount = () => {
    const choice = window.prompt(
      "Are you sure you want to delete your account?"
    )
    if (choice !== "yes") return toast.error("Account deletion cancelled!")
    toast.success("Account Deletion mail sent!")
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 gap-8">
      <h1 className="font-bold text-4xl text-center underline underline-offset-4">
        User Dashboard
      </h1>

      {/* USER INFO */}
      <div className="grid grid-cols-5 gap-4 items-center justify-between">
        <div className="col-start-1 col-end-2 flex flex-col items-center">
          <img
            src={
              currentUser.profile_picture
                ? currentUser.profile_picture
                : "https://via.placeholder.com/350x350"
            }
            alt="user profile picture"
            width={100}
            height={100}
            className={"rounded-full my-3 object-contain aspect-square"}
          />
          <label className="border-2 bg-gray-600 opacity-60 duration-300 hover:opacity-80 hover:bg-gray-500 cursor-pointer rounded-md px-2 py-1 text-white">
            Upload photo
            <input
              type={"file"}
              name="profile_picture"
              // value={currentUser.profile_picture}
              onChange={handleProfileChange}
              hidden
            />
          </label>
        </div>

        <div className="col-start-2 col-end-4 flex flex-col items-start gap-2">
          <label htmlFor="name" className="text-sm w-full">
            First Name:{" "}
            <input
              type="text"
              name="first_name"
              value={currentUser.first_name}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="bg-gray-100 py-1 px-2 ml-2 rounded-md float-right"
            />
          </label>
          <label className="text-sm w-full">
            Last Name:{" "}
            <input
              type="text"
              name="last_name"
              value={currentUser.last_name}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="bg-gray-100 py-1 px-2 ml-2 rounded-md float-right"
            />
          </label>
          {/* <input type="text" value={name} onChange={handleNameChange} /> */}
          <label htmlFor="email" className=" text-sm w-full">
            Email:
            <input
              type="email"
              value={currentUser.email}
              onChange={handleProfileChange}
              name="email"
              disabled={!isEditing}
              className="bg-gray-100 py-1 px-2 ml-2 rounded-md float-right"
            />
          </label>
          <label htmlFor="bio" className=" text-sm w-full">
            Bio:{" "}
            <input
              type="text"
              name="bio"
              value={currentUser.bio}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="bg-gray-100 py-1 px-2 ml-2 rounded-md float-right"
            />
          </label>
          <label htmlFor="website" className="text-sm w-full">
            Website:{" "}
            {isEditing ? (
              <input
                type="text"
                name="website"
                value={currentUser.website}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="bg-gray-100 py-1 px-2 ml-2 rounded-md float-right"
              />
            ) : (
              <a
                href={currentUser.website}
                target="_blank"
                className="ml-8 py-1 px-2 rounded-md text-blue-500"
              >
                {currentUser.website}
              </a>
            )}
          </label>
        </div>

        {/* <input type="text" value={email} onChange={handleEmailChange} /> */}
        <div className="col-start-5 col-end-6 flex flex-col gap-2">
          <button
            onClick={toggleIsEditing}
            className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-2 sm:py-1 rounded focus:outline-none"
          >
            {!isEditing ? "Update profile" : "Save"}
          </button>

          <button
            onClick={handleChangePassword}
            className="text-white bg-green-600 hover:bg-green-700 px-2 py-2 sm:py-1 rounded focus:outline-none"
          >
            Change Password
          </button>

          <button
            onClick={handleDeleteAccount}
            className="text-white bg-red-600 hover:bg-red-700 px-2 py-2 sm:py-1 rounded focus:outline-none"
          >
            Delete Account
          </button>
        </div>
      </div>

      <div className="">
        Likes: 16
        <br />
        Uploads: {currentUser?.uploads_count?.toString()}
        {/* {currentUser?.likes_count?.toString()} */}
      </div>

      <hr className="border-2 border-dark mt-6 mb-2" />
      <div className="w-100 p-2 flex items-center justify-center">
        <div className="flex items-center gap-2 ">
          <NavLink
            onClick={() => setCurrentView("Likes")}
            className={() =>
              currentView === "Likes"
                ? "border-b-2 border-b-dark"
                : " border-b-2"
            }
          >
            Likes
          </NavLink>
          <NavLink
            onClick={() => setCurrentView("Uploads")}
            className={() =>
              currentView === "Uploads"
                ? "border-b-2 border-b-dark"
                : " border-b-2"
            }
          >
            Uploads
          </NavLink>
        </div>
      </div>
      <h2 className="underline underline-offset-4 text-center font-bold text-xl leading-loose mb-4">
        Your {currentView}
      </h2>
      <div>
        {currentView === "Likes" && <UserLikes userID={_id} />}
        {currentView === "Uploads" && <UserUploads userID={_id} />}
      </div>
    </div>
  )
}
