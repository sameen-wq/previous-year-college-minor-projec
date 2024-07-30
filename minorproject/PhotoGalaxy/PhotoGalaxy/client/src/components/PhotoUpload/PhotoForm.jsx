import React, { useState } from "react"
import { toast } from "react-hot-toast"
import DragAndDropZone from "./DragAndDropZone"
import { useSelector } from "react-redux"
import { CLASSIFY_PHOTO, UPLOAD_PHOTOS } from "../../constants"
import UploadPreview from "./UploadPreview"

const PhotoForm = () => {
  const {
    user: { accessToken },
  } = useSelector((store) => store.userAuth)
  const [file, setFile] = useState()
  const [b64, setb64] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [tags, setTags] = useState([])

  ////////////////    UPLOAD FILES AT LAST    //////////////////
  // uploading image on clicking submit button
  const handlePhotosUpload = async (event) => {
    event.preventDefault()
    if (!b64) {
      return toast.error("No photos to upload!")
    }

    if (!isValid) {
      return toast.error("Cannot upload this photo!")
    }

    if (!tags.length) {
      return toast.error("Please add tags!")
    }

    await fetch(UPLOAD_PHOTOS, {
      method: "POST",
      body: JSON.stringify({ photo: b64, tags: tags }),
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          return toast.error("Error uploading!")
        }
        toast.success("Uploaded Successfully!")
        setFile(null)
        setb64("")
        setIsValid(false)
        setTags([])
      })
      .catch((err) => {
        toast.error("Error uploading!")
        // console.log("error",err)
      })
  }

  const verifyPhoto = async (file) => {
    try {
      let formData = new FormData()
      formData.append("photo", file) // file is the image file

      const res = await fetch(CLASSIFY_PHOTO, {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      return data
    } catch (err) {
      // console.log(err)
      toast.error("Error verifying photo!")
    }
  }

  /////////////   CONVERT FILE TO BASE64    //////////////
  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onabort = (msg) => reject(msg)
      reader.onerror = (error) => reject(error)
      reader.onload = (data) => {
        // console.log(data.target.result)
        resolve(data.target.result)
      }
    })
  }

  const removeFile = () => {
    setFile(null)
    setb64("")
    setIsValid(false)
    setTags([])
  }

  return (
    <div>
      {/* dropzone if no files exist */}

      {!file && (
        <DragAndDropZone
          convertToBase64={convertToBase64}
          verifyPhoto={verifyPhoto}
          setFile={setFile}
          setb64={setb64}
          setIsValid={setIsValid}
        />
      )}

      {/* preview component + tags */}
      {file && b64 && (
        <UploadPreview
          file={file}
          tags={tags}
          b64={b64}
          isValid={isValid}
          handleRemove={removeFile}
          handlePhotosUpload={handlePhotosUpload}
          setTags={setTags}
        />
      )}
    </div>
  )
}

export default PhotoForm
