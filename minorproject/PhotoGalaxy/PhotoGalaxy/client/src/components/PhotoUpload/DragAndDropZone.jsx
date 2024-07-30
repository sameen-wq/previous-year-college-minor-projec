import React, { useCallback, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import { BsCloudUpload } from "react-icons/bs"

// ////// STYLES ////// //

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 7,
  // borderColor: "#000",
  borderColor: "rgb(59,130,246)",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
}

const focusedStyle = {
  borderColor: "#2196f3",
}

const acceptStyle = {
  borderColor: "#00e676",
}

const rejectStyle = {
  borderColor: "#ff1744",
}

export default function DragAndDropZone({
  convertToBase64,
  verifyPhoto,
  setFile,
  setb64,
  setIsValid,
}) {
  /////////////   WHEN FILE IS DROPPED    //////////////
  const onDrop = useCallback(async (droppedFiles) => {
    const acceptedFile = droppedFiles[0]
    setIsValid(await verifyPhoto(acceptedFile))
    setFile(acceptedFile)
    setb64(await convertToBase64(acceptedFile))
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: { "image/*": [] }, maxFiles: 1 })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <div className="flex flex-col items-center w-full">
      {/* ***** DROP ZONE ***** */}
      <form className="w-full h-64 md:w-2/3 mx-auto my-4">
        <div
          {...getRootProps({ style })}
          className="mx-auto flex items-center justify-center w-full h-64"
        >
          <input name="photo" id="photo" {...getRootProps()} hidden />
          <BsCloudUpload color="rgb(59,130,246)" size={45} className="m-2" />
          {isDragActive ? (
            <p>Drop photo here...</p>
          ) : (
            <p>Drag and drop select photo or click to select photo...</p>
          )}
        </div>
      </form>
    </div>
  )
}
