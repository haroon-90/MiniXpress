import React, {useContext} from 'react'
import { ThemeContext } from "../contexts/ThemeContext.jsx"

const TermsAndConditions = () => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"
  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-6 ${isDark ? "text-white bg-gray-800" : "text-black bg-white"}`}>
      <h1 className="text-3xl font-bold">Terms & Conditions</h1>
      <p>Welcome to MiniXpress! Please read these terms and conditions carefully before using our application.</p>

      <section>
        <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
        <p>By accessing or using MiniXpress, you agree to be bound by these Terms and Conditions. If you do not agree with any part of the terms, then you may not access the app.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Use of the Application</h2>
        <p>MiniXpress is intended for educational and entertainment purposes only. You agree not to misuse the platform or access it using any unauthorized methods.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
        <ul className="list-disc list-inside">
          <li>You are responsible for any activity under your usage.</li>
          <li>You must not use the app for any unlawful or harmful purpose.</li>
          <li>You must not try to hack, spam, or disrupt the application.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
        <p>All content, logos, designs, and code associated with MiniXpress are the intellectual property of the developer unless otherwise stated. You may not copy, modify, or distribute any part of the app without permission.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Modifications</h2>
        <p>We reserve the right to modify these terms at any time. Any changes will be posted here, and your continued use of the app will constitute acceptance of those changes.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
        <p>MiniXpress is provided "as is" without warranties of any kind. We are not responsible for any loss or damage resulting from the use of this application.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">7. Contact Us</h2>
        <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:techdastak2@gmail.com" className="text-blue-500 underline">techdastak2@gmail.com</a>.</p>
      </section>

      <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: June 25, 2025</p>
    </div>
  )
}

export default TermsAndConditions
