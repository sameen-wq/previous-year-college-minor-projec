import React from "react"
import { toast } from "react-hot-toast"
import { FaSearch } from "react-icons/fa"
import { GET_ALL_PHOTOS } from "../../constants"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"

export default function SearchBar() {
  const [query, setQuery] = React.useState("")

  const navigate = useNavigate()

  

  const handleSearchClick = () => {
    const page = 1
    const limit = 10

    if (!query) {
      return toast.error("Please enter a search query!")
    }
    return navigate(`/search?query=${query}&&page=${page}&&limit=${limit}`)
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className="my-4 p-2">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          name="query"
          value={query}
          onChange={handleQueryChange}
          className="w-full md:max-w-25 p-2.5 rounded-md border-2"
          placeholder="Search quality photos..."
        />

        {/* <Link to={`/search?query=${query}&&page=${page}&&limit=${limit}`}> */}
        <button
          className="bg-secondaryGreen p-4 rounded-md"
          onClick={handleSearchClick}
        >
          <FaSearch color="white" />
        </button>
        {/* </Link> */}
      </div>
    </div>
  )
}
