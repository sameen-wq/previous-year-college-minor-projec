import { Card, Flex } from "@tremor/react"
import React, { useEffect } from "react"

const ReportedItems = () => {
  useEffect(() => {
    document.title = "Reported Items"
  }, [])

  const [reports, setReports] = React.useState([
    {
      reported_by: "Sameen Kunwar",
      photo_url: "https://picsum.photos/200/300",
      message:
        "I found this photo at another site. This violates PhotoGalaxy's terms and conditions!",
    },
    {
      reported_by: "Sandesh GC",
      photo_url: "https://picsum.photos/250/300",
      message: "This photo is inappropriate!",
    },
  ]) // [{}

  return (
    <div className="w-full">
      ReportedItems
      <Flex className="gap-4 flex-col">
        <Card className="shadow-red-400 p-4 flex flex-col gap-2">
          <img
            src={reports[0].photo_url}
            alt="random"
            className="rounded-md h-64 w-64 object-contain"
          />
          <p>Reported by: {reports[0].reported_by}</p>
          <p>Message: {reports[0].message}</p>
        </Card>
        <Card className="shadow-red-400 p-4">
          <img
            src={reports[1].photo_url}
            alt="random"
            className="rounded-md h-64 w-64 object-contain"
          />
          <p>Reported by: {reports[1].reported_by}</p>
          <p>Message: {reports[1].message}</p>
        </Card>
      </Flex>
    </div>
  )
}

export default ReportedItems
