import React from "react"

export default function ChangePassword() {
  return (
    <div className="container mx-auto">
      <h1>Change Password</h1>
      <form
        action="/change-password"
        method="post"
        className="grid grid-cols-1 mx-auto"
      >
        <label htmlFor="currentPassword">Current Password:</label>
        <input type="password" id="currentPassword" name="currentPassword" />
        <br />
        <label htmlFor="new-password">New Password:</label>
        <input type="password" id="new-password" name="new-password" />
        <br />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" />
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Change Password
        </button>
      </form>
    </div>
  )
}
