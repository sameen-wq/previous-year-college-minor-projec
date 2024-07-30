import { configureStore } from "@reduxjs/toolkit"
import userAuthSlice from "./features/userAuth/userAuthSlice"
import adminAuthSlice from "./features/adminAuth/adminAuthSlice"

const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
    adminAuth: adminAuthSlice,
  },
})

export default store
