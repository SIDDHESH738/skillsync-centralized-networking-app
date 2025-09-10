import { AuthForm } from "@/components/auth-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-primary/5" />

      {/* Floating orbs */}
      <div className="absolute top-32 right-32 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}
