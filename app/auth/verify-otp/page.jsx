"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    // Simulate OTP verification
    if (otp === "123456") {
      router.push(`/auth/reset-password?token=mockToken123`);
    } else {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">MC</span>
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">Verify OTP</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleVerify}>
            Verify OTP
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
