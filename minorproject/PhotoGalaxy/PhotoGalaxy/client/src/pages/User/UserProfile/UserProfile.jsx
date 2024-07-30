import React, { useEffect, useState } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import { Gallery } from "react-grid-gallery"
import { GET_USER_UPLOADS } from "../../../constants"

export default function UserProfile() {
  const navigate = useNavigate()
  const location = useLocation()
  const propsData = location.state
  const author = propsData
  const id = author._id
  const [userUploads, setUserUploads] = useState([
    {
      _id: "123",
      src: "https://picsum.photos/id/0/5000/3333",
      width: 950,
      height: 200,
    },
  ])

  function handleImgClick(index, image, event) {
    navigate(`/photo/${image._id}`)
  }
  if (!propsData) return <Navigate to={"/"} />

  // fetching user uploads
  const mapImageData = (data) => {
    return data.uploads.map((item) => ({
      _id: item._id,
      src: item.url,
      width: item.dimensions.width,
      height: item.dimensions.height,
    }))
  }

  useEffect(() => {
    const fetchUserUploads = async () => {
      try {
        const response = await fetch(GET_USER_UPLOADS + id)
        const data = await response.json()
        const mappedData = mapImageData(data)
        setUserUploads(mappedData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserUploads()
  }, [GET_USER_UPLOADS, id])

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center w-full">
        <div className="my-2">
          <img
            className="w-24 h-24 rounded-full"
            src={author.profile_picture}
            alt="Profile Picture Of The Creator"
          />
        </div>
        <div className="my-4 text-center">
          <h1 className="font-bold text-xl">
            {author.first_name + " " + author.last_name}
          </h1>
          <h1 className="font-bold text-sm">{author.email}</h1>
          <p className="text-center w-full sm:w-1/2 mx-auto my-2 text-xs md:text-sm md:leading-none leading-none">
            {author.bio}
          </p>
        </div>
      </div>
      <hr className="border-2 border-dark mt-6 mb-2" />

      {/* USER UPLOADS SECTION */}
      <div className="mt-4">
        <h3 className="font-bold my-4 text-xl underline underline-offset-4 text-center">
          Uploaded Photos
        </h3>
        <div className="my-2">
          <Gallery
            images={userUploads}
            enableImageSelection={false}
            onClick={handleImgClick}
          />
        </div>
      </div>
    </div>
  )
}
