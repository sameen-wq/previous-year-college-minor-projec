import React, { useEffect, useState } from "react"
import { GET_USER_LIKES } from "../../../constants"
import { Gallery } from "react-grid-gallery"
import { useNavigate } from "react-router-dom"

export default function UserLikes({ userID }) {
  const [photos, setPhotos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(GET_USER_LIKES + userID)
      .then((res) => res.json())
      .then((data) =>
        setPhotos(
          data.likes?.length
            ? data.likes.map((eachPhoto) => ({
                id: eachPhoto._id,
                height: eachPhoto.dimensions.height,
                width: eachPhoto.dimensions.width,
                src: eachPhoto.url,
                alt: "PhotoGalaxy",
              }))
            : {}
        )
      )
      .catch((error) => {
        // console.log("Error getting user likes:", error)
        toast("Error getting user likes!")
      })
  }, [GET_USER_LIKES])

  const openEachPhotoPage = (index, photo, event) => {
    // console.log(photo)
    navigate(`/photo/${photo.id}`)
  }

  if (!photos.length) {
    return <div>No likes yet.</div>
  }

  return (
    <div>
      <Gallery
        images={photos}
        enableImageSelection={false}
        onClick={openEachPhotoPage}
        margin={3}
      />
    </div>
  )
}
