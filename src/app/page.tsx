import Link from "next/link"
import Image from "next/image"
import { Lock, Sun, LayoutDashboard, Leaf, Shield, Tractor } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* <div className="fixed inset-0 -z-10">
        <Image
          src="/homepagemain.jpeg" // Hero section image path
          alt="Farm landscape"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div> */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container text-center text-white space-y-6">
        <div className="fixed inset-0 -z-10">
        <Image
          src="/resources/homepagemain.jpeg" // Hero section image path
          alt="Farm landscape"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter animate-fade-up">
            Welcome to KisanMitra
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto animate-fade-up animation-delay-100">
            Revolutionizing Smart Contract Farming
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90 animate-fade-up animation-delay-200"
            asChild
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/90 features-section text-black" id="features">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all">
              <CardHeader>
                <Lock className="w-10 h-10 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle>Blockchain Smart Contracts</CardTitle>
                <CardDescription>
                  Utilize blockchain technology for transparent, secure, and automated contract agreements between farmers and buyers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all">
              <CardHeader>
                <Sun className="w-10 h-10 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle>Weather Prediction</CardTitle>
                <CardDescription>
                  Access accurate weather forecasts to help farmers make informed decisions about crop management and harvesting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all">
              <CardHeader>
                <LayoutDashboard className="w-10 h-10 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle>Farmer-Buyer Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive dashboards for both farmers and buyers to manage listings, bids, contracts, and transactions efficiently.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all">
              <CardHeader>
                <Leaf className="w-10 h-10 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle>Government Scheme</CardTitle>
                <CardDescription>
                  Stay informed about and easily access various government schemes and subsidies available for farmers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all">
              <CardHeader>
                <Shield className="w-10 h-10 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle>Quality Control</CardTitle>
                <CardDescription>
                  Implement rigorous quality control measures to ensure the highest standards of agricultural produce for buyers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all">
              <CardHeader>
                <Tractor className="w-10 h-10 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle>Agriculture Inputs</CardTitle>
                <CardDescription>
                  Connect with third-party providers for seeds, fertilizers, and other essential farming inputs to optimize crop yield.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 bg-gray-50/90 how-it-works-section text-black" id="how-it-works">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Step-by-step guide on how Smart Contract farming operates, providing a clear understanding of the process.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block" />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative bg-white rounded-lg p-6 shadow-lg">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <h3 className="text-xl font-bold mt-4 mb-2">Join as Buyer or Farmer</h3>
                <p className="text-gray-600">
                  Choose your role by clicking on the Join as Buyer or Join as Farmer button on the landing page.
                </p>
              </div>

              <div className="relative bg-white rounded-lg p-6 shadow-lg">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="text-xl font-bold mt-4 mb-2">Explore Key Features</h3>
                <p className="text-gray-600">
                  Discover the key features of Smart Contract farming, including secure transactions, transparent agreements, and efficient farming practices.
                </p>
              </div>

              <div className="relative bg-white rounded-lg p-6 shadow-lg">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="text-xl font-bold mt-4 mb-2">Understand the Process</h3>
                <p className="text-gray-600">
                  Learn how Smart Contract farming works by engaging with buyers and farmers through digital contracts, ensuring fair and profitable collaborations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 text-black bg-white/90 contact-section" id="contact">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">info@kisanmitra.com</p>
                </div>
                <div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">+1 123 456 7890</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Surname</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mail</label>
                  <Input type="email" placeholder="johndoe@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input placeholder="Your address" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea placeholder="Your message" rows={4} />
                </div>
                <Button className="w-full bg-yellow-200">Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
