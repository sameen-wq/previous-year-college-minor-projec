import React, { useEffect, useState } from "react"
import { Card, Flex, Grid, Metric, Text } from "@tremor/react"
import { Link } from "react-router-dom"
import {
  GET_ALL_ADMINS,
  GET_ALL_PHOTOS,
  GET_ALL_USERS,
} from "../../../../constants"
import { toast } from "react-hot-toast"

const AdminDash = () => {
  const [usersCount, setUsersCount] = useState(0)
  const [adminsCount, setAdminsCount] = useState(0)
  const [photosCount, setPhotosCount] = useState(0)
  const [reportsCount, setReportsCount] = useState(0)

  useEffect(() => {
    async function fetchData() {
      document.title = "Admin Dashboard"
      setUsersCount(await getUsersCount())
      setAdminsCount(await getAdminsCount())
      setPhotosCount(await getPhotosCount())
      setReportsCount(await getReportsCount())
    }

    fetchData()
    return
  }, [])

  const getUsersCount = async () => {
    try {
      const res = await fetch(GET_ALL_USERS)
      const users = await res.json()
      // console.log(await users.length)
      return users.length
      // return 3
    } catch (err) {
      toast.error("Error getting users count!")
      return 0
    }
  }

  const getAdminsCount = async () => {
    try {
      const res = await fetch(GET_ALL_ADMINS)
      const admins = await res.json()
      // console.log(await admins.length)
      return admins.length
    } catch (err) {
      // console.log(err)
      toast.error("Error getting admins count!")
      return 0
    }
  }

  const getPhotosCount = async () => {
    try {
      const res = await fetch(GET_ALL_PHOTOS)
      const data = await res.json()
      return data.photos.length
    } catch (err) {
      toast.error("Error getting photos count!")
      return 0
    }
    return 100
  }

  const getReportsCount = async () => {
    return 2
  }

  return (
    <div>
      <Flex className="p-2 gap-2" alignItems="center" justifyContent="around">
        <Card className="p-2">
          <Text>Users</Text>
          <Metric>{`${usersCount}`}</Metric>
        </Card>
        <Card className="p-2">
          <Text>Admins</Text>
          <Metric>{`${adminsCount}`}</Metric>
        </Card>

        <Card className="p-2">
          <Text>Photos</Text>
          <Metric>{`${photosCount}`}</Metric>
        </Card>
      </Flex>

      <Card className="p-2 mt-2">
        <Text>Reported Contents</Text>
        <Metric>{`${reportsCount}`}</Metric>
      </Card>

      <Flex className="p-2 gap-2" justifyContent="start">
        <Link to="/admin/analytics">
          <Card className="p-2 w-18 h-16 shadow-blue-200 flex items-center justify-center shadow-lg hover:shadow-xl duration-200">
            <Text>View Site Analytics</Text>
          </Card>
        </Link>
        <Link to="/admin/admin-mgmt">
          <Card className="p-2 w-18 h-16 shadow-blue-200  flex items-center justify-center shadow-lg hover:shadow-xl duration-200">
            <Text>Admin Management</Text>
          </Card>
        </Link>
        <Link to="/admin/user-mgmt">
          <Card className="p-2 w-18 h-16 shadow-blue-200  flex items-center justify-center shadow-lg hover:shadow-xl duration-200">
            <Text>User Management</Text>
          </Card>
        </Link>
      </Flex>

      <Flex className="p-2 gap-2" justifyContent="start">
        <Link to="/admin/reported-contents">
          <Card className="p-2 w-18 h-16 shadow-blue-200  flex items-center justify-center shadow-lg hover:shadow-xl duration-200">
            <Text>View Reported Contents</Text>
          </Card>
        </Link>
        <Link to="/admin/settings">
          <Card className="p-2 w-18 h-16 shadow-blue-200  flex items-center justify-center shadow-lg hover:shadow-xl duration-200">
            <Text>Settings</Text>
          </Card>
        </Link>
      </Flex>
    </div>
  )
}

export default AdminDash
