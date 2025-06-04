"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { apiLogin } from "@/app/services/auth";

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

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
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

    if (pin.length !== 6 || !/^\d+$/.test(pin)) {
      setError("PIN must be 6 digits");
      setLoading(false);
      return;
    }

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      const response = await apiLogin({
        phone: formattedPhone,
        pin: pin,
      });

      console.log("Login Response:", response); // Debug log

      // Store the token if it's in the response
      if (response?.data?.data?.token) {
        const token = response.data.data.token;
        console.log("Token received:", token); // Debug log
        localStorage.setItem("token", token);
        console.log("Token stored in localStorage"); // Debug log

        // Store user data directly from login response
        if (response?.data?.data?.user) {
          const userData = response.data.data.user;
          console.log("User Data:", userData); // Debug log
          localStorage.setItem("user", JSON.stringify(userData));

          // Store the user ID - using id instead of _id
          const userId = userData.id;
          if (userId) {
            localStorage.setItem("userId", userId);
            console.log("Stored userId:", userId); // Debug log
          } else {
            console.error("No id found in user data:", userData); // Debug log
            setError("Login failed. Invalid user data received.");
            return;
          }

          // Check if user is an admin and redirect accordingly
          if (userData.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/select-language");
          }
        } else {
          console.error("No user data in response:", response); // Debug log
          setError("Login failed. No user data received.");
          return;
        }
      } else {
        console.error("No token in response:", response); // Debug log
        setError("Login failed. No token received.");
        return;
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
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

  const handlePinChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPin(value);
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
            Log in to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="pin">PIN</Label>
              <div className="relative">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  placeholder="Enter 6-digit PIN"
                  value={pin}
                  onChange={handlePinChange}
                  maxLength={6}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPin ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link
              href="/auth/forgot-pin"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Forgot PIN?
            </Link>
            <p className="text-sm text-gray-600">
              {"Don't have an account? "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
