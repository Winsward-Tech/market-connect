"use client";

import { Button } from "@/components/ui/button";
import { testApiEndpoints } from "@/app/services/advert";
import { useState } from "react";

export default function TestPage() {
  const [testResults, setTestResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    try {
      const results = await testApiEndpoints();
      setTestResults(results);
    } catch (error) {
      console.error("Test failed:", error);
      setTestResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">API Endpoint Tests</h1>

        <Button onClick={runTests} disabled={isLoading} className="mb-6">
          {isLoading ? "Running Tests..." : "Run Tests"}
        </Button>

        {testResults !== null && (
          <div
            className={`p-4 rounded-lg ${
              testResults ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <h2 className="font-bold mb-2">
              {testResults ? "Tests Passed!" : "Tests Failed"}
            </h2>
            <p className="text-sm">
              {testResults
                ? "All API endpoints are working correctly."
                : "One or more API endpoints failed. Check the console for details."}
            </p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="font-bold mb-4">Test Coverage:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>GET /api/products - Get all products</li>
            <li>GET /api/products/:id - Get single product</li>
            <li>GET /api/products/user/:userId - Get products by user</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
