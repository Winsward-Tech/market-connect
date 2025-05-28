import Link from "next/link";

export default function ResetSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-green-50">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-800">Password Reset Successful</h1>
        <p className="text-green-700">You can now log in with your new password.</p>
        <Link
          href="/auth/login"
          className="text-blue-600 font-medium underline hover:no-underline"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
