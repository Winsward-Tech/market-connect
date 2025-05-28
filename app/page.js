import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  BookOpen,
  Users,
  ShoppingBag,
  Globe,
  VolumeIcon as VolumeUp,
} from "lucide-react";
import LanguageSelector from "@/components/language-selector";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <h1 className="text-xl font-bold">Market Connect</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white">
            <VolumeUp className="h-5 w-5" />
          </Button>
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-yellow-600/10 z-0"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Market Connect Logo"
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4">
            Welcome to Market Connect
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
            A platform designed for Ghanaian market women and farmers to learn,
            connect, and grow their businesses
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="auth/login">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-6 text-lg rounded-full">
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50 px-6 py-6 text-lg rounded-full"
            >
              Learn More
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-yellow-200 rounded-full opacity-20 z-0"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-green-200 rounded-full opacity-20 z-0"></div>
      </section>

      {/* Main Features */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-8">
            Our Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-12 w-12 text-green-600" />}
              title="Learning"
              description="Access audio-visual lessons on business, farming, and health in your local language. Learn at your own pace with content designed for all education levels."
              href="/learning"
              color="bg-yellow-100"
            />
            <FeatureCard
              icon={<Users className="h-12 w-12 text-blue-600" />}
              title="Community"
              description="Connect with other farmers and market women to share knowledge, ask questions, and build relationships. Get advice from experienced members."
              href="/community"
              color="bg-blue-100"
            />
            <FeatureCard
              icon={<ShoppingBag className="h-12 w-12 text-red-600" />}
              title="Marketplace"
              description="Advertise your products and connect with buyers across Ghana. Expand your market reach and find new customers for your goods."
              href="/marketplace"
              color="bg-red-100"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-8">
            How Market Connect Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Create Your Profile"
              description="Set up your account with your name, location, and products"
            />
            <StepCard
              number="2"
              title="Learn & Connect"
              description="Access educational content and join community discussions"
            />
            <StepCard
              number="3"
              title="Grow Your Business"
              description="List your products and connect with new customers"
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 px-4 bg-green-700 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
              <p className="text-green-100">Active Users</p>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">120+</div>
              <p className="text-green-100">Communities</p>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">1,500+</div>
              <p className="text-green-100">Products Listed</p>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold mb-2">30%</div>
              <p className="text-green-100">Average Income Increase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-8">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestimonialCard
              name="Ama Mensah"
              role="Market Woman, Kumasi"
              quote="Market Connect helped me learn how to price my products better and find new customers. My business has grown by 30%!"
              image="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              name="Kofi Addo"
              role="Smallholder Farmer, Tamale"
              quote="I learned new farming techniques and connected with buyers in Accra. Now I can sell my produce for better prices."
              image="/placeholder.svg?height=80&width=80"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Market Connect</h3>
            <p>
              Empowering Ghanaian market women and farmers through education,
              community, and market access.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/learning" className="hover:underline">
                  Learning
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:underline">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:underline">
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Languages</h4>
            <ul className="space-y-2">
              <li>English</li>
              <li>Twi</li>
              <li>Ewe</li>
              <li>Ga</li>
              <li>Dagbani</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p>Email: info@marketconnect.gh</p>
            <p>Phone: +233 XX XXX XXXX</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, href, color }) {
  return (
    <Link href={href}>
      <div
        className={`${color} rounded-xl p-6 text-center h-full transition-all hover:scale-105 hover:shadow-lg cursor-pointer shadow-md flex flex-col items-center`}
      >
        <div className="flex justify-center mb-4 bg-white p-4 rounded-full shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </Link>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
        {number}
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

function TestimonialCard({ name, role, quote, image }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
      <div className="mb-4 text-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 opacity-50"
        >
          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.032.303-.406.7-.754 1.19-1.06.495-.305.95-.55 1.36-.74.42-.19.77-.334 1.04-.432.13-.043.26-.072.38-.083.12-.012.21.004.27.054.06.05.09.134.08.248-.02.115-.06.256-.11.423-.06.167-.11.32-.17.46-.06.14-.09.24-.11.29-.05.14-.04.28.03.41.06.13.15.22.28.26.13.04.28.03.43-.02.15-.05.26-.14.33-.26.07-.12.13-.28.17-.47.04-.19.08-.41.11-.65.03-.24.05-.43.04-.57-.02-.17-.08-.32-.19-.45-.11-.13-.27-.23-.48-.3-.22-.07-.45-.09-.71-.06-.26.03-.52.11-.77.23-.25.12-.5.29-.76.52-.26.23-.49.5-.69.8-.21.3-.38.65-.51 1.04-.13.39-.19.82-.19 1.27 0 .57.09 1.08.26 1.53.17.45.44.84.79 1.17.36.33.8.58 1.31.75.51.17 1.11.26 1.8.26.69 0 1.23-.13 1.63-.38.4-.25.69-.59.88-1 .19-.41.29-.87.29-1.36zm9.45 0c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.032.303-.406.7-.754 1.19-1.06.495-.305.95-.55 1.36-.74.42-.19.77-.334 1.04-.432.13-.043.26-.072.38-.083.12-.012.21.004.27.054.06.05.09.134.08.248-.02.115-.06.256-.11.423-.06.167-.11.32-.17.46-.06.14-.09.24-.11.29-.05.14-.04.28.03.41.06.13.15.22.28.26.13.04.28.03.43-.02.15-.05.26-.14.33-.26.07-.12.13-.28.17-.47.04-.19.08-.41.11-.65.03-.24.05-.43.04-.57-.02-.17-.08-.32-.19-.45-.11-.13-.27-.23-.48-.3-.22-.07-.45-.09-.71-.06-.26.03-.52.11-.77.23-.25.12-.5.29-.76.52-.26.23-.49.5-.69.8-.21.3-.38.65-.51 1.04-.13.39-.19.82-.19 1.27 0 .57.09 1.08.26 1.53.17.45.44.84.79 1.17.36.33.8.58 1.31.75.51.17 1.11.26 1.8.26.69 0 1.23-.13 1.63-.38.4-.25.69-.59.88-1 .19-.41.29-.87.29-1.36z" />
        </svg>
      </div>
      <p className="italic mb-6 text-gray-700">{quote}</p>
      <div className="flex items-center">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}
