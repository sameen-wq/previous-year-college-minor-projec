import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DELETE_PHOTO } from "../../constants"

const initialState = {
  isOpen: false,
  isLoading: false,
}

// export const deletePhoto = createAsyncThunk(
//   "deletePhotoModal/deletePhoto",
//   async ({ photoID }, thunkAPI) => {
//     try {
//       const response = await fetch(DELETE_PHOTO + photoID, {
//         method: "DELETE",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: "Bearer ",
//         },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await response.json()

//       if (response.status !== 200) {
//         // data returned from server is sent to the loginUser.fulfilled action
//         //
//         // console.log(data)
//         return thunkAPI.rejectWithValue(data)
//       } else {
//         return data
//       }
//     } catch (error) {
//       // console.log("Error:", error.response.data)
//       return thunkAPI.rejectWithValue(error.response.data)
//     }
//   }
// )

const deletePhotoModalSlice = createSlice({
  name: "deletePhotoModal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
    },
    closeModal: (state, action) => {
      state.isOpen = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deletePhoto.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deletePhoto.rejected, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      state.isLoading = false
    })
  },
})

export const { openModal, closeModal } = deletePhotoModalSlice.actions

export default deletePhotoModalSlice.reducer
