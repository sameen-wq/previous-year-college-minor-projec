import React from "react"
import { Link } from "react-router-dom"

function TermsAndConditions() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">
        Welcome to Photogalaxy! By using our website, you agree to comply with
        the following terms and conditions:
      </p>

      <h2 className="text-xl font-bold mb-2">1. Ownership and Copyright</h2>
      <p className="mb-4">
        Users shall not upload photos that do not belong to them. By uploading a
        photo to Photogalaxy, you confirm that you are the rightful owner of the
        photo or have obtained the necessary permissions for its use and
        distribution.
      </p>

      <h2 className="text-xl font-bold mb-2">
        2. Community Usage and Licensing
      </h2>
      <p className="mb-4">
        The photos uploaded to the website now belong to the Photogalaxy
        community. By uploading a photo, you grant the community a
        non-exclusive, worldwide, royalty-free license to use, reproduce,
        distribute, modify, and publicly display the photo for any purpose. This
        license allows other users to download and use the photos from
        Photogalaxy freely.
      </p>

      <h2 className="text-xl font-bold mb-2">3. Prohibited Content</h2>
      <p className="mb-4">
        Nudes, sexually explicit content, or any other inappropriate photos are
        strictly prohibited from being uploaded to Photogalaxy. We reserve the
        right to remove any content that violates this policy, and users found
        in violation may face account suspension or termination.
      </p>

      <p className="mb-4">
        These terms and conditions are subject to change at any time without
        prior notice. It is your responsibility to review and comply with the
        most up-to-date version of the terms and conditions.
      </p>

      <p className="mb-4">
        For more details, please refer to our{" "}
        <Link to="/privacy-policy" className="text-blue-500">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="mb-4">
        If you have any questions or concerns regarding the terms and
        conditions, please contact us at{" "}
        <a href="mailto:info@photogalaxy.com" className="text-blue-500">
          info@photogalaxy.com
        </a>
        .
      </p>
    </div>
  )
}

export default TermsAndConditions
