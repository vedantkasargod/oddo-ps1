"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/contexts/theme-context"
import { Shield, LogIn, User } from "lucide-react"
import Link from "next/link"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()
  const { isDarkMode } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
    
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("user")
      }
    }
    
    setIsLoading(false)
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-black text-white" : "bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900"
        } flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>Loading...</p>
        </div>
      </div>
    )
  }

  // If user is not logged in, show access denied page
  if (!user) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-black text-white" : "bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900"
        }`}
      >
        <Navigation />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <Card
            className={`max-w-md w-full ${
              isDarkMode
                ? "bg-gray-900/50 border-cyan-500/20 backdrop-blur-xl"
                : "bg-white border-slate-200 shadow-xl"
            }`}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <CardTitle className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Access Restricted
              </CardTitle>
              <CardDescription className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                You need to be logged in to access this page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-600"} text-center`}>
                Please sign in to your account to continue
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/login">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium py-3">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="w-full font-medium py-3">
                    <User className="w-4 h-4 mr-2" />
                    Create Account
                  </Button>
                </Link>
              </div>
              <div className="text-center">
                <Link
                  href="/"
                  className={`text-sm hover:underline ${
                    isDarkMode ? "text-cyan-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  ← Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // If user is logged in, render the protected content
  return <>{children}</>
} 