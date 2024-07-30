import React from "react"
import { Link } from "react-router-dom"

function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At Photogalaxy, we are committed to protecting your privacy. This
        Privacy Policy outlines how we collect, use, and disclose information
        when you use our website. By using Photogalaxy, you consent to the
        practices described below.
      </p>

      <h2 className="text-xl font-bold mb-2">1. Information Collection</h2>
      <p className="mb-4">
        We may collect personal information, such as your name and email
        address, when you register an account on Photogalaxy. Additionally, we
        may automatically collect certain non-personal information, such as your
        IP address and browser information, for analytics and website
        optimization purposes.
      </p>

      <h2 className="text-xl font-bold mb-2">2. Information Usage</h2>
      <p className="mb-4">
        We use the collected information to operate and improve our website,
        provide personalized user experiences, communicate with you, and ensure
        the security of our platform. We may also use the information in an
        aggregated and anonymized form for statistical purposes or to enhance
        our services.
      </p>

      <h2 className="text-xl font-bold mb-2">3. Information Disclosure</h2>
      <p className="mb-4">
        We do not sell, rent, or trade your personal information to third
        parties. However, we may share certain information with trusted service
        providers who assist us in delivering our services, conducting business
        operations, or meeting legal requirements. We take appropriate measures
        to ensure the confidentiality and security of your information during
        such disclosures.
      </p>

      <h2 className="text-xl font-bold mb-2">4. Data Retention</h2>
      <p className="mb-4">
        We retain your personal information for as long as necessary to fulfill
        the purposes outlined in this Privacy Policy, unless a longer retention
        period is required or permitted by law.
      </p>

      <p className="mb-4">
        This Privacy Policy is subject to change at any time without prior
        notice. It is your responsibility to review and comply with the most
        up-to-date version of the Privacy Policy.
      </p>

      <p className="mb-4">
        For more details, please refer to our{" "}
        <Link to="/terms-and-conditions" className="text-blue-500">
          Terms and Conditions
        </Link>
        .
      </p>

      <p className="mb-4">
        If you have any questions or concerns regarding our Privacy Policy,
        please contact us at{" "}
        <a href="mailto:privacy@photogalaxy.com" className="text-blue-500">
          privacy@photogalaxy.com
        </a>
        .
      </p>
    </div>
  )
}

export default PrivacyPolicy
