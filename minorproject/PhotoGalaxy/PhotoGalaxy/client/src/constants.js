// update this based on the url of backend server
const API_URL = "https://photogalaxy-server.vercel.app/api"
const FLASK_URL = "https://photogalaxy-server-flask.vercel.app"
// const API_URL = "http://localhost:9999/api"
// const FLASK_URL = "http://localhost:5000"

// AUTH
export const USER_AUTH_URL = API_URL + "/auth/user"
export const ADMIN_AUTH_URL = API_URL + "/auth/admin"

// PHOTO
export const GET_PHOTO_BY_ID = API_URL + "/photos/id/"
export const GET_USER_UPLOADS = API_URL + "/photos?uploaded_by="
export const GET_USER_LIKES = API_URL + "/photos?liked_by="
export const GET_ALL_PHOTOS = API_URL + "/photos"
export const UPLOAD_PHOTOS = API_URL + "/photos"
export const DELETE_PHOTO = API_URL + "/photos/id/"
export const LIKE_PHOTO = API_URL + "/photos/like/"
export const UNLIKE_PHOTO = API_URL + "/photos/unlike/"

// USER
export const GET_USER_BY_ID = API_URL + "/users/id/"
export const UPDATE_USER = API_URL + "/users/id/"
export const GET_ALL_USERS = API_URL + "/users"

// ADMIN
// export const GET_ADMIN_BY_ID = API_URL + "/admins/id/"
// export const UPDATE_ADMIN = API_URL + "/admins/id/"
export const GET_ALL_ADMINS = API_URL + "/admins"

// FLASK
export const CLASSIFY_PHOTO = FLASK_URL + "/classify"
export const GENERATE_TAGS = FLASK_URL + "/tags"
