import React from "react"
import { Link } from "react-router-dom"

import { SiteLogo } from "../common"

export default function Footer() {
  return (
    <div className="bg-dark text-gray-300 mt-4 p-4 ">
      <div className="container mx-auto w-full grid grid-cols-1 text-center md:text-left gap-4">
        <div className="m-auto my-4">
          <SiteLogo logoColor={"light"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-start justify-around gap-2">
          {/* EXPLORE */}
          <div className="mx-auto">
            <h5 className=" font-semibold text-gray-50 underline underline-offset-2">
              Explore
            </h5>
            <ul>
              <li className=" hover:text-gray-50 cursor-pointer">
                <Link to={"/categories/most-liked"}>Most Liked</Link>
              </li>
              <li className=" hover:text-gray-50 cursor-pointer">
                <Link to="/categories/latest"> Latest Uploads</Link>
              </li>
              <li className=" hover:text-gray-50 cursor-pointer">
                <Link to="/categories/most-downloaded">Most Downloaded</Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div className="mx-auto">
            <h5 className=" font-semibold text-gray-50 underline underline-offset-2">
              Quick Links
            </h5>
            <ul>
              <li className=" hover:text-gray-50 cursor-pointer">
                <Link to={"/"}>Home</Link>
              </li>
              <li className=" hover:text-gray-50 cursor-pointer">
                <Link to={"/categories"}>Categories</Link>
              </li>
              <li className=" hover:text-gray-50 cursor-pointer">
                <Link to={"/upload"}>Upload</Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="mx-auto">
            <h5 className=" font-semibold text-gray-50 underline underline-offset-2">
              Contact
            </h5>
            <ul>
              <li className=" hover:text-gray-50 cursor-pointer">
                PhotoGalaxy Inc.
              </li>
              <li className=" hover:text-gray-50 cursor-pointer">
                <a href="mailto:info@photogalaxy.com.np">
                  info@photogalaxy.com.np
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* TERMS AND CONDITIONS */}
        <div className="text-center lg:text-right text-gray-400 text-sm uppercase font-bold">
          <p className=" tracking-wider">Terms of Service</p>
          <p className=" tracking-wider">Privacy Policy</p>
        </div>
        <span className="text-sm">
          <a href="https://github.com/SandeshGC">
            &copy;PhotoGalaxy 2023 - All Rights Reserved
          </a>
        </span>
      </div>
    </div>
  )
}
