"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleReset = async () => {
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    // Simulate password reset
    if (token === "mockToken123") {
      router.push("/auth/reset-success");
    } else {
      setError("Invalid or expired token");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">MC</span>
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">Reset Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleReset}>
            Set New Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
