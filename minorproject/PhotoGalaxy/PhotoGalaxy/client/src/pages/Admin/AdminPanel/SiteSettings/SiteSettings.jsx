import { Toggle, ToggleItem } from "@tremor/react"
import React, { useEffect } from "react"

const SiteSettings = () => {
  useEffect(() => {
    document.title = "Site Settings"
  }, [])

  return (
    <div>
      <label htmlFor="maintenance flex">
        {/* <input type="checkbox" /> */}
        Maintenence mode
        <Toggle defaultValue="0" className="w-10 inline-flex ml-2 ">
          <ToggleItem value="1" text="On" />
          <ToggleItem value="0" text="Off" />
        </Toggle>
      </label>
    </div>
  )
}

export default SiteSettings
