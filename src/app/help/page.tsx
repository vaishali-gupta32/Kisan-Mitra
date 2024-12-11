import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function Help() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Help Center</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">How do I create an account?</h3>
                <p>To create an account, click on the Register button in the top right corner of the page. Fill out the required information and submit the form.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">How can I reset my password?</h3>
                <p>If you have forgotten your password, click on the Forgot Password link on the login page. Follow the instructions sent to your email to reset your password.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">How do I list my products for sale?</h3>
                <p>After logging in, navigate to your dashboard and click on Add Product. Fill out the product details and submit the form to list your product.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
            <p>If you cannot find the answer to your question, please do not hesitate to contact our support team:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Email: support@kisanmitra.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Hours: Monday to Friday, 9:00 AM to 6:00 PM IST</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

