"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { initiateResetPin } from "@/app/services/auth";

const formatPhoneNumber = (phone) => {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // If the number starts with 0, replace it with 233
  if (cleaned.startsWith("0")) {
    return `233${cleaned.slice(1)}`;
  }

  // If the number already starts with 233, return as is
  if (cleaned.startsWith("233")) {
    return cleaned;
  }

  // If the number doesn't start with 0 or 233, assume it's a local number
  return `233${cleaned}`;
};

export default function ForgotPinPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (
      !phoneNumber.startsWith("0") ||
      phoneNumber.length !== 10 ||
      !/^\d+$/.test(phoneNumber)
    ) {
      setError("Please enter a valid phone number starting with 0");
      setLoading(false);
      return;
    }

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      await initiateResetPin(formattedPhone);
      
      router.push(
        `/auth/verify-otp?phone=${encodeURIComponent(
          formattedPhone
        )}&purpose=reset-pin`
      );
    } catch (err) {
      setError(err.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers, must start with 0, and limit to 10 digits
    if (
      /^\d*$/.test(value) &&
      value.length <= 10 &&
      (value === "" || value.startsWith("0"))
    ) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
            <img
              src="/images/Ghana Market-logo.png"
              alt="Market Connect Logo"
              className="h-12 w-12"
            />
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Forgot PIN
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleForgotPin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0XXXXXXXXX"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength={10}
                pattern="[0-9]*"
                inputMode="numeric"
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
            <Link
              href="/auth/login"
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
