import React, {useContext} from 'react'
import { ThemeContext } from "../contexts/ThemeContext.jsx"

const PrivacyPolicy = () => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"
  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-6 ${isDark ? "text-white bg-gray-800" : "text-black bg-white"}`}>
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p>This Privacy Policy describes how MiniXpress collects, uses, and protects any information that you provide while using this application.</p>

      <section>
        <h2 className="text-xl font-semibold">1. Information We Collect</h2>
        <p>We may collect basic information such as:</p>
        <ul className="list-disc list-inside">
          <li>Email address (if provided)</li>
          <li>User preferences (like dark/light mode)</li>
          <li>Usage analytics (for improvement only)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
        <p>The collected data may be used to:</p>
        <ul className="list-disc list-inside">
          <li>Improve the user experience</li>
          <li>Understand how users interact with our app</li>
          <li>Fix bugs and enhance performance</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Data Security</h2>
        <p>We are committed to ensuring that your information is secure. While no method of transmission is 100% secure, we implement appropriate measures to protect your data.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Third-Party Services</h2>
        <p>We do not share your personal information with third parties. However, we may use third-party tools for analytics and performance tracking which collect anonymized data.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside">
          <li>Request deletion of your data (if any)</li>
          <li>Opt out of data tracking (when possible)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Updates to This Policy</h2>
        <p>We may update this privacy policy from time to time. All updates will be posted on this page with a revised date.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:techdastak2@gmail.com" className="text-blue-500 underline">techdastak2@gmail.com</a>.</p>
      </section>

      <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: June 25, 2025</p>
    </div>
  )
}

export default PrivacyPolicy
