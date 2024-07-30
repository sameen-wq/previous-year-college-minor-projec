import React, { useEffect, useState } from "react"
import { GET_ALL_USERS } from "../../../../constants"
import { toast } from "react-hot-toast"
import { Button, Card, Flex } from "@tremor/react"

const UserMgmt = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log("UserMgmt")
    const fetchData = async () => {
      document.title = "User Management"
      setUsers(await getUsers())
    }

    fetchData()
  }, [])

  const getUsers = async () => {
    try {
      const res = await fetch(GET_ALL_USERS)
      const data = await res.json()
      // console.log(data)
      toast.success("Users fetched!")
      return data
    } catch (err) {
      // console.log(err)
      toast.error("Error fetching users!")
      return []
    }
  }

  return (
    <Flex flexDirection="col" className="gap-3">
      <h1 className="font-semibold text-xl">User Management</h1>
      {users?.map((u, index) => {
        return (
          <Card key={index + 1}>
            <p className="font-medium">
              {u.first_name} {u.last_name}
            </p>
            <Flex justifyContent="between" alignItems="center">
              <p>{u.email}</p>
              <Button color="red">Block</Button>
            </Flex>
          </Card>
        )
      })}
    </Flex>
  )
}

export default UserMgmt
