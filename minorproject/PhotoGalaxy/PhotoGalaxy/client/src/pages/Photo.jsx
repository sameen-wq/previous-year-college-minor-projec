import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import {
  FaAngleDown,
  FaCloudDownloadAlt,
  FaHeart,
  FaRegEdit,
  FaRegHeart,
  FaRegTrashAlt,
  FaShareAlt,
} from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  DELETE_PHOTO,
  GET_PHOTO_BY_ID,
  LIKE_PHOTO,
  UNLIKE_PHOTO,
} from "../constants"

export default function Photo() {
  const { user } = useSelector((store) => store.userAuth)
  const { id } = useParams() //   search this id in database and get photo details
  const [editMode, setEditMode] = useState(false)
  const [photo, setPhoto] = useState()
  const navigate = useNavigate()

  function deletePhoto() {
    // console.log(DELETE_PHOTO + photo._id)
    fetch(DELETE_PHOTO + photo._id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Deleted successfully!")
        setTimeout(() => {
          navigate("/")
        }, 100)
      })
      .catch((error) => {
        // console.log("error", error)
        toast.error("Error deleting photo!")
      })
  }

  // fetching and downloading photo on click
  function handleDownload() {
    fetch(photo.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement("a")
        const fileName = photo.public_id.split("PhotoGalaxy/")[1] + ".jpg"
        link.href = url
        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)
      })
  }

  useEffect(() => {
    fetch(GET_PHOTO_BY_ID + id)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        data.photo && setPhoto(data.photo)
      })
      .catch((error) => {
        // console.log(error)
        toast.error("Error getting photo!")
      })
  }, [GET_PHOTO_BY_ID])

  const currentURL = window.location.href
  function copyPhotoURL() {
    navigator.clipboard.writeText(currentURL)
  }

  const likePhoto = () => {
    if (!user.accessToken) return navigate("/login")
    
    fetch(LIKE_PHOTO + photo._id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPhoto(data.photo)
        toast.success("Liked photo!")
      })
      .catch((error) => {
        // console.log(error)
        toast.error("Error liking photo!")
      })
  }

  const unlikePhoto = () => {
    if (!user.accessToken) return navigate("/login")

    fetch(UNLIKE_PHOTO + photo._id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        toast.success("Removed like!")
        setPhoto(data.photo)
      })
      .catch((error) => {
        // console.log(error)
        toast.error("Error removing like!")
      })
  }

  return (
    <div className="container p-4 mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {/* PHOTO CONTAINER */}
        <div className="lg:col-start-1 mx-auto lg:col-end-4 h-full rounded-lg border-2 ">
          <img
            src={photo?.url}
            className="rounded-lg object-contain h-[24rem] w-full"
            data-aos="fade-in"
            alt={photo?.alt}
          />
        </div>

        {/* RIGHT SIDE CONTAINING DETAILS ABOUT PHOTO */}
        <div className="mx-auto w-[425px] lg:col-start-4 lg:col-end-7 col-start-3 col-end-4 text-sm h-full flex flex-col gap-4">
          {/* <h1 className="text-2xl font-semibold">{photo.title}</h1> */}
          <div className="flex items-center gap-4">
            {/* LIKE AND SHARE ICONS  */}
            <span
              className="flex items-center gap-2 cursor-pointer"
              title="Like/Unlike"
            >
              {photo?.likes_count > 0 &&
              photo?.liked_by.find((eachUser) => eachUser === user?._id)
                ?.length ? (
                <FaHeart
                  onClick={unlikePhoto}
                  size={18}
                  className="fill-rose-500"
                />
              ) : (
                <FaRegHeart onClick={likePhoto} size={18} />
              )}{" "}
              {photo?.likes_count}
            </span>
            <FaShareAlt
              onClick={copyPhotoURL}
              className="cursor-pointer fill-blue-600"
              title="Copy to Clipboard"
            />
          </div>

          <div className="flex gap-2">
            {/* DOWNLOAD BUTTON */}

            <button
              onClick={handleDownload}
              className=" p-3 rounded bg-green-500 hover:bg-gray-50 border-2 transition-all duration-200 border-green-500 hover:text-green-500  w-full text-white font-bold text-lg"
              title="Download photo"
            >
              <a className=" flex items-center justify-center gap-2">
                <FaCloudDownloadAlt size={20} /> <span>DOWNLOAD</span>
              </a>
            </button>

            {/* EDIT BUTTON */}

            {photo?.uploaded_by?._id === user._id && (
              <button
                onClick={() => setEditMode(true)}
                className="p-3 rounded border-blue-500 bg-blue-500 text-gray-50 transition-all duration-200 hover:text-blue-500 hover:bg-gray-50 border-2 flex justify-center items-center gap-2"
                title="Edit photo"
              >
                <FaRegEdit size={20} />
                {/* <span>Edit</span> */}
              </button>
            )}

            {/* DELETE BUTTON */}

            {photo?.uploaded_by?._id === user._id && (
              <button
                onClick={deletePhoto}
                className="p-3 rounded transition-all duration-300 hover:bg-gray-50 bg-red-500 text-gray-50 hover:text-red-500 border-red-500 border-2 flex justify-center items-center gap-2"
                title="Delete photo"
              >
                <FaRegTrashAlt size={20} />
              </button>
            )}
          </div>

          {/* PHOTO DETAILS */}
          <div className="flex flex-col gap-2">
            <span>
              <span className="font-medium">Uploaded on:</span>{" "}
              {/* {new Date(photo?.createdAt)?.toISOString().split("T")[0]} */}
            </span>
            <span>
              <span className="font-medium">File size:</span>{" "}
              {photo?.bytes <= 1024
                ? photo?.bytes
                : photo?.bytes <= 1048576
                ? (photo?.bytes / 1024).toFixed(2) + " KB"
                : photo?.bytes / (1024 * 1024) + " MB"}
            </span>
            <span>
              <span className="font-medium">Dimensions:</span>{" "}
              {photo?.dimensions?.width} x {photo?.dimensions?.height}
            </span>
            <span>
              <span className="font-medium">Tags:</span>
              <span className="flex flex-wrap gap-1">
                {photo?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="mr-1 my-1 px-3 py-1 text-gray-600 text-sm bg-gray-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </span>
          </div>

          {/* AUTHOR DETAILS */}
          <div className="">
            <h3 className="font-medium">Uploaded by:</h3>
            <h2 className="font-semibold text-lg">
              <Link
                to={`/profile/${photo?.uploaded_by?._id}`}
                state={photo?.uploaded_by}
              >
                {photo?.uploaded_by?.first_name} {photo?.uploaded_by?.last_name}
              </Link>
            </h2>
          </div>
        </div>
      </div>

      {/* SHOW SIMILAR IMAGES BUTTON */}
      <div className="flex items-center mt-10">
        <hr className="w-[40%] border-dark opacity-25 bg-dark" />
        <button className="rounded-full w-64 mx-auto text-sm border-2 border-dark font-bold opacity-50 hover:opacity-90 transition-all duration-300 px-8 flex flex-col items-center gap-0">
          <span>Similar Images</span> <FaAngleDown />
        </button>
        <hr className="w-[40%] border-dark opacity-25 bg-dark" />
      </div>
    </div>
  )
}
