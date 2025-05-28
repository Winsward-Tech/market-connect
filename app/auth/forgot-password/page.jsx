"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const useMock = true; // switch to false when backend is ready

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      if (useMock) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push(`/auth/reset-requested?contact=${encodeURIComponent(contact)}`);
      } else {
        const res = await fetch("/api/auth/request-reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contact }),
        });
  
        if (res.ok) {
          router.push(`/auth/reset-requested?contact=${encodeURIComponent(contact)}`);
        } else {
          const data = await res.json();
          setError(data.message || "Failed to send reset link");
        }
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">MC</span>
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900">Forgot Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Phone Number or Email</Label>
              <Input
                id="contact"
                type="text"
                placeholder="Enter your phone number or email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/auth/login" className="text-sm text-blue-600 hover:text-blue-800">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
