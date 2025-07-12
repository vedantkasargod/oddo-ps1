"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/contexts/theme-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Zap,
  Sparkles,
  CheckCircle,
  Shield,
  Clock,
  Users,
} from "lucide-react"
import { getApiBaseUrl } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { isDarkMode } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await res.json()
      
      if (res.ok) {
        console.log("Login successful:", data.user)
        // Store user data in localStorage or context
        localStorage.setItem("user", JSON.stringify(data.user))
        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === "email") setEmail(value)
    if (field === "password") setPassword(value)
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900"
      }`}
    >
      {/* Navigation */}
      <Navigation />

      <div className="flex min-h-screen pt-16">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <img
                  src="/logo.png"
                  alt="LevelUpX Logo"
                  className="w-20 h-20 rounded-xl shadow-lg object-cover"
                  style={{ background: isDarkMode ? undefined : undefined }}
                />
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
              <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                Sign in to your LevelUpX account to continue learning
              </p>
            </div>

            <Card
              className={`${
                isDarkMode
                  ? "bg-gray-900/50 border-cyan-500/20"
                  : "bg-white border-slate-200"
              } shadow-xl`}
            >
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
                      Email Address
                    </label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`pl-10 ${
                          isDarkMode
                            ? "bg-gray-800 border-cyan-500/20 text-white placeholder-gray-500"
                            : "bg-white border-slate-300"
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
                      Password
                    </label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`pl-10 pr-10 ${
                          isDarkMode
                            ? "bg-gray-800 border-cyan-500/20 text-white placeholder-gray-500"
                            : "bg-white border-slate-300"
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className={`w-4 h-4 ${
                          isDarkMode
                            ? "text-cyan-600 bg-gray-800 border-cyan-500 focus:ring-cyan-500"
                            : "text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        } rounded`}
                      />
                      <label htmlFor="remember" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className={`text-sm ${
                        isDarkMode ? "text-cyan-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-500"
                      } transition-colors duration-200`}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full h-12 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-cyan-500/25"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/20"
                    } text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>

                <div className="mt-6">
                  <p className={`text-center text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                    Use your email and password to sign in
                  </p>
                </div>

                <p className={`text-center text-sm mt-6 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className={`${
                      isDarkMode ? "text-cyan-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-500"
                    } font-medium transition-colors duration-200`}
                  >
                    Sign up
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8">
          <div className="max-w-md">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Welcome back to LevelUpX</h2>
                <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                  Continue your learning journey and connect with professionals worldwide
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode ? "bg-cyan-500/20" : "bg-blue-100"
                    } rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Users className={`w-6 h-6 ${isDarkMode ? "text-cyan-400" : "text-blue-600"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Access Your Network</h3>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                      Connect with your existing professional network and mentors
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode ? "bg-purple-500/20" : "bg-purple-100"
                    } rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Shield className={`w-6 h-6 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Secure & Private</h3>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                      Your data is protected with enterprise-grade security
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode ? "bg-green-500/20" : "bg-green-100"
                    } rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Clock className={`w-6 h-6 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">24/7 Access</h3>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                      Learn at your own pace with round-the-clock platform access
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-900/50 border-cyan-500/20" : "bg-white border-slate-200"
                } border`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                      MJ
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Michael Johnson</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                      Data Scientist
                    </p>
                  </div>
                </div>
                <p className={`italic ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                  "I've been using LevelUpX for 6 months and have learned more than in the past 2 years combined!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
