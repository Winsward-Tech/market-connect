"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { verifyOTP, sendOTP } from "@/app/services/auth";

function VerifyOTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const purpose = searchParams.get("purpose");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // Changed to 5 minutes (300 seconds)
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!phone) {
      router.push("/auth/forgot-pin");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phone, router]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit code");
      setLoading(false);
      return;
    }

    try {
      if (purpose === "reset-pin") {
        // Mock verification for now
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push(`/auth/reset-pin?phone=${encodeURIComponent(phone)}`);
      } else {
        // Verify OTP with the backend
        await verifyOTP(phone, otpString);

        if (purpose === "register") {
          router.push("/auth/login");
        } else {
          router.push("/select-language");
        }
      }
    } catch (err) {
      setError(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setLoading(true);
    setError("");
    try {
      await sendOTP(phone);
      setCanResend(false);
      setTimeLeft(300);
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: remainingSeconds.toString().padStart(2, "0"),
    };
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
            Verify Your Phone
          </CardTitle>
          <p className="text-sm text-gray-600">
            Enter the 6-digit code sent to{" "}
            <span className="text-green-600 font-medium">{phone}</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <div className="relative">
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type={showOtp ? "text" : "password"}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 text-center text-lg"
                      required
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowOtp(!showOtp)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showOtp ? (
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
              {loading ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="text-center space-y-4">
              {timeLeft > 0 ? (
                <div className="inline-flex items-center space-x-4 bg-green-50 px-4 py-2 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatTime(timeLeft).minutes}
                    </div>
                    <div className="text-xs text-green-600">Minutes</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">:</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatTime(timeLeft).seconds}
                    </div>
                    <div className="text-xs text-green-600">Seconds</div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend || loading}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Resend Code
                </button>
              )}
              <div>
                <Link
                  href="/auth/login"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Resend OTP
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
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
                Loading...
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      }
    >
      <VerifyOTPForm />
    </Suspense>
  );
}
