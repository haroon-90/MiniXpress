import React, {useContext} from 'react'
import { ThemeContext } from "../contexts/ThemeContext.jsx"

const CookiesPolicy = () => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === "dark"
  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-6 ${isDark ? "text-white bg-gray-800" : "text-black bg-white"}`}>
      <h1 className="text-3xl font-bold">Cookies Policy</h1>
      <p>This Cookies Policy explains what cookies are, how MiniXpress uses them, and your choices regarding cookies when using our application.</p>

      <section>
        <h2 className="text-xl font-semibold">1. What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit a website or use a web app. They help remember your preferences and enhance user experience.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. How We Use Cookies</h2>
        <p>MiniXpress uses cookies to:</p>
        <ul className="list-disc list-inside">
          <li>Remember your theme preferences (dark or light mode)</li>
          <li>Analyze app traffic and user interaction</li>
          <li>Store temporary session data (if any)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Types of Cookies We Use</h2>
        <ul className="list-disc list-inside">
          <li><strong>Essential Cookies:</strong> Necessary for basic app functionality</li>
          <li><strong>Analytics Cookies:</strong> Help us understand usage and improve the app</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Your Choices</h2>
        <p>You can manage or disable cookies through your browser settings. Please note that disabling cookies may affect how MiniXpress functions.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Changes to This Policy</h2>
        <p>We may update this Cookies Policy as needed. Changes will be posted here with the revised date.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Contact Us</h2>
        <p>If you have any questions about our use of cookies, please contact us at <a href="mailto:techdastak2@gmail.com" className="text-blue-500 underline">techdastak2@gmail.com</a>.</p>
      </section>

      <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: June 25, 2025</p>
    </div>
  )
}

export default CookiesPolicy
