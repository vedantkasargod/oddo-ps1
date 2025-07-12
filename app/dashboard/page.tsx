"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/contexts/theme-context"
import { Clock, CheckCircle, XCircle, Star, MessageSquare, Calendar, ArrowRight } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("pending-incoming")
  const [feedbackRating, setFeedbackRating] = useState(5)
  const [feedbackText, setFeedbackText] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
    
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const pendingIncoming = [
    {
      id: 1,
      user: {
        name: "Marcus Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      skillOffered: "Digital Marketing",
      skillRequested: "React Development",
      message:
        "Hi! I'd love to learn React from you. I have 3+ years of digital marketing experience and can help you with SEO, content strategy, and social media marketing.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Elena Kowalski",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5.0,
      },
      skillOffered: "Photography",
      skillRequested: "UI/UX Design",
      message:
        "I'm a professional photographer looking to transition into UX design. Would love to exchange photography skills for design mentorship!",
      timestamp: "5 hours ago",
    },
  ]

  const pendingOutgoing = [
    {
      id: 3,
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      skillOffered: "TypeScript",
      skillRequested: "Data Science",
      message: "Interested in learning data science fundamentals. I can teach advanced TypeScript and React patterns.",
      timestamp: "1 day ago",
      status: "pending",
    },
  ]

  const activeSwaps = [
    {
      id: 4,
      user: {
        name: "Amara Okafor",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      skillOffered: "Product Management",
      skillRequested: "React Development",
      startDate: "2024-01-15",
      nextSession: "2024-01-22",
      progress: 60,
    },
  ]

  const completedSwaps = [
    {
      id: 5,
      user: {
        name: "Carlos Mendoza",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
      },
      skillOffered: "Blockchain",
      skillRequested: "UI/UX Design",
      completedDate: "2024-01-10",
      duration: "3 weeks",
      feedback: null,
    },
  ]

  const handleAcceptSwap = (swapId: number) => {
    console.log("Accepting swap:", swapId)
  }

  const handleRejectSwap = (swapId: number) => {
    console.log("Rejecting swap:", swapId)
  }

  const handleCancelSwap = (swapId: number) => {
    console.log("Canceling swap:", swapId)
  }

  const submitFeedback = (swapId: number) => {
    console.log("Submitting feedback:", { swapId, rating: feedbackRating, text: feedbackText })
    setFeedbackText("")
    setFeedbackRating(5)
  }

  return (
    <AuthGuard>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-black text-white" : "bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900"
        } relative overflow-hidden`}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 opacity-10">
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"
                : "bg-gradient-to-br from-blue-400/20 via-transparent to-indigo-400/20"
            }`}
          />
          <div
            className="absolute inset-0 transition-transform duration-1000 ease-out"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
                isDarkMode ? "rgba(6, 182, 212, 0.05)" : "rgba(59, 130, 246, 0.05)"
              }, transparent 40%)`,
            }}
          />
        </div>

        {/* Floating Neon Elements */}
        {isDarkMode && (
          <div className="fixed inset-0 pointer-events-none">
            <div
              className="absolute w-32 h-32 rounded-full opacity-20 animate-pulse"
              style={{
                left: "10%",
                top: "20%",
                background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
                animationDuration: "4s",
              }}
            />
            <div
              className="absolute w-24 h-24 rounded-full opacity-30 animate-pulse"
              style={{
                right: "15%",
                top: "30%",
                background: "radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)",
                filter: "blur(15px)",
                animationDuration: "3s",
                animationDelay: "1s",
              }}
            />
            <div
              className="absolute w-40 h-40 rounded-full opacity-15 animate-pulse"
              style={{
                left: "70%",
                bottom: "20%",
                background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
                filter: "blur(25px)",
                animationDuration: "5s",
                animationDelay: "2s",
              }}
            />
          </div>
        )}

        {/* Navigation */}
        <Navigation />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-8">
          {/* Header */}
          <div className={`mb-12 ${isLoaded ? "animate-in slide-in-from-top duration-1000" : "opacity-0"}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Welcome back, {user?.firstName || "User"}!
                </h1>
                <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"} text-lg`}>
                  Manage your skill exchange requests and active swaps
                </p>
              </div>
              {user && (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">{user.firstName} {user.lastName}</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                      {user.profession || "Professional"}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
                      {user.location || "Location not set"}
                    </p>
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </div>

          {/* User Skills Overview */}
          {user && (
            <div className={`mb-8 ${isLoaded ? "animate-in slide-in-from-bottom duration-1000" : "opacity-0"}`}>
              <Card
                className={`${
                  isDarkMode
                    ? "bg-gray-900/50 border-cyan-500/20"
                    : "bg-white border-slate-200"
                } backdrop-blur-xl`}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Your Skills Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-cyan-600">Skills You Can Teach</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.skills && user.skills.length > 0 ? (
                          user.skills.map((skill: string, index: number) => (
                            <Badge
                              key={index}
                              className={`${
                                isDarkMode
                                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                                  : "bg-cyan-50 text-cyan-700 border-cyan-200"
                              }`}
                            >
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                            No skills added yet
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 text-purple-600">Skills You Want to Learn</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.seeking && user.seeking.length > 0 ? (
                          user.seeking.map((skill: string, index: number) => (
                            <Badge
                              key={index}
                              className={`${
                                isDarkMode
                                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                  : "bg-purple-50 text-purple-700 border-purple-200"
                              }`}
                            >
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                            No skills added yet
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stats Overview */}
          <div
            className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 ${isLoaded ? "animate-in slide-in-from-bottom duration-1000" : "opacity-0"}`}
          >
            <Card
              className={`${
                isDarkMode
                  ? "bg-gray-900/50 border-cyan-500/20 hover:bg-gray-900/70"
                  : "bg-white border-slate-200 hover:shadow-xl"
              } backdrop-blur-xl group transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
                        : "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Clock className={`w-6 h-6 ${isDarkMode ? "text-cyan-400" : "text-blue-600"}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{pendingIncoming.length}</div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Pending Requests</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`${
                isDarkMode
                  ? "bg-gray-900/50 border-cyan-500/20 hover:bg-gray-900/70"
                  : "bg-white border-slate-200 hover:shadow-xl"
              } backdrop-blur-xl group transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                        : "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                    } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Calendar className={`w-6 h-6 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{activeSwaps.length}</div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Active Swaps</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`${
                isDarkMode
                  ? "bg-gray-900/50 border-cyan-500/20 hover:bg-gray-900/70"
                  : "bg-white border-slate-200 hover:shadow-xl"
              } backdrop-blur-xl group transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20"
                        : "bg-gradient-to-r from-green-500/20 to-emerald-500/20"
                    } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <CheckCircle className={`w-6 h-6 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{completedSwaps.length}</div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`${
                isDarkMode
                  ? "bg-gray-900/50 border-cyan-500/20 hover:bg-gray-900/70"
                  : "bg-white border-slate-200 hover:shadow-xl"
              } backdrop-blur-xl group transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20"
                        : "bg-gradient-to-r from-yellow-500/20 to-orange-500/20"
                    } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Star className={`w-6 h-6 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.9</div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Avg Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList
              className={`grid w-full grid-cols-4 ${
                isDarkMode ? "bg-gray-900/50 border-cyan-500/20" : "bg-slate-100 border-slate-200"
              } border`}
            >
              <TabsTrigger
                value="pending-incoming"
                className={`${
                  isDarkMode
                    ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                Incoming ({pendingIncoming.length})
              </TabsTrigger>
              <TabsTrigger
                value="pending-outgoing"
                className={`${
                  isDarkMode
                    ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                Outgoing ({pendingOutgoing.length})
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className={`${
                  isDarkMode
                    ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                Active ({activeSwaps.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className={`${
                  isDarkMode
                    ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                Completed ({completedSwaps.length})
              </TabsTrigger>
            </TabsList>

            {/* Pending Incoming Requests */}
            <TabsContent value="pending-incoming" className="space-y-6">
              {pendingIncoming.length === 0 ? (
                <Card
                  className={`${
                    isDarkMode
                      ? "bg-gray-900/50 border-cyan-500/20 backdrop-blur-xl"
                      : "bg-white border-slate-200 shadow-lg"
                  }`}
                >
                  <CardContent className="p-12 text-center">
                    <Clock className={`w-12 h-12 ${isDarkMode ? "text-gray-400" : "text-slate-400"} mx-auto mb-4`} />
                    <h3 className="text-xl font-semibold mb-2">No Pending Requests</h3>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                      You don't have any incoming swap requests at the moment.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingIncoming.map((request, index) => (
                    <Card
                      key={request.id}
                      className={`${
                        isDarkMode
                          ? "bg-gray-900/50 border-cyan-500/20 hover:bg-gray-900/70"
                          : "bg-white border-slate-200 hover:shadow-xl"
                      } backdrop-blur-xl transition-all duration-500 ${
                        isLoaded ? `animate-in slide-in-from-left duration-1000` : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className={`w-12 h-12 ring-2 ${isDarkMode ? "ring-cyan-500/20" : "ring-blue-500/20"}`}>
                            <AvatarImage src={request.user.avatar || "/placeholder.svg"} alt={request.user.name} />
                            <AvatarFallback
                              className={`${
                                isDarkMode
                                  ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                                  : "bg-gradient-to-r from-blue-500 to-purple-500"
                              } text-white`}
                            >
                              {request.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold">{request.user.name}</h3>
                                <div
                                  className={`flex items-center space-x-1 text-sm ${
                                    isDarkMode ? "text-gray-400" : "text-slate-500"
                                  }`}
                                >
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span>{request.user.rating}</span>
                                  <span>•</span>
                                  <span>{request.timestamp}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 mb-3">
                              <Badge
                                className={`${
                                  isDarkMode
                                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                                    : "bg-blue-50 text-blue-700 border-blue-200"
                                }`}
                              >
                                Offers: {request.skillOffered}
                              </Badge>
                              <ArrowRight className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-slate-400"}`} />
                              <Badge
                                variant="outline"
                                className={`${
                                  isDarkMode ? "border-purple-500/30 text-purple-300" : "border-slate-300 text-slate-600"
                                }`}
                              >
                                Wants: {request.skillRequested}
                              </Badge>
                            </div>
                            <p className={`${isDarkMode ? "text-gray-300" : "text-slate-700"} mb-4`}>{request.message}</p>
                            <div className="flex space-x-3">
                              <Button
                                onClick={() => handleAcceptSwap(request.id)}
                                className={`${
                                  isDarkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700"
                                } text-white border-0 transition-all duration-300`}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Accept
                              </Button>
                              <Button
                                onClick={() => handleRejectSwap(request.id)}
                                variant="outline"
                                className={`${
                                  isDarkMode
                                    ? "border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                                    : "border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                                } transition-all duration-300 bg-transparent`}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Decline
                              </Button>
                              <Button
                                variant="ghost"
                                className={`${
                                  isDarkMode
                                    ? "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                } transition-all duration-300`}
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Other tab contents would continue similarly... */}
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
