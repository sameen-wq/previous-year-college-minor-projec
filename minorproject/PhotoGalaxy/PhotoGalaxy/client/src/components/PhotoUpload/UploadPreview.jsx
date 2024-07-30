import React, { useEffect, useState } from "react"
import { TagsInput } from "react-tag-input-component"
import { GENERATE_TAGS } from "../../constants"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"

const UploadPreview = ({
  handleRemove,
  file,
  b64,
  isValid,
  tags,
  handlePhotosUpload,
  setTags,
}) => {
  const [selected, setSelected] = useState(tags || [])
  const [isAccepted, setIsAccepted] = useState(true)

  const toggleIsAccepted = () => {
    setIsAccepted((prev) => !prev)
  }

  ////////////////    GENERATE TAGS    //////////////////
  const generateTags = async () => {
    // console.log(await getTags())
    if (!isValid) return toast.error("Cannot generate tags for this photo!")
    const receivedTags = await getTags()
    // console.log(receivedTags)
    setSelected((prevSelected) => {
      const newTags = receivedTags.filter((tag) => !prevSelected.includes(tag))
      return [...prevSelected, ...newTags]
    })
  }

  const handleTagsChange = (enteredTag) => {
    setSelected(enteredTag)
  }

  useEffect(() => {
    setTags(selected)
  }, [selected])
  //////////////    GET TAGS    //////////////////
  const getTags = async () => {
    // console.log("file:", file)
    let formData = new FormData()
    formData.append("photo", file) // file is the image file

    try {
      const res = await fetch(GENERATE_TAGS, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      // setSelected(data)
      if (!data.length) return toast.error("No tags generated!")
      toast.success("Tags generated!")
      return data
    } catch (err) {
      // console.log(err)
      toast.error("Error getting tags!")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
      <div
        className={`${
          !isValid && "border-rose-400 "
        } lg:col-start-1 mx-auto lg:col-end-4 rounded flex items-center flex-col border-4 transition-all border-green-400 h-full w-full`}
      >
        <img
          className={`${
            !isValid && "blur-md"
          } h-[24rem] w-full object-contain p-2`}
          src={b64}
        />
      </div>

      <div className=" mx-auto w-[425px] lg:col-start-4 lg:col-end-7">
        <div className="mx-auto flex flex-col justify-between h-full">
          <label htmlFor="tags" className="flex flex-col gap-2 mb-0">
            <span className="ml-0.5">Enter Tags:</span>
            <TagsInput
              value={tags}
              onChange={handleTagsChange}
              name="tags"
              placeHolder="Enter tags here..."
              onExisting={() => {
                toast.error("Tag already exists!")
              }}
              disabled={!isValid}
            />
            {isValid ? (
              <em className="text-xs">Press enter to add new tags</em>
            ) : (
              <em className="text-xs text-red-500">
                Cannot add tags for this photo!
              </em>
            )}
          </label>

          <p className="text-sm mt-auto">
            <label>
              <input
                type="checkbox"
                checked={isAccepted ? true : false}
                onChange={toggleIsAccepted}
                className="mr-2"
              />
              I agree that the photo does not violate PhotoGalaxy's{" "}
              <Link
                to="/terms-and-conditions"
                className="text-blue-500 hover:underline duration-200"
              >
                terms and conditions.
              </Link>
            </label>
          </p>
          {/* buttons */}

          <div className="flex flex-col items-center w-full justify-between gap-2 mt-4 max-w-[425px]">
            <button
              type="button"
              onClick={generateTags}
              className={
                !isValid
                  ? "my-1 p-3 bg-gray-500 text-gray-200 rounded-md w-full "
                  : "my-1 p-3 bg-blue-500 hover:bg-blue-700 duration-200 rounded-md text-white w-full"
              }
            >
              Auto-generate Tags
            </button>

            <button
              type="button"
              // disabled={!isAccepted}
              onClick={(e) =>
                isAccepted
                  ? handlePhotosUpload(e)
                  : toast.error("Please agree to the terms and conditions!")
              }
              className={
                !isValid
                  ? "my-1 p-3 bg-gray-500 text-gray-200 rounded-md w-full"
                  : "my-1 text-white  bg-secondaryGreen hover:bg-green-800 duration-200 p-3 rounded-md w-full"
              }
            >
              Upload
            </button>

            <button
              type="button"
              onClick={handleRemove}
              className={
                " text-white bg-rose-500 hover:bg-rose-900 duration-200 p-3 rounded-md focus:outline-none w-full"
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPreview
