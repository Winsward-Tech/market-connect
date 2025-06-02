"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Features from "@/components/sections/Features";
import StepCard from "@/components/StepCard";
import TestimonialCard from "@/components/TestimonialCard";
import Statistics from "@/components/sections/Statistics";

// Content to be translated
const CONTENT = {
  welcome: "Welcome to Market Connect",
  description:
    "A platform designed for Ghanaian market women and farmers to learn, connect, and grow their businesses",
  getStarted: "Get Started",
  learnMore: "Learn More",
  about: "About Market Connect",
  mission: "Our Mission",
  missionText:
    "Market Connect is dedicated to empowering Ghanaian market women and farmers by providing accessible education, fostering community connections, and creating new market opportunities. We believe in the power of technology to transform traditional markets and improve livelihoods across Ghana.",
  impact: "Our Impact",
  impactPoints: [
    "Access quality education in local languages",
    "Connect with buyers and sellers nationwide",
    "Learn modern business techniques",
    "Increase income through better market access",
  ],
};

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [translatedContent, setTranslatedContent] = useState({});

  // Function to handle language change
  const handleLanguageChange = async (newLanguage) => {
    if (newLanguage === currentLanguage) return;
    setCurrentLanguage(newLanguage);
    // Translation logic would go here
  };

  // Get text based on current language
  const getText = (key) => {
    if (currentLanguage === "en") {
      return CONTENT[key];
    }
    return translatedContent[key] || CONTENT[key];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      <Navbar />

      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* About Section */}
      <section>
        <About />
      </section>

      {/* Features Section */}
      <Features />

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

      {/* Statistics Section */}
      <Statistics />

      {/* Testimonials */}
      <section className="py-12 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-8">
            User Feedbacks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestimonialCard
              name="Ama Mensah"
              role="Market Woman, Kumasi"
              quote="With Market Connect, I expect to learn how to price my products better and reach new customers. I believe this could help my business grow significantly."
              image="/images/ama.jpg"
            />
            <TestimonialCard
              name="Kofi Addo"
              role="Smallholder Farmer, Tamale"
              quote="I look forward to discovering new farming techniques and connecting with buyers in Accra through Market Connect. This should help me sell my produce at better prices."
              image="/images/kofi.webp"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
