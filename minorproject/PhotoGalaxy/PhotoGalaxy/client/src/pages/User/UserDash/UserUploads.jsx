import React, { useEffect, useState } from "react"
import { Gallery } from "react-grid-gallery"
import { toast } from "react-hot-toast"
// import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GET_USER_UPLOADS } from "../../../constants"

export default function UserUploads({ userID }) {
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  // const {
  //   user: { _id },
  // } = useSelector((store) => store.userAuth)

  // console.log(images)

  useEffect(() => {
    fetch(GET_USER_UPLOADS + userID)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.uploads)
        setImages(
          data.uploads?.length
            ? data.uploads.map((eachPhoto) => ({
                id: eachPhoto._id,
                height: eachPhoto.dimensions.height,
                width: eachPhoto.dimensions.width,
                src: eachPhoto.url,
                alt: "photo",
              }))
            : []
        )
      })

      .catch((error) => {
        // console.log("Error getting user uploads:", error)
        toast("Error getting user uploads!")
      })
  }, [userID])

  const openEachPhotoPage = (index, photo, event) => {
    // console.log(photo)
    navigate(`/photo/${photo.id}`)
  }

  if (!images.length) {
    return <div>No uploads yet.</div>
  }

  return (
    <div>
      <Gallery
        images={images}
        enableImageSelection={false}
        onClick={openEachPhotoPage}
        margin={3}
      />
    </div>
  )
}
