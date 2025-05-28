"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetRequestedPage() {
  const searchParams = useSearchParams();
  const contact = searchParams.get("contact");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="max-w-md text-center space-y-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow">
          <h1 className="text-xl font-semibold">Reset Code Sent</h1>
          <p>
            If an account with <span className="font-medium">{contact}</span>{" "}
            exists, an OTP has been sent to it. Please check your inbox or
            messages.
          </p>
        </div>
        <Link
          href="/auth/verify-otp"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Enter OTP
        </Link>
      </div>
    </div>
  );
}
