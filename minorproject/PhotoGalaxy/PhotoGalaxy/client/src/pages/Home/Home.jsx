import React from "react"
import { SearchBar } from "../../components/common"
import HomeGallery from "./HomeGallery"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <SearchBar />
      <HomeGallery />
    </div>
  )
}
