"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Activity,
  AlertTriangle,
  BarChart3,
  Search,
  Ban,
  Eye,
  MessageSquare,
  Download,
  Shield,
  Zap,
  TrendingUp,
  UserCheck,
  Flag,
} from "lucide-react"

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [banReason, setBanReason] = useState("")

  const stats = {
    totalUsers: 10247,
    activeSwaps: 1834,
    pendingReports: 12,
    completedSwaps: 25683,
    avgRating: 4.7,
    newUsersToday: 47,
  }

  const users = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-15",
      completedSwaps: 23,
      rating: 4.9,
      status: "active",
      lastActive: "2 hours ago",
      reports: 0,
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      email: "marcus.r@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-10",
      completedSwaps: 18,
      rating: 4.8,
      status: "active",
      lastActive: "1 day ago",
      reports: 1,
    },
    {
      id: 3,
      name: "Suspicious User",
      email: "fake@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-20",
      completedSwaps: 0,
      rating: 2.1,
      status: "flagged",
      lastActive: "5 days ago",
      reports: 5,
    },
  ]

  const reports = [
    {
      id: 1,
      reporter: "Elena Kowalski",
      reported: "John Doe",
      reason: "Inappropriate behavior during swap session",
      timestamp: "2 hours ago",
      status: "pending",
      severity: "high",
    },
    {
      id: 2,
      reporter: "David Kim",
      reported: "Jane Smith",
      reason: "No-show for scheduled sessions",
      timestamp: "1 day ago",
      status: "pending",
      severity: "medium",
    },
  ]

  const swaps = [
    {
      id: 1,
      user1: "Sarah Chen",
      user2: "Marcus Rodriguez",
      skill1: "React Development",
      skill2: "Digital Marketing",
      status: "active",
      startDate: "2024-01-15",
      progress: 60,
    },
    {
      id: 2,
      user1: "Elena Kowalski",
      user2: "David Kim",
      skill1: "Photography",
      skill2: "Data Science",
      status: "completed",
      startDate: "2024-01-01",
      completedDate: "2024-01-20",
    },
  ]

  const handleBanUser = (userId: number) => {
    console.log("Banning user:", userId, "Reason:", banReason)
    setBanReason("")
  }

  const handleResolveReport = (reportId: number, action: string) => {
    console.log("Resolving report:", reportId, "Action:", action)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="LevelUpX Logo"
                className="w-14 h-14 rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                <Shield className="w-3 h-3 mr-1" />
                Admin Access
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-slate-300 text-lg">Monitor platform activity and manage users</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Total Users</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.activeSwaps.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Active Swaps</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.pendingReports}</div>
                  <div className="text-sm text-slate-400">Pending Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.completedSwaps.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Completed Swaps</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.avgRating}</div>
                  <div className="text-sm text-slate-400">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.newUsersToday}</div>
                  <div className="text-sm text-slate-400">New Today</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Reports ({reports.length})
            </TabsTrigger>
            <TabsTrigger
              value="swaps"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Swap Monitoring
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription className="text-slate-400">Search, view, and manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12 ring-2 ring-cyan-500/20">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-white font-semibold">{user.name}</h3>
                              <Badge
                                className={
                                  user.status === "active"
                                    ? "bg-green-500/20 text-green-300 border-green-500/30"
                                    : user.status === "flagged"
                                      ? "bg-red-500/20 text-red-300 border-red-500/30"
                                      : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                                }
                              >
                                {user.status}
                              </Badge>
                              {user.reports > 0 && (
                                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                                  <Flag className="w-3 h-3 mr-1" />
                                  {user.reports} reports
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-slate-400">
                              {user.email} • Joined {user.joinDate} • {user.completedSwaps} swaps • Rating:{" "}
                              {user.rating}
                            </div>
                            <div className="text-sm text-slate-500">Last active: {user.lastActive}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          {user.status !== "banned" && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                                >
                                  <Ban className="w-4 h-4 mr-2" />
                                  Ban
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-slate-800 border-slate-700 text-white">
                                <DialogHeader>
                                  <DialogTitle>Ban User</DialogTitle>
                                  <DialogDescription className="text-slate-400">
                                    Are you sure you want to ban {user.name}? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                                      Reason for ban
                                    </label>
                                    <Textarea
                                      value={banReason}
                                      onChange={(e) => setBanReason(e.target.value)}
                                      placeholder="Enter the reason for banning this user..."
                                      rows={3}
                                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-3">
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-300 bg-transparent"
                                      >
                                        Cancel
                                      </Button>
                                    </DialogTrigger>
                                    <Button
                                      onClick={() => handleBanUser(user.id)}
                                      className="bg-red-600 hover:bg-red-700 text-white border-0 transition-all duration-300"
                                    >
                                      Ban User
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Content Moderation</CardTitle>
                <CardDescription className="text-slate-400">Review and resolve user reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge
                              className={
                                report.severity === "high"
                                  ? "bg-red-500/20 text-red-300 border-red-500/30"
                                  : report.severity === "medium"
                                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                    : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                              }
                            >
                              {report.severity} priority
                            </Badge>
                            <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30">
                              {report.status}
                            </Badge>
                            <span className="text-sm text-slate-400">{report.timestamp}</span>
                          </div>
                          <div className="text-white font-medium mb-1">
                            {report.reporter} reported {report.reported}
                          </div>
                          <div className="text-slate-300 mb-3">{report.reason}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => handleResolveReport(report.id, "dismiss")}
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-300"
                          >
                            Dismiss
                          </Button>
                          <Button
                            onClick={() => handleResolveReport(report.id, "warn")}
                            size="sm"
                            className="bg-yellow-600 hover:bg-yellow-700 text-white border-0 transition-all duration-300"
                          >
                            Warn User
                          </Button>
                          <Button
                            onClick={() => handleResolveReport(report.id, "ban")}
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white border-0 transition-all duration-300"
                          >
                            Ban User
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Swap Monitoring */}
          <TabsContent value="swaps" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Swap Monitoring</CardTitle>
                <CardDescription className="text-slate-400">
                  Monitor all skill exchanges on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {swaps.map((swap) => (
                    <div
                      key={swap.id}
                      className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-white font-medium">{swap.user1}</span>
                            <span className="text-slate-400">↔</span>
                            <span className="text-white font-medium">{swap.user2}</span>
                            <Badge
                              className={
                                swap.status === "active"
                                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                                  : swap.status === "completed"
                                    ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                    : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                              }
                            >
                              {swap.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-400">
                            {swap.skill1} ↔ {swap.skill2}
                          </div>
                          <div className="text-sm text-slate-500">
                            Started: {swap.startDate}
                            {swap.completedDate && ` • Completed: ${swap.completedDate}`}
                            {swap.progress && ` • Progress: ${swap.progress}%`}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Contact Users
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Platform Analytics</CardTitle>
                <CardDescription className="text-slate-400">
                  Download comprehensive reports and view platform statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Available Reports</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <div className="text-white font-medium">User Activity Report</div>
                          <div className="text-sm text-slate-400">
                            Login patterns, swap initiations, completion rates
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 transition-all duration-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          CSV
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <div className="text-white font-medium">Feedback & Ratings</div>
                          <div className="text-sm text-slate-400">
                            User ratings, feedback analysis, satisfaction metrics
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 transition-all duration-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div>
                          <div className="text-white font-medium">Swap Statistics</div>
                          <div className="text-sm text-slate-400">
                            Popular skill pairs, success rates, duration analysis
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 transition-all duration-300"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-700/30 rounded-lg">
                        <div className="text-sm text-slate-400">Most Popular Skill (Offered)</div>
                        <div className="text-white font-medium">React Development</div>
                      </div>
                      <div className="p-3 bg-slate-700/30 rounded-lg">
                        <div className="text-sm text-slate-400">Most Requested Skill</div>
                        <div className="text-white font-medium">Python Programming</div>
                      </div>
                      <div className="p-3 bg-slate-700/30 rounded-lg">
                        <div className="text-sm text-slate-400">Average Swap Duration</div>
                        <div className="text-white font-medium">3.2 weeks</div>
                      </div>
                      <div className="p-3 bg-slate-700/30 rounded-lg">
                        <div className="text-sm text-slate-400">Success Rate</div>
                        <div className="text-white font-medium">87.3%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
