"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRegister } from "@/app/services/auth";

const ROLES = [
  { value: "market_woman", label: "Market Woman" },
  { value: "farmer", label: "Farmer" },
  { value: "logistics", label: "Logistics" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ga", label: "Ga" },
  { value: "tw", label: "Twi" },
  { value: "ee", label: "Ewe" },
  { value: "dag", label: "Dagbani" },
];

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

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!fullName.trim()) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }

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

    if (!role) {
      setError("Please select your role");
      setLoading(false);
      return;
    }

    if (!location.trim()) {
      setError("Please enter your location");
      setLoading(false);
      return;
    }

    if (!preferredLanguage) {
      setError("Please select your preferred language");
      setLoading(false);
      return;
    }

    try {
      // Format the phone number for the API
      const formattedPhone = formatPhoneNumber(phoneNumber);

      const response = await apiRegister({
        name: fullName,
        phone: formattedPhone, // Use the formatted phone number
        pin: pin,
        role: role,
        location: location,
        preferredLanguage: preferredLanguage,
      });

      // Use the original phone number for the OTP verification URL
      router.push(
        "/auth/verify-otp?phone=" +
          encodeURIComponent(phoneNumber) +
          "&purpose=register"
      );
    } catch (err) {
      setError(err.message || "Something went wrong");
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
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredLanguage">Preferred Language</Label>
              <Select
                value={preferredLanguage}
                onValueChange={setPreferredLanguage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
