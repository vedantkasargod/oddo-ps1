 "use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/contexts/theme-context"
import Link from "next/link"
import {
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
  Zap,
  Github,
  Mail,
  Lock,
  User,
  MapPin,
  Briefcase,
  Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { getApiBaseUrl } from "@/lib/api";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    profession: "",
    skills: [] as string[],
    seeking: [] as string[],
    agreeToTerms: false,
    agreeToMarketing: false,
  })
  const [currentStep, setCurrentStep] = useState(1)
  const { isDarkMode } = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const availableSkills = [
    "React", "TypeScript", "Python", "JavaScript", "Node.js", "UI/UX Design",
    "Digital Marketing", "SEO", "Data Science", "Machine Learning", "Photography",
    "Graphic Design", "Product Management", "Blockchain", "DevOps", "Mobile Development"
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSkillToggle = (skill: string, type: 'skills' | 'seeking') => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(skill)
        ? prev[type].filter(s => s !== skill)
        : [...prev[type], skill]
    }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          location: formData.location,
          profession: formData.profession,
          skills: formData.skills,
          seeking: formData.seeking,
          agreeToTerms: formData.agreeToTerms,
          agreeToMarketing: formData.agreeToMarketing,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess("Account created! Redirecting to login...")
        setTimeout(() => router.push("/login"), 1500)
      } else {
        setError(data.error || "Signup failed")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
  const isStep2Valid = formData.location && formData.profession
  const isStep3Valid = formData.skills.length > 0 && formData.seeking.length > 0 && formData.agreeToTerms

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
              <span className="text-2xl font-bold">LevelUpX</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
              Join thousands of professionals exchanging skills and knowledge
            </p>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step <= currentStep
                        ? isDarkMode
                          ? "bg-cyan-500 text-white"
                          : "bg-blue-600 text-white"
                        : isDarkMode
                          ? "bg-gray-700 text-gray-400"
                          : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${
                        step < currentStep
                          ? isDarkMode
                            ? "bg-cyan-500"
                            : "bg-blue-600"
                          : isDarkMode
                            ? "bg-gray-700"
                            : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
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
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            First Name
                          </Label>
                          <div className="relative mt-1">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              id="firstName"
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              className={`pl-10 ${
                                isDarkMode
                                  ? "bg-gray-800 border-cyan-500/20 text-white placeholder-gray-500"
                                  : "bg-white border-slate-300"
                              }`}
                              placeholder="John"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium">
                            Last Name
                          </Label>
                          <div className="relative mt-1">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              id="lastName"
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                              className={`pl-10 ${
                                isDarkMode
                                  ? "bg-gray-800 border-cyan-500/20 text-white placeholder-gray-500"
                                  : "bg-white border-slate-300"
                              }`}
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={`pl-10 ${
                              isDarkMode
                                ? "bg-gray-800 border-cyan-500/20 text-white placeholder-gray-500"
                                : "bg-white border-slate-300"
                            }`}
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="password" className="text-sm font-medium">
                          Password
                        </Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className={`pl-10 pr-10 ${
                              isDarkMode
                                ? "bg-gray-800 border-cyan-500/20 text-white placeholder-gray-500"
                                : "bg-white border-slate-300"
                            }`}
                            placeholder="Create a strong password"
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

                      <div>
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirm Password
                        </Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className={`pl-10 pr-10 ${
                              isDarkMode
                                ? "bg-gray-800 border-cyan-500/20 text-white placeholder-gray-500"
                                : "bg-white border-slate-300"
                            }`}
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">Passwords don't match</p>
                        )}
                      </div>
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      {success && <p className="text-green-500 text-sm">{success}</p>}
                    </div>
                  )}

                  {/* Step 2: Professional Information */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="location" className="text-sm font-medium">
                          Location
                        </Label>
                        <div className="relative mt-1">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="location"
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            className={`pl-10 ${
                              isDarkMode
                                ? "bg-gray-800 border-cyan-500/20 text-white placeholder-gray-500"
                                : "bg-white border-slate-300"
                            }`}
                            placeholder="City, Country"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="profession" className="text-sm font-medium">
                          Profession
                        </Label>
                        <div className="relative mt-1">
                          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="profession"
                            type="text"
                            value={formData.profession}
                            onChange={(e) => handleInputChange("profession", e.target.value)}
                            className={`pl-10 ${
                              isDarkMode
                                ? "bg-gray-800 border-cyan-500/20 text-white placeholder-gray-500"
                                : "bg-white border-slate-300"
                            }`}
                            placeholder="e.g., Software Engineer, Designer"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Skills and Preferences */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium">Skills You Can Teach</Label>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"} mb-3`}>
                          Select the skills you're confident teaching to others
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {availableSkills.map((skill) => (
                            <Badge
                              key={skill}
                              variant={formData.skills.includes(skill) ? "default" : "outline"}
                              className={`cursor-pointer transition-all duration-300 ${
                                formData.skills.includes(skill)
                                  ? isDarkMode
                                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                                    : "bg-blue-50 text-blue-700 border-blue-200"
                                  : isDarkMode
                                    ? "border-gray-600 text-gray-400 hover:border-cyan-500/50"
                                    : "border-slate-300 text-slate-600 hover:border-slate-400"
                              }`}
                              onClick={() => handleSkillToggle(skill, 'skills')}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Skills You Want to Learn</Label>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"} mb-3`}>
                          Select the skills you'd like to learn from others
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {availableSkills.map((skill) => (
                            <Badge
                              key={skill}
                              variant={formData.seeking.includes(skill) ? "default" : "outline"}
                              className={`cursor-pointer transition-all duration-300 ${
                                formData.seeking.includes(skill)
                                  ? isDarkMode
                                    ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                    : "bg-purple-50 text-purple-700 border-purple-200"
                                  : isDarkMode
                                    ? "border-gray-600 text-gray-400 hover:border-purple-500/50"
                                    : "border-slate-300 text-slate-600 hover:border-slate-400"
                              }`}
                              onClick={() => handleSkillToggle(skill, 'seeking')}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                          />
                          <Label htmlFor="terms" className="text-sm">
                            I agree to the{" "}
                            <Link href="/terms" className="text-blue-500 hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-blue-500 hover:underline">
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="marketing"
                            checked={formData.agreeToMarketing}
                            onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked)}
                          />
                          <Label htmlFor="marketing" className="text-sm">
                            I'd like to receive updates about new features and opportunities
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className={`${
                          isDarkMode
                            ? "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                            : "border-slate-300 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Back
                      </Button>
                    )}
                    <div className="flex-1" />
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={
                          (currentStep === 1 && !isStep1Valid) ||
                          (currentStep === 2 && !isStep2Valid)
                        }
                        className={`${
                          isDarkMode
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        } text-white`}
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={!isStep3Valid || loading}
                        className={`${
                          isDarkMode
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        } text-white`}
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                        <Sparkles className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </form>

                <div className="mt-6">
                  <p className={`text-center text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                    Complete the form above to create your account
                  </p>
                </div>

                <p className={`text-center text-sm mt-6 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500 hover:underline font-medium">
                    Sign in
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
                <h2 className="text-3xl font-bold mb-4">Join the LevelUpX community</h2>
                <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                  Connect with professionals worldwide and accelerate your learning journey
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode ? "bg-cyan-500/20" : "bg-blue-100"
                    } rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Sparkles className={`w-6 h-6 ${isDarkMode ? "text-cyan-400" : "text-blue-600"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Learn from Experts</h3>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                      Access knowledge from verified professionals in your field
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode ? "bg-purple-500/20" : "bg-purple-100"
                    } rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Zap className={`w-6 h-6 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Share Your Expertise</h3>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                      Teach others and build your professional reputation
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode ? "bg-green-500/20" : "bg-green-100"
                    } rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <CheckCircle className={`w-6 h-6 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Verified Community</h3>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                      Connect with trusted professionals in a safe environment
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
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Sarah Chen</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                      React Developer
                    </p>
                  </div>
                </div>
                <p className={`italic ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                  "LevelUpX helped me learn TypeScript from an expert while teaching React to others. It's a win-win!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 