"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Zap, Sun, Moon, LogOut, User } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function Navigation() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
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
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl transition-all duration-300 ${
        isDarkMode ? "bg-black/80 border-cyan-500/20" : "bg-white/80 border-slate-200/60"
      } border-b`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="LevelUpX Logo"
              className="w-32 h-14 rounded-xl shadow-lg object-cover"
              style={{ background: isDarkMode ? undefined : undefined }}
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className={`${
                isDarkMode ? "text-gray-400 hover:text-cyan-400" : "text-slate-600 hover:text-slate-900"
              } font-medium transition-colors duration-300`}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className={`${
                isDarkMode ? "text-gray-400 hover:text-cyan-400" : "text-slate-600 hover:text-slate-900"
              } font-medium transition-colors duration-300`}
            >
              How it works
            </Link>
            <Link
              href="#pricing"
              className={`${
                isDarkMode ? "text-gray-400 hover:text-cyan-400" : "text-slate-600 hover:text-slate-900"
              } font-medium transition-colors duration-300`}
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-yellow-500"}`} />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
                className={`${
                  isDarkMode
                    ? "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-500"
                    : "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
                }`}
              />
              <Moon className={`w-4 h-4 ${isDarkMode ? "text-cyan-400" : "text-gray-400"}`} />
            </div>

            {user ? (
              // Logged in user navigation
              <>
                <Link href="/discover">
                  <Button
                    variant="ghost"
                    className={`${
                      isDarkMode
                        ? "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    } font-medium transition-all duration-300`}
                  >
                    Discover
                  </Button>
                </Link>

                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className={`${
                      isDarkMode
                        ? "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    } font-medium transition-all duration-300`}
                  >
                    Dashboard
                  </Button>
                </Link>

                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className={`${
                      isDarkMode
                        ? "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    } font-medium transition-all duration-300`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user.firstName}
                  </Button>
                </Link>

                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className={`${
                    isDarkMode
                      ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      : "text-red-600 hover:text-red-700 hover:bg-red-50"
                  } font-medium transition-all duration-300`}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              // Guest user navigation
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className={`${
                      isDarkMode
                        ? "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    } font-medium transition-all duration-300`}
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/signup">
                  <Button
                    className={`${
                      isDarkMode
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-cyan-500/25"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/20"
                    } text-white font-semibold px-6 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
