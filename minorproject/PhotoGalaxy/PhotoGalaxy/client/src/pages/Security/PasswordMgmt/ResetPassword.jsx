import React from "react"

export default function ResetPassword() {
  function sendPasswordResetLink(event) {
    event.target.preventDefault()
    // send request to backend that sends a temporary password reset link to that email
  }
  return (
    <div className="container mx-auto">
      <form onSubmit={sendPasswordResetLink}>
        <div>
          <p>Check your inbox for a temporary password reset link.</p>
          <p>Enter registered email:</p>
          <input type="email" placeholder="Registered email address" required />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Send link
        </button>
      </form>
    </div>
  )
}
