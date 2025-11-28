export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-[0px_4px_15px_lightgray]">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">Privacy Policy</h1>
      <p><strong>Effective Date:</strong> 2025-06-01</p>
      <p className="mt-4">
        Attendix Pro is developed by <strong>GJ GLOBAL IT VENTURES</strong> to provide a
        reliable attendance tracking solution for individuals and teams. This
        policy explains how we collect, use, and protect your personal
        information, including any facial data.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 border-b pb-1">1. Information We Collect</h2>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>
          <strong>Face Images:</strong> Three facial images collected at registration, and
          one live image during each attendance action (e.g., clock in, clock out).
        </li>
        <li>
          <strong>Location Data:</strong> Used to validate if attendance actions are performed
          from an approved area.
        </li>
        <li>
          <strong>Device Metadata:</strong> Includes device model, OS version, and diagnostics to
          improve app reliability.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 border-b pb-1">2. Use of Facial Data</h2>
      <p className="mt-2">
        Facial images are collected to verify the identity of users during
        registration and attendance actions. Liveness detection is used to
        confirm the image is captured in real time (eye blink). This data is
        never used for advertising, profiling, or analytics.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 border-b pb-1">3. Facial Data Processing and Storage</h2>
      <p className="mt-2">
        All facial images are securely transmitted to our backend servers and
        linked to the user's account. The data is encrypted in transit and at
        rest. Processing is done solely to match the captured image with the
        registered user for attendance purposes.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 border-b pb-1">4. Data Retention</h2>
      <p className="mt-2">
        Facial data is retained as long as the user account remains active. Upon
        deletion or deactivation of the user account, associated face data is
        permanently deleted from our servers within 30 days.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 border-b pb-1">5. Data Sharing</h2>
      <p className="mt-2">
        We do not share, sell, or disclose facial data or personal information to
        third parties. All information is used exclusively for the core
        functionality of the app.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 border-b pb-1">6. Security</h2>
      <p className="mt-2">
        All data is transmitted using HTTPS and stored using industry-standard
        encryption protocols. Our servers are hosted on secure infrastructure
        provided by [Your Hosting Provider], with access restricted to authorized
        personnel only.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 border-b pb-1">7. Children’s Privacy</h2>
      <p className="mt-2">
        This app is not intended for use by children under the age of 18. We do
        not knowingly collect data from minors. If such data is identified, it
        will be deleted promptly.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 border-b pb-1">8. Policy Changes</h2>
      <p className="mt-2">
        We may update this Privacy Policy from time to time. Any updates will be
        posted on this page. Users are encouraged to review the policy
        periodically.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 border-b pb-1">9. Contact Us</h2>
      <p className="mt-2">If you have any questions about this Privacy Policy, please contact us:</p>
      <p className="mt-2">
        <strong>Email:</strong>{" "}
        <a href="mailto:apps@gjglobalsoft.com" className="text-blue-600 underline">
          apps@gjglobalsoft.com
        </a>
      </p>
    </div>
  );
}
