"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/contexts/theme-context"
import { Search, MapPin, Star, Clock, ArrowRight, X, SlidersHorizontal, Loader2 } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { getApiBaseUrl } from "@/lib/api"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  location: string
  profession: string
  skills: string[]
  seeking: string[]
  createdAt: string
}

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("Any location")
  const [selectedSkill, setSelectedSkill] = useState("Any skill")
  const [ratingFilter, setRatingFilter] = useState([0])
  const [showFilters, setShowFilters] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
    
    // Get current user to exclude from results
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setCurrentUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
    
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError("")
      
      console.log("Fetching users from:", `${getApiBaseUrl()}/api/users`)
      const response = await fetch(`${getApiBaseUrl()}/api/users`)
      console.log("Response status:", response.status)
      
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }
      
      const data = await response.json()
      console.log("API Response data:", data)
      console.log("Data type:", typeof data, "Is array:", Array.isArray(data))
      
      // The backend returns users directly as an array, not wrapped in a 'users' property
      const usersArray = Array.isArray(data) ? data : []
      console.log("Processed users array:", usersArray)
      setUsers(usersArray)
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Failed to load users. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Transform database users to display format
  const transformedUsers = users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    avatar: "/placeholder.svg?height=60&width=60",
    skills: user.skills || [],
    seeking: user.seeking || [],
    rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0 for demo
    location: user.location || "Unknown",
    availability: "Flexible", // Default availability
    completedSwaps: Math.floor(Math.random() * 50) + 5, // Random number for demo
    responseTime: `${Math.floor(Math.random() * 24) + 1}h`, // Random response time
    verified: Math.random() > 0.3, // 70% chance of being verified
    profession: user.profession || "Professional",
  }))

  // Filter out current user from results
  const availableUsers = transformedUsers.filter(user => 
    !currentUser || user.id !== currentUser.id
  )

  const filteredUsers = availableUsers.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.seeking.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.profession.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation = selectedLocation === "Any location" || user.location === selectedLocation
    const matchesRating = user.rating >= ratingFilter[0]

    return matchesSearch && matchesLocation && matchesRating
  })

  // Get unique locations from users for filter dropdown
  const uniqueLocations = Array.from(new Set(availableUsers.map(user => user.location).filter(Boolean)))

  // Get unique skills for filter dropdown
  const allSkills = availableUsers.flatMap(user => [...user.skills, ...user.seeking])
  const uniqueSkills = Array.from(new Set(allSkills)).filter(Boolean)

  return (
    <AuthGuard>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-black text-white" : "bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900"
        }`}
      >
        {/* Navigation */}
        <Navigation />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Header */}
          <div className={`mb-12 ${isLoaded ? "animate-in slide-in-from-top duration-1000" : "opacity-0"}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Professionals</h1>
            <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"} text-lg`}>
              Find verified experts ready to exchange skills and knowledge
            </p>
          </div>

          {/* Search and Filters */}
          <div className={`mb-12 space-y-6 ${isLoaded ? "animate-in slide-in-from-top duration-1000" : "opacity-0"}`}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? "text-cyan-400" : "text-slate-400"
                  }`}
                />
                <Input
                  type="text"
                  placeholder="Search by name, skills, profession, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-12 pr-4 py-4 ${
                    isDarkMode
                      ? "bg-gray-900/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                      : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  } rounded-xl shadow-sm transition-all duration-200`}
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className={`${
                  isDarkMode
                    ? "border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/40"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                } px-6 py-4 font-medium transition-all duration-200`}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <Card
                className={`${
                  isDarkMode
                    ? "bg-gray-900/50 border-cyan-500/20 backdrop-blur-xl"
                    : "bg-white border-slate-200 shadow-lg"
                } animate-in slide-in-from-top duration-500`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      Advanced Filters
                    </h3>
                    <Button
                      onClick={() => setShowFilters(false)}
                      variant="ghost"
                      size="sm"
                      className={`${isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-slate-400 hover:text-slate-600"}`}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label
                        className={`text-sm font-medium mb-2 block ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                      >
                        Location
                      </label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger
                          className={`${
                            isDarkMode
                              ? "bg-gray-800/50 border-cyan-500/20 text-white"
                              : "bg-white border-slate-300 text-slate-900"
                          }`}
                        >
                          <SelectValue placeholder="Any location" />
                        </SelectTrigger>
                        <SelectContent
                          className={`${isDarkMode ? "bg-gray-900 border-cyan-500/20" : "bg-white border-slate-200"}`}
                        >
                          <SelectItem value="Any location">Any location</SelectItem>
                          {uniqueLocations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium mb-2 block ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                      >
                        Skill Category
                      </label>
                      <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                        <SelectTrigger
                          className={`${
                            isDarkMode
                              ? "bg-gray-800/50 border-cyan-500/20 text-white"
                              : "bg-white border-slate-300 text-slate-900"
                          }`}
                        >
                          <SelectValue placeholder="Any skill" />
                        </SelectTrigger>
                        <SelectContent
                          className={`${isDarkMode ? "bg-gray-900 border-cyan-500/20" : "bg-white border-slate-200"}`}
                        >
                          <SelectItem value="Any skill">Any skill</SelectItem>
                          {uniqueSkills.slice(0, 20).map((skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium mb-2 block ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                      >
                        Minimum Rating: {ratingFilter[0].toFixed(1)}
                      </label>
                      <Slider
                        value={ratingFilter}
                        onValueChange={setRatingFilter}
                        max={5}
                        min={0}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-cyan-500" />
                <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                  Loading professionals...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className={`${isDarkMode ? "text-red-400" : "text-red-600"} text-lg mb-4`}>
                {error}
              </div>
              <Button
                onClick={fetchUsers}
                className={`${
                  isDarkMode
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                } text-white font-medium`}
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Results */}
          {!loading && !error && (
            <>
              <div className="mb-6">
                <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"} font-medium`}>
                  Showing {filteredUsers.length} {filteredUsers.length === 1 ? 'professional' : 'professionals'}
                  {availableUsers.length > 0 && ` (${availableUsers.length} total)`}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredUsers.map((user, index) => (
                  <Card
                    key={user.id}
                    className={`${
                      isDarkMode
                        ? "bg-gray-900/50 border-cyan-500/20 hover:bg-gray-900/70 hover:border-cyan-500/40"
                        : "bg-white border-slate-200 hover:shadow-xl"
                    } backdrop-blur-xl transition-all duration-300 group hover:-translate-y-1 ${
                      isLoaded ? `animate-in slide-in-from-bottom duration-1000` : "opacity-0"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      boxShadow: isDarkMode ? "0 0 30px rgba(6, 182, 212, 0.1)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <Avatar
                            className={`w-16 h-16 ring-4 ${
                              isDarkMode
                                ? "ring-cyan-500/20 group-hover:ring-cyan-500/40"
                                : "ring-blue-100 group-hover:ring-blue-200"
                            } transition-all duration-300`}
                          >
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback
                              className={`${
                                isDarkMode
                                  ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
                              } text-white text-lg font-semibold`}
                            >
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {user.verified && (
                            <div
                              className={`absolute -bottom-1 -right-1 w-6 h-6 ${
                                isDarkMode ? "bg-green-400" : "bg-green-500"
                              } rounded-full flex items-center justify-center`}
                            >
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="text-xl font-semibold">{user.name}</h3>
                                {user.verified && (
                                  <Badge
                                    className={`${
                                      isDarkMode
                                        ? "bg-green-400/20 text-green-300 border-green-400/30"
                                        : "bg-green-50 text-green-700 border-green-200"
                                    } text-xs`}
                                  >
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"} mt-1`}>
                                {user.profession}
                              </div>
                              <div
                                className={`flex flex-wrap items-center gap-3 text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-slate-500"
                                } mt-2`}
                              >
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="font-medium">{user.rating.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{user.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{user.availability}</span>
                                </div>
                              </div>
                              <div
                                className={`flex items-center gap-4 mt-2 text-sm ${
                                  isDarkMode ? "text-gray-500" : "text-slate-400"
                                }`}
                              >
                                <span>{user.completedSwaps} successful exchanges</span>
                                <span>Responds in {user.responseTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 mt-6">
                        {user.skills.length > 0 && (
                          <div>
                            <div className={`text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
                              Skills Offered
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {user.skills.slice(0, 5).map((skill, index) => (
                                <Badge
                                  key={index}
                                  className={`${
                                    isDarkMode
                                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30"
                                      : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                                  } transition-colors duration-200`}
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {user.skills.length > 5 && (
                                <Badge
                                  variant="outline"
                                  className={`${
                                    isDarkMode
                                      ? "border-gray-600 text-gray-400"
                                      : "border-slate-300 text-slate-500"
                                  }`}
                                >
                                  +{user.skills.length - 5} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        {user.seeking.length > 0 && (
                          <div>
                            <div className={`text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
                              Skills Seeking
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {user.seeking.slice(0, 5).map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className={`${
                                    isDarkMode
                                      ? "border-purple-500/30 text-purple-300 hover:border-purple-500/50 hover:text-purple-200"
                                      : "border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-700"
                                  } transition-colors duration-200`}
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {user.seeking.length > 5 && (
                                <Badge
                                  variant="outline"
                                  className={`${
                                    isDarkMode
                                      ? "border-gray-600 text-gray-400"
                                      : "border-slate-300 text-slate-500"
                                  }`}
                                >
                                  +{user.seeking.length - 5} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`flex justify-between items-center pt-6 mt-6 border-t ${
                          isDarkMode ? "border-gray-700" : "border-slate-200"
                        }`}
                      >
                        <Button
                          variant="outline"
                          className={`${
                            isDarkMode
                              ? "border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/40"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                          } transition-all duration-200 bg-transparent`}
                        >
                          View Profile
                        </Button>
                        <Button
                          className={`${
                            isDarkMode
                              ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-cyan-500/25"
                              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/20"
                          } text-white font-medium shadow-md hover:shadow-lg transition-all duration-200`}
                        >
                          Request Exchange
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-16">
                  <div className={`${isDarkMode ? "text-gray-500" : "text-slate-500"} text-lg mb-4`}>
                    No professionals found matching your criteria
                  </div>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedLocation("Any location")
                      setSelectedSkill("Any skill")
                      setRatingFilter([0])
                    }}
                    variant="outline"
                    className={`${
                      isDarkMode
                        ? "border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/40"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    } transition-all duration-200`}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
