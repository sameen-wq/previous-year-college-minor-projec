import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { USER_AUTH_URL } from "../../constants"

const initialState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    accessToken: "",
    isLoggedIn: false,
  },
  isLoading: false,
}

//////////////////////////////////////
/////////////  SIGN UP  //////////////
//////////////////////////////////////

export const signupUser = createAsyncThunk(
  "userAuth/signup",
  async ({ firstName, lastName, email, password }, thunkAPI) => {
    try {
      const response = await fetch(USER_AUTH_URL + "/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (response.status !== 201) {
        return thunkAPI.rejectWithValue(data)
      } else {
        return data
      }
    } catch (error) {
      // console.log("Error: ", error.response.data)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

/////////////////////////////
//////////  LOGIN  //////////
/////////////////////////////

export const loginUser = createAsyncThunk(
  "userAuth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(USER_AUTH_URL + "/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.status !== 200) {
        // data returned from server is sent to the loginUser.fulfilled action
        return thunkAPI.rejectWithValue(data)
      } else {
        return data
      }
    } catch (error) {
      // console.log("Error:", error.response.data)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

/********** USER SLICE ***********/
const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      if (localStorage.getItem("user") && localStorage.getItem("accessToken")) {
        state.user = JSON.parse(localStorage.getItem("user"))
        state.user.accessToken = JSON.parse(localStorage.getItem("accessToken"))
        state.user.isLoggedIn = true
      }
    },
    logoutUser: (state, action) => {
      localStorage.clear()
      state.user = {}
      state.user.isLoggedIn = false
    },
  },
  extraReducers: (builder) => {
    // sign up //

    builder.addCase(signupUser.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(signupUser.rejected, (state, action) => {
      state.isLoading = false
    })

    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isLoading = false
    })

    // login //

    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true
      localStorage.clear()
    })

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      )
      state.user.isLoggedIn = true
      state.isLoading = false
    })
  },
})

export const { setCredentials, logoutUser } = userAuthSlice.actions
export default userAuthSlice.reducer
