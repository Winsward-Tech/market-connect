import { useState, useEffect } from "react";

const mockContent = {
  title: "Financial Literacy Basics",
  type: "video",
  level: "Beginner",
  duration: "1hr 45mins",
  description:
    "Learn how to manage your money, save, and plan for your business",
  author: "Grace Addo",
  authorRole: "Financial Advisor",
  datePublished: "March 1, 2024",
  content: `
    <h2>Introduction to Financial Literacy</h2>
    <p>Welcome to this comprehensive guide on financial literacy for market women and farmers.</p>
    <h2>Key Topics Covered</h2>
    <ul>
      <li>Understanding basic financial concepts</li>
      <li>Managing daily business finances</li>
      <li>Creating a simple budget</li>
      <li>Saving strategies for business growth</li>
    </ul>
  `,
  languages: ["English", "Twi", "Ga", "Ewe"],
  relatedContent: [
    {
      title: "Pricing Your Products",
      type: "audio",
      description: "Learn how to set the right prices for your goods",
    },
    {
      title: "Record Keeping",
      type: "guide",
      description: "Simple methods to track your business finances",
    },
  ],
};

export function useLearningContent(slug) {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setContent(mockContent);
      setIsLoading(false);
    }, 500);
  }, [slug]);

  return { content, isLoading, error };
}
