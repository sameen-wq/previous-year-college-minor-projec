import React from "react"
import { PhotoForm } from "../../components"

export default function PhotoUploadPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center my-4 text-2xl font-bold underline leading-loose underline-offset-4">
        Upload Photo
      </h1>

      <PhotoForm />
    </div>
  )
}
