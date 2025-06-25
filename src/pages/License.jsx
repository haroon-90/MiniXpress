import React, { useContext } from 'react'
import { ThemeContext } from "../contexts/ThemeContext.jsx"

const LicenseInfo = () => {
    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"
    return (
        <div className={`max-w-4xl mx-auto p-6 space-y-6 ${isDark ? "text-white bg-gray-800" : "text-black bg-white"}`}>
            <h1 className="text-3xl font-bold">License Information</h1>
            <p>This section provides details about the licensing of the MiniXpress application and its content.</p>

            <section>
                <h2 className="text-xl font-semibold">1. Application License</h2>
                <p>MiniXpress is licensed under the <strong>MIT License</strong>, which allows users to freely use, modify, and distribute the application with proper attribution.</p>
                <p>You can read the full license below:</p>
                <pre className="bg-gray-100 text-white dark:bg-gray-700 p-4 rounded text-sm whitespace-pre-wrap">
MIT License

Copyright (c) 2025 Haroon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
        </pre>
            </section>

            <section>
                <h2 className="text-xl font-semibold">2. Third-Party Content</h2>
                <p>Some icons, fonts, or libraries used in MiniXpress may be subject to their own licenses (e.g., Tailwind CSS, Heroicons, or any other open-source packages). Please refer to their respective repositories for license details.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold">3. Contact</h2>
                <p>If you have any questions regarding this license or usage, feel free to reach out at <a href="mailto:techdastak2@gmail.com" className="text-blue-500 underline">techdastak2@gmail.com</a>.</p>
            </section>

            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: June 25, 2025</p>
        </div>
    )
}

export default LicenseInfo
