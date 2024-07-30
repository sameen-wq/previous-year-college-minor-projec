import React, { useEffect } from "react"
import { Gallery } from "react-grid-gallery"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { GET_ALL_PHOTOS } from "../constants"

const SearchPage = () => {
  const [searchResults, setSearchResults] = React.useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const query = searchParams.get("query")
  const page = searchParams.get("page")
  const limit = searchParams.get("limit")

  // console.log(query, page, limit)

  useEffect(() => {
    handleSearch({ query, page, limit })
  }, [])

  const handleSearch = ({ query, page, limit }) => {
    // e.preventDefault()

    if (!query) {
      return toast.error("Please enter a search query!")
    }

    toast.loading("Searching...")

    fetch(`${GET_ALL_PHOTOS}?search=${query}&&page=${page}&&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          toast.dismiss()
          toast.success(`Showing results for ${query}! `)
          const data = await res.json()
          // console.log(data.photos)
          return setSearchResults(data.photos)
        } else {
          toast.dismiss()
          return toast.error("Error searching photos!")
        }
      })
      .catch((error) => {
        toast.dismiss()
        return toast.error("Error searching photos!")
      })
  }

  const images =
    searchResults.length &&
    searchResults?.map((eachPhoto) => ({
      id: eachPhoto._id,
      height: eachPhoto.dimensions.height,
      width: eachPhoto.dimensions.width,
      src: eachPhoto.url,
      alt: "PhotoGalaxy",
    }))

  function openEachPhotoPage(index, photo, event) {
    navigate(`/photo/${photo.id}`)
  }

  return (
    <div>
      <Gallery
        images={images}
        enableImageSelection={false}
        onClick={openEachPhotoPage}
        margin={10}
        rowHeight={400}
        tileViewportStyle={(o) => ({
          objectFit: "contain",
          height: o.item.scaledHeight,
          width: o.item.viewportWidth,
          overflow: "hidden",
        })}
      />
    </div>
  )
}

export default SearchPage
