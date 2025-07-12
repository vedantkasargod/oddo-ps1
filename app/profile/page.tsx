"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Plus, X, Zap, Save, Eye, EyeOff, Upload, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/contexts/theme-context"
import { Navigation } from "@/components/navigation"
import { getApiBaseUrl } from "@/lib/api";
import { AuthGuard } from "@/components/auth-guard"

export default function ProfilePage() {
  const [isPublic, setIsPublic] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const { isDarkMode, toggleTheme } = useTheme()
  
  const [profileData, setProfileData] = useState({
    name: "",
    location: "",
    bio: "",
    avatar: "/placeholder.svg?height=120&width=120",
  })

  const [skillsOffered, setSkillsOffered] = useState<{ name: string; proficiency: number }[]>([])
  const [skillsSeeking, setSkillsSeeking] = useState<string[]>([])
  const [availability, setAvailability] = useState("Weekends")
  const [newSkillOffered, setNewSkillOffered] = useState("")
  const [newSkillSeeking, setNewSkillSeeking] = useState("")

  useEffect(() => {
    setIsLoaded(true)
    
    // Get user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        
        // Initialize profile data with user data
        setProfileData({
          name: `${parsedUser.firstName} ${parsedUser.lastName}`,
          location: parsedUser.location || "",
          bio: "", // We'll add bio field to database later
          avatar: "/placeholder.svg?height=120&width=120",
        })
        
        // Initialize skills with user data
        if (parsedUser.skills && Array.isArray(parsedUser.skills)) {
          setSkillsOffered(parsedUser.skills.map((skill: string) => ({ name: skill, proficiency: 3 })))
        }
        
        if (parsedUser.seeking && Array.isArray(parsedUser.seeking)) {
          setSkillsSeeking(parsedUser.seeking)
        }
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

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      setSkillsOffered([...skillsOffered, { name: newSkillOffered.trim(), proficiency: 3 }])
      setNewSkillOffered("")
    }
  }

  const addSkillSeeking = () => {
    if (newSkillSeeking.trim()) {
      setSkillsSeeking([...skillsSeeking, newSkillSeeking.trim()])
      setNewSkillSeeking("")
    }
  }

  const removeSkillOffered = (index: number) => {
    setSkillsOffered(skillsOffered.filter((_, i) => i !== index))
  }

  const removeSkillSeeking = (index: number) => {
    setSkillsSeeking(skillsSeeking.filter((_, i) => i !== index))
  }

  const updateSkillProficiency = (index: number, proficiency: number) => {
    const updated = [...skillsOffered]
    updated[index].proficiency = proficiency
    setSkillsOffered(updated)
  }

  const getProficiencyLabel = (level: number) => {
    const labels = ["Beginner", "Novice", "Intermediate", "Advanced", "Expert"]
    return labels[level - 1] || "Beginner"
  }

  const handleSaveProfile = async () => {
    if (!user) return
    
    setLoading(true)
    setSuccess("")
    
    try {
      const updatedData = {
        firstName: profileData.name.split(" ")[0] || user.firstName,
        lastName: profileData.name.split(" ").slice(1).join(" ") || user.lastName,
        location: profileData.location,
        profession: user.profession,
        skills: skillsOffered.map(skill => skill.name),
        seeking: skillsSeeking,
        agreeToTerms: user.agreeToTerms,
        agreeToMarketing: user.agreeToMarketing,
      }
      
      const response = await fetch(`${getApiBaseUrl()}/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })
      
      if (response.ok) {
        setSuccess("Profile updated successfully!")
        
        // Update localStorage with new user data
        const updatedUser = { ...user, ...updatedData }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser)
        
        setTimeout(() => setSuccess(""), 3000)
      } else {
        console.error("Failed to update profile")
      }
    } catch (err) {
      console.error("Error updating profile:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div
        className={`min-h-screen transition-all duration-500 ${
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

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-8">
          {/* Header */}
          <div className={`mb-12 ${isLoaded ? "animate-in slide-in-from-top duration-1000" : "opacity-0"}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Profile Management</h1>
            <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"} text-lg`}>
              Customize your professional profile and skill preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList
              className={`grid w-full grid-cols-3 ${
                isDarkMode ? "bg-gray-900/50 border-cyan-500/20" : "bg-slate-100 border-slate-200"
              } border`}
            >
              <TabsTrigger
                value="profile"
                className={`${
                  isDarkMode
                    ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                Profile Info
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className={`${
                  isDarkMode
                    ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className={`${
                  isDarkMode
                    ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    : "data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                }`}
              >
                Privacy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card
                className={`${
                  isDarkMode
                    ? "bg-gray-900/50 border-cyan-500/20 backdrop-blur-xl"
                    : "bg-white border-slate-200 shadow-lg"
                }`}
              >
                <CardHeader>
                  <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Basic Information</CardTitle>
                  <CardDescription className={isDarkMode ? "text-gray-400" : "text-slate-600"}>
                    Update your personal details and profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Upload */}
                  <div className="flex items-center space-x-6">
                    <div className="relative group">
                      <Avatar
                        className={`w-24 h-24 ring-4 ${
                          isDarkMode
                            ? "ring-cyan-500/20 group-hover:ring-cyan-500/40"
                            : "ring-blue-100 group-hover:ring-blue-200"
                        } transition-all duration-300`}
                      >
                        <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                        <AvatarFallback
                          className={`${
                            isDarkMode
                              ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                              : "bg-gradient-to-r from-blue-500 to-purple-500"
                          } text-white text-2xl`}
                        >
                          {profileData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute inset-0 ${
                          isDarkMode ? "bg-black/50" : "bg-white/50"
                        } rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
                      >
                        <Camera className="w-6 h-6" />
                      </div>
                      <div
                        className={`absolute -bottom-2 -right-2 w-8 h-8 ${
                          isDarkMode ? "bg-green-400" : "bg-green-500"
                        } rounded-full flex items-center justify-center`}
                      >
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <Button
                        className={`${
                          isDarkMode
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-cyan-500/25"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/20"
                        } text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"} mt-2`}>
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`text-sm font-medium mb-2 block ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                      >
                        Full Name
                      </label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className={`${
                          isDarkMode
                            ? "bg-gray-800/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                            : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                        } transition-all duration-300`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium mb-2 block ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                      >
                        Location
                      </label>
                      <Input
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        placeholder="City, Country"
                        className={`${
                          isDarkMode
                            ? "bg-gray-800/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                            : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                        } transition-all duration-300`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium mb-2 block ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                    >
                      Bio
                    </label>
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell others about your expertise and interests..."
                      rows={4}
                      className={`${
                        isDarkMode
                          ? "bg-gray-800/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                      } transition-all duration-300`}
                    />
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium mb-2 block ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}
                    >
                      Availability
                    </label>
                    <Select value={availability} onValueChange={setAvailability}>
                      <SelectTrigger
                        className={`${
                          isDarkMode
                            ? "bg-gray-800/50 border-cyan-500/20 text-white"
                            : "bg-white border-slate-300 text-slate-900"
                        }`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        className={`${isDarkMode ? "bg-gray-900 border-cyan-500/20" : "bg-white border-slate-200"}`}
                      >
                        <SelectItem value="Weekends">Weekends</SelectItem>
                        <SelectItem value="Weekdays">Weekdays</SelectItem>
                        <SelectItem value="Evenings">Evenings</SelectItem>
                        <SelectItem value="Mornings">Mornings</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              {/* Skills Offered */}
              <Card
                className={`${
                  isDarkMode
                    ? "bg-gray-900/50 border-cyan-500/20 backdrop-blur-xl"
                    : "bg-white border-slate-200 shadow-lg"
                }`}
              >
                <CardHeader>
                  <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Skills You Offer</CardTitle>
                  <CardDescription className={isDarkMode ? "text-gray-400" : "text-slate-600"}>
                    Add skills you can teach or share with others
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-2">
                    <Input
                      value={newSkillOffered}
                      onChange={(e) => setNewSkillOffered(e.target.value)}
                      placeholder="Enter a skill you can offer..."
                      className={`${
                        isDarkMode
                          ? "bg-gray-800/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                      } transition-all duration-300`}
                      onKeyPress={(e) => e.key === "Enter" && addSkillOffered()}
                    />
                    <Button
                      onClick={addSkillOffered}
                      className={`${
                        isDarkMode
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      } text-white transition-all duration-300`}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {skillsOffered.map((skill, index) => (
                      <div
                        key={index}
                        className={`${
                          isDarkMode ? "bg-gray-800/50 border-cyan-500/10" : "bg-slate-50 border-slate-200"
                        } border rounded-lg p-4 space-y-3`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`${isDarkMode ? "text-white" : "text-gray-900"} font-medium`}>
                            {skill.name}
                          </span>
                          <Button
                            onClick={() => removeSkillOffered(index)}
                            variant="ghost"
                            size="sm"
                            className={`${
                              isDarkMode
                                ? "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                            } transition-all duration-300`}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                              Proficiency Level
                            </span>
                            <span className={`text-sm ${isDarkMode ? "text-cyan-400" : "text-blue-600"} font-medium`}>
                              {getProficiencyLabel(skill.proficiency)}
                            </span>
                          </div>
                          <Slider
                            value={[skill.proficiency]}
                            onValueChange={(value) => updateSkillProficiency(index, value[0])}
                            max={5}
                            min={1}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills Seeking */}
              <Card
                className={`${
                  isDarkMode
                    ? "bg-gray-900/50 border-cyan-500/20 backdrop-blur-xl"
                    : "bg-white border-slate-200 shadow-lg"
                }`}
              >
                <CardHeader>
                  <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Skills You're Seeking</CardTitle>
                  <CardDescription className={isDarkMode ? "text-gray-400" : "text-slate-600"}>
                    Add skills you want to learn from others
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-2">
                    <Input
                      value={newSkillSeeking}
                      onChange={(e) => setNewSkillSeeking(e.target.value)}
                      placeholder="Enter a skill you want to learn..."
                      className={`${
                        isDarkMode
                          ? "bg-gray-800/50 border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                      } transition-all duration-300`}
                      onKeyPress={(e) => e.key === "Enter" && addSkillSeeking()}
                    />
                    <Button
                      onClick={addSkillSeeking}
                      className={`${
                        isDarkMode
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      } text-white transition-all duration-300`}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillsSeeking.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`${
                          isDarkMode
                            ? "border-purple-500/30 text-purple-300 hover:border-purple-500/50 hover:text-purple-200"
                            : "border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-700"
                        } transition-all duration-300 group`}
                      >
                        {skill}
                        <Button
                          onClick={() => removeSkillSeeking(index)}
                          variant="ghost"
                          size="sm"
                          className="ml-2 p-0 h-auto text-gray-400 hover:text-red-400 group-hover:text-red-400 transition-all duration-300"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card
                className={`${
                  isDarkMode
                    ? "bg-gray-900/50 border-cyan-500/20 backdrop-blur-xl"
                    : "bg-white border-slate-200 shadow-lg"
                }`}
              >
                <CardHeader>
                  <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Privacy Settings</CardTitle>
                  <CardDescription className={isDarkMode ? "text-gray-400" : "text-slate-600"}>
                    Control who can see your profile and contact you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div
                    className={`flex items-center justify-between p-4 ${
                      isDarkMode ? "bg-gray-800/50 border-cyan-500/10" : "bg-slate-50 border-slate-200"
                    } border rounded-lg`}
                  >
                    <div className="flex items-center space-x-3">
                      {isPublic ? (
                        <Eye className={`w-5 h-5 ${isDarkMode ? "text-cyan-400" : "text-blue-600"}`} />
                      ) : (
                        <EyeOff className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                      )}
                      <div>
                        <div className={`${isDarkMode ? "text-white" : "text-gray-900"} font-medium`}>Public Profile</div>
                        <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                          {isPublic
                            ? "Your profile is visible to all LevelUpX users and can appear in search results"
                            : "Your profile is private and only visible to users you've connected with"}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                      className={`${
                        isDarkMode
                          ? "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-500"
                          : "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
                      }`}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className={`${isDarkMode ? "text-white" : "text-gray-900"} font-medium`}>Profile Visibility</h3>
                    <div className={`space-y-3 text-sm ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                      <div className="flex items-center justify-between">
                        <span>Show location</span>
                        <Switch
                          defaultChecked
                          className={`${
                            isDarkMode
                              ? "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-500"
                              : "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
                          }`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Show availability</span>
                        <Switch
                          defaultChecked
                          className={`${
                            isDarkMode
                              ? "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-500"
                              : "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
                          }`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Show completed swaps count</span>
                        <Switch
                          defaultChecked
                          className={`${
                            isDarkMode
                              ? "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-500"
                              : "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
                          }`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Show response time</span>
                        <Switch
                          defaultChecked
                          className={`${
                            isDarkMode
                              ? "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-purple-500"
                              : "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end items-center space-x-4">
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}
            <Button
              onClick={handleSaveProfile}
              disabled={loading}
              className={`${
                isDarkMode
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-cyan-500/25"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/20"
              } text-white px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
