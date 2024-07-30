import { Card, Title, LineChart } from "@tremor/react"
import React, { useEffect } from "react"

const SiteAnalytics = () => {
  useEffect(() => {
    document.title = "Site Analytics"
  }, [])

  const chartdata = [
    {
      month: "Jan",
      "Growth Rate": 0.02,
    },
    {
      month: "Feb",
      "Growth Rate": 0.3,
    },
    {
      month: "Mar",
      "Growth Rate": 0.8,
    },
    {
      month: "Apr",
      "Growth Rate": 0.3,
    },
    {
      month: "May",
      "Growth Rate": 1.15,
    },
  ]

  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`

  return (
    <Card>
      <Title>PhotoGalaxy Community Growth Rate</Title>
      <LineChart
        className="mt-6 border-red-500"
        data={chartdata}
        index="month"
        categories={["Growth Rate"]}
        colors={["emerald", "gray"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  )
}

export default SiteAnalytics
