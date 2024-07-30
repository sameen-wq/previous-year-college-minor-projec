import React, { useEffect, useState } from "react"
import { GET_ALL_ADMINS } from "../../../../constants"
import { Button, Card, Flex } from "@tremor/react"
import { toast } from "react-hot-toast"

const AdminMgmt = () => {
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      document.title = "Admin Management"
      setAdmins(await getAdmins())
    }

    fetchData()
  }, [])

  const getAdmins = async () => {
    try {
      const res = await fetch(GET_ALL_ADMINS)
      const data = await res.json()
      console.log(data)
      toast.success("Admins fetched!")
      return data
    } catch (err) {
      // console.log(err)
      toast.error("Error fetching admins!")
      return []
    }
  }

  const handleAdminDelete = async () => {
    const choice = window.prompt("Are you sure you want to delete this admin?")
    if (choice === null) return toast.error("Admin not deleted!")
    if (choice.toLowerCase() !== "yes") return toast.success("Admin deleted!")
    return toast.error("Admin not deleted!")
  }

  return (
    <Flex flexDirection="col" className="gap-3">
      <h1 className="font-semibold text-xl">Admin Management</h1>
      {admins?.map((a, index) => {
        return (
          <Card
            key={index + 1}
            className="flex gap-2 justify-between items-center"
          >
            <p>{a.email}</p>
            <Button color="red" onClick={handleAdminDelete}>
              Delete
            </Button>
          </Card>
        )
      })}
    </Flex>
  )
}

export default AdminMgmt
