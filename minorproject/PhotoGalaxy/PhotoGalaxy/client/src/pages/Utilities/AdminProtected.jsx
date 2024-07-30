import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const AdminProtected = ({ children }) => {
  const {
    admin: { isLoggedIn },
  } = useSelector((store) => store.adminAuth)

  return isLoggedIn ? <div>{children}</div> : <Navigate to={"/admin-login"} />
}

export default AdminProtected
