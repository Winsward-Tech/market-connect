"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function OTPPage() {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(179)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleVerify = (e) => {
    e.preventDefault()
    console.log("OTP verification attempt with:", otp)
  }

  const handleResendOTP = () => {
    setTimeLeft(179)
    setCanResend(false)
    console.log("Resending OTP...")
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <Button variant="ghost" size="icon" onClick={handleBack} className="self-start -ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-2xl font-semibold text-gray-900 text-center">OTP Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-gray-900">Enter Verification Code</h3>
            <p className="text-sm text-gray-600">An OTP has been sent to your phone number</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="sr-only">
                OTP Code
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>

            <div className="text-center">
              <div className="inline-flex items-center space-x-4 bg-green-50 px-4 py-2 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{formatTime(timeLeft).split(":")[0]}</div>
                  <div className="text-xs text-green-600">Minutes</div>
                </div>
                <div className="text-2xl font-bold text-green-600">:</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{formatTime(timeLeft).split(":")[1]}</div>
                  <div className="text-xs text-green-600">Seconds</div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={otp.length !== 6}>
              Verify
            </Button>
          </form>

          <div className="text-center">
            {canResend ? (
              <Button variant="link" onClick={handleResendOTP} className="text-green-600 hover:text-green-700">
                Resend OTP
              </Button>
            ) : (
              <span className="text-sm text-gray-500">Resend OTP in {formatTime(timeLeft)}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
