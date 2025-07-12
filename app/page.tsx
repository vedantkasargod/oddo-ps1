"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { StatsSection } from "@/components/stats-section"
import { useTheme } from "@/contexts/theme-context"
import {
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Play,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react"

function splitHeadline(title: string) {
  // Split at the last space for best effect
  const lastSpace = title.lastIndexOf(" ");
  if (lastSpace === -1) return [title, ""];
  return [title.slice(0, lastSpace), title.slice(lastSpace + 1)];
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate professional carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredUsers.length / 3))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const heroSlides = [
    {
      title: "Exchange skills with world-class professionals",
      subtitle: "Connect with verified experts to trade knowledge and accelerate learning",
      cta: "Start Free Trial",
    },
    {
      title: "Learn from industry leaders",
      subtitle: "Access exclusive knowledge from top professionals in your field",
      cta: "Discover Experts",
    },
    {
      title: "Teach and earn recognition",
      subtitle: "Share your expertise and build your professional reputation",
      cta: "Become a Mentor",
    },
  ]

  const featuredUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["React", "TypeScript"],
      seeking: ["Python", "AI/ML"],
      rating: 4.9,
      location: "San Francisco",
      availability: "Weekends",
      verified: true,
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Digital Marketing", "SEO"],
      seeking: ["Web Dev", "JavaScript"],
      rating: 4.8,
      location: "New York",
      availability: "Evenings",
      verified: true,
    },
    {
      id: 3,
      name: "Elena Kowalski",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Photography", "Design"],
      seeking: ["Branding", "UI/UX"],
      rating: 5.0,
      location: "Berlin",
      availability: "Flexible",
      verified: true,
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Data Science", "Python"],
      seeking: ["Machine Learning", "AI"],
      rating: 4.7,
      location: "Seoul",
      availability: "Mornings",
      verified: true,
    },
    {
      id: 5,
      name: "Amara Okafor",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Product Management", "Strategy"],
      seeking: ["Technical Writing", "Documentation"],
      rating: 4.9,
      location: "London",
      availability: "Weekdays",
      verified: true,
    },
    {
      id: 6,
      name: "Carlos Mendoza",
      avatar: "/placeholder.svg?height=40&width=40",
      skills: ["Blockchain", "Smart Contracts"],
      seeking: ["Frontend Development", "React"],
      rating: 4.6,
      location: "Barcelona",
      availability: "Evenings",
      verified: true,
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredUsers.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredUsers.length / 3)) % Math.ceil(featuredUsers.length / 3))
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900"
      } overflow-hidden relative`}
    >
      {/* Animated Background Effects */}
      <div className="fixed inset-0 opacity-20">
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
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
              isDarkMode ? "rgba(6, 182, 212, 0.05)" : "rgba(59, 130, 246, 0.08)"
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

      {/* Hero Section with Auto-Rotating Content */}
      <section className="relative pt-48 pb-32 px-0 lg:px-0 overflow-hidden min-h-[700px] flex items-center justify-center w-full">
        {/* Video Background */}
        <video
          src="/videos/Landing_page.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '100%', minWidth: '100%' }}
          autoPlay
          loop
          muted
          playsInline
          poster="/placeholder.jpg"
        >
          Sorry, your browser does not support embedded videos.
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`space-y-12 ${isLoaded ? "animate-in slide-in-from-bottom duration-1000" : "opacity-0"}`}>  
              {/* Auto-rotating hero content */}
              <div className="relative h-40 flex flex-col items-center justify-center mb-6">
                {heroSlides.map((slide: { title: string; subtitle: string; cta: string }, index: number) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 flex flex-col items-center justify-center ${
                      index === currentHeroSlide
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-4"
                    }`}
                  >
                    <h1
                      className={`text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] ${
                        isDarkMode
                          ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                          : "bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600"
                      }`}
                    >
                      {slide.title}
                    </h1>
                  </div>
                ))}
              </div>

              <p
                className={`text-xl leading-relaxed max-w-3xl mx-auto text-white/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] mb-8`}
              >
                {heroSlides[currentHeroSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center max-w-2xl mx-auto mb-8 items-center">
                <div className="relative flex-1 w-full">
                  <Input
                    type="email"
                    placeholder="Enter your work email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 w-full bg-white/20 backdrop-blur-md text-white placeholder-white/80 font-semibold border-none rounded-full shadow-xl px-6 focus:ring-2 focus:ring-cyan-400 transition-all duration-300 outline-none"
                    style={{ boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)' }}
                  />
                </div>
                <Button
                  className="h-14 px-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 hover:brightness-110 shadow-xl text-white font-bold text-lg transition-all duration-200"
                  style={{ boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)' }}
                >
                  {heroSlides[currentHeroSlide].cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Guarantee Row */}
              <div className="flex flex-col items-center mt-6">
                <div className="flex flex-row justify-center gap-8 bg-black/30 backdrop-blur-md rounded-xl px-6 py-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-lg font-medium text-white">Free 14-day trial</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-lg font-medium text-white">No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-lg font-medium text-white">Cancel anytime</span>
                  </div>
                </div>
              </div>

              {/* Hero slide indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentHeroSlide
                        ? "bg-cyan-500 w-8"
                        : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Professionals Carousel */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet our featured professionals</h2>
            <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"} text-lg`}>
              Connect with industry experts ready to share their knowledge
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(featuredUsers.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {featuredUsers.slice(slideIndex * 3, slideIndex * 3 + 3).map((user, index) => (
                        <Card
                          key={user.id}
                          className={`${
                            isDarkMode
                              ? "bg-gray-900/50 border-cyan-500/20 hover:bg-gray-900/70 hover:border-cyan-500/40"
                              : "bg-white border-slate-200 hover:shadow-xl"
                          } backdrop-blur-xl transition-all duration-500 group hover:scale-105 ${
                            isLoaded ? `animate-in slide-in-from-bottom duration-1000` : "opacity-0"
                          }`}
                          style={{
                            animationDelay: `${index * 200}ms`,
                            boxShadow: isDarkMode
                              ? "0 0 30px rgba(6, 182, 212, 0.1)"
                              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="relative">
                                <Avatar
                                  className={`w-14 h-14 ring-4 ${
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
                                    } text-white font-semibold`}
                                  >
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {user.verified && (
                                  <div
                                    className={`absolute -top-1 -right-1 w-5 h-5 ${
                                      isDarkMode ? "bg-green-400" : "bg-green-500"
                                    } rounded-full flex items-center justify-center`}
                                  >
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{user.name}</h3>
                                <div
                                  className={`flex items-center space-x-3 text-sm ${
                                    isDarkMode ? "text-gray-400" : "text-slate-500"
                                  }`}
                                >
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="font-medium">{user.rating}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{user.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <div
                                  className={`text-sm font-medium mb-2 ${
                                    isDarkMode ? "text-gray-300" : "text-slate-700"
                                  }`}
                                >
                                  Skills Offered
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {user.skills.map((skill, index) => (
                                    <Badge
                                      key={index}
                                      className={`${
                                        isDarkMode
                                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30"
                                          : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                                      } transition-colors duration-300`}
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div
                                  className={`text-sm font-medium mb-2 ${
                                    isDarkMode ? "text-gray-300" : "text-slate-700"
                                  }`}
                                >
                                  Skills Seeking
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {user.seeking.map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className={`${
                                        isDarkMode
                                          ? "border-purple-500/30 text-purple-300 hover:border-purple-500/50 hover:text-purple-200"
                                          : "border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-700"
                                      } transition-colors duration-300`}
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div
                              className={`flex items-center justify-between pt-6 mt-6 border-t ${
                                isDarkMode ? "border-gray-700" : "border-slate-200"
                              }`}
                            >
                              <div
                                className={`flex items-center space-x-1 text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-slate-500"
                                }`}
                              >
                                <Clock className="w-4 h-4" />
                                <span>{user.availability}</span>
                              </div>
                              <Button
                                className={`${
                                  isDarkMode
                                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-cyan-500/25"
                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/20"
                                } text-white font-medium shadow-md hover:shadow-lg transition-all duration-300`}
                              >
                                Connect
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 ${
                isDarkMode
                  ? "bg-gray-900/80 hover:bg-gray-800/80 text-cyan-400 border border-cyan-500/20"
                  : "bg-white hover:bg-gray-50 text-gray-900"
              } rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 ${
                isDarkMode
                  ? "bg-gray-900/80 hover:bg-gray-800/80 text-cyan-400 border border-cyan-500/20"
                  : "bg-white hover:bg-gray-50 text-gray-900"
              } rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: Math.ceil(featuredUsers.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? isDarkMode
                        ? "bg-cyan-500 w-8"
                        : "bg-blue-500 w-8"
                      : isDarkMode
                        ? "bg-gray-700"
                        : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-20 px-6 lg:px-8 ${
          isDarkMode
            ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
            : "bg-gradient-to-r from-blue-600 to-indigo-600"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-white"}`}>
            Ready to accelerate your professional growth?
          </h2>
          <p className={`text-xl mb-8 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-blue-100"}`}>
            Join thousands of professionals who are already expanding their expertise and building valuable connections
            through LevelUpX.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className={`${
                isDarkMode
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              } font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className={`${
                isDarkMode
                  ? "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/50"
                  : "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              } font-semibold px-8 py-3 text-lg transition-all duration-300 bg-transparent`}
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>
          <p className={`${isDarkMode ? "text-gray-400" : "text-blue-200"} text-sm mt-4`}>
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${
          isDarkMode ? "bg-gray-900/50 border-cyan-500/10" : "bg-white border-slate-200"
        } border-t py-12 px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src="/logo.png"
                alt="LevelUpX Logo"
                className="w-16 h-16 rounded-xl shadow-lg object-cover"
                style={{ background: isDarkMode ? undefined : undefined }}
              />
            </div>
            <div className={`${isDarkMode ? "text-gray-500" : "text-slate-500"} text-sm`}>
              © 2024 LevelUpX. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
