"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Settings, LogOut, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface User {
  id: number
  username: string
  name?: string
  email?: string
  is_banned?: boolean
  created_at?: string
}

interface Message {
  id: number
  content: string
  created_at?: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [adminUser, setAdminUser] = useState<string>("")

  const [newMessage, setNewMessage] = useState("")
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [sendMessageSuccess, setSendMessageSuccess] = useState("")
  const [sendMessageError, setSendMessageError] = useState("")

  const [swapStats, setSwapStats] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0,
    completed: 0,
    cancelled: 0,
  })
  const [isUpdatingUser, setIsUpdatingUser] = useState<number | null>(null)

  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem("adminAuth")
    if (!authData) {
      router.push("/login")
      return
    }

    const auth = JSON.parse(authData)
    if (!auth.authenticated || auth.role !== "admin") {
      router.push("/login")
      return
    }

    setAdminUser(auth.username)
    fetchData()
  }, [router])

  const fetchData = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Fetch users
      const usersResponse = await fetch("http://localhost:8000/api/v1/admin/users/", {
        method: "GET",
        headers: {
          "x-user-role": "admin",
        },
      })

      if (usersResponse.ok) {
        const usersData = await usersResponse.json()
        setUsers(Array.isArray(usersData) ? usersData : [])
      }

      // Fetch messages
      const messagesResponse = await fetch("http://localhost:8000/api/v1/admin/messages/", {
        method: "GET",
        headers: {
          "x-user-role": "admin",
        },
      })

      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json()
        setMessages(Array.isArray(messagesData) ? messagesData : [])
      }

      // Fetch swap statistics
      const swapStatsResponse = await fetch("http://localhost:8000/api/v1/admin/stats/swaps/", {
        method: "GET",
        headers: {
          "x-user-role": "admin",
        },
      })

      if (swapStatsResponse.ok) {
        const swapStatsData = await swapStatsResponse.json()
        setSwapStats({
          pending: swapStatsData.pending || 0,
          accepted: swapStatsData.accepted || 0,
          rejected: swapStatsData.rejected || 0,
          completed: swapStatsData.completed || 0,
          cancelled: swapStatsData.cancelled || 0,
        })
      }
    } catch (err) {
      setError("Failed to fetch data from backend. Please check if the server is running.")
      console.error("API Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/login")
  }

  const sendTestMessage = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/admin/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-role": "admin",
        },
        body: JSON.stringify({
          content: `Test message from admin dashboard - ${new Date().toLocaleString()}`,
        }),
      })

      if (response.ok) {
        fetchData() // Refresh data
      }
    } catch (err) {
      console.error("Failed to send message:", err)
    }
  }

  const sendPlatformMessage = async () => {
    if (!newMessage.trim()) {
      setSendMessageError("Please enter a message")
      return
    }

    setIsSendingMessage(true)
    setSendMessageError("")
    setSendMessageSuccess("")

    try {
      const response = await fetch("http://localhost:8000/api/v1/admin/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-role": "admin",
        },
        body: JSON.stringify({
          content: newMessage,
        }),
      })

      if (response.ok) {
        setSendMessageSuccess("Platform-wide message sent successfully!")
        setNewMessage("") // Clear the textbox
        fetchData() // Refresh the messages list

        // Clear success message after 3 seconds
        setTimeout(() => setSendMessageSuccess(""), 3000)
      } else {
        setSendMessageError("Failed to send message. Please try again.")
      }
    } catch (err) {
      setSendMessageError("Failed to send message. Please check your connection.")
      console.error("Failed to send platform message:", err)
    } finally {
      setIsSendingMessage(false)
    }
  }

  const handleBanUser = async (userId: number) => {
    setIsUpdatingUser(userId)
    try {
      const response = await fetch(`http://localhost:8000/api/v1/admin/users/${userId}/ban/`, {
        method: "PUT",
        headers: {
          "x-user-role": "admin",
        },
      })

      if (response.ok) {
        // Update the user in the local state
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, is_banned: true } : user)))
      } else {
        setError("Failed to ban user")
      }
    } catch (err) {
      setError("Failed to ban user")
      console.error("Ban user error:", err)
    } finally {
      setIsUpdatingUser(null)
    }
  }

  const handleUnbanUser = async (userId: number) => {
    setIsUpdatingUser(userId)
    try {
      const response = await fetch(`http://localhost:8000/api/v1/admin/users/${userId}/unban/`, {
        method: "PUT",
        headers: {
          "x-user-role": "admin",
        },
      })

      if (response.ok) {
        // Update the user in the local state
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, is_banned: false } : user)))
      } else {
        setError("Failed to unban user")
      }
    } catch (err) {
      setError("Failed to unban user")
      console.error("Unban user error:", err)
    } finally {
      setIsUpdatingUser(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Settings className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {adminUser}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Registered users in the system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messages.length}</div>
              <p className="text-xs text-muted-foreground">Messages in the system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Badge variant="default">Online</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Swap Request Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Swap Request Statistics</CardTitle>
            <CardDescription>Overview of all skill swap requests by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{swapStats.pending}</div>
                <p className="text-sm font-medium text-yellow-600">Pending</p>
                <p className="text-xs text-muted-foreground">Awaiting response</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{swapStats.accepted}</div>
                <p className="text-sm font-medium text-green-600">Accepted</p>
                <p className="text-xs text-muted-foreground">Ready to proceed</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">{swapStats.rejected}</div>
                <p className="text-sm font-medium text-red-600">Rejected</p>
                <p className="text-xs text-muted-foreground">Declined requests</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{swapStats.completed}</div>
                <p className="text-sm font-medium text-blue-600">Completed</p>
                <p className="text-xs text-muted-foreground">Successfully finished</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{swapStats.cancelled}</div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-xs text-muted-foreground">Cancelled by users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform-Wide Message Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Send Platform-Wide Message
            </CardTitle>
            <CardDescription>Send a message to all users on the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform-message">Message Content</Label>
              <textarea
                id="platform-message"
                className="w-full min-h-[100px] p-3 border border-input rounded-md resize-vertical focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Enter your platform-wide message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={isSendingMessage}
              />
            </div>

            {sendMessageSuccess && (
              <Alert>
                <AlertDescription className="text-green-600">{sendMessageSuccess}</AlertDescription>
              </Alert>
            )}

            {sendMessageError && (
              <Alert variant="destructive">
                <AlertDescription>{sendMessageError}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{newMessage.length} characters</p>
              <Button
                onClick={sendPlatformMessage}
                disabled={isSendingMessage || !newMessage.trim()}
                className="min-w-[100px]"
              >
                {isSendingMessage ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Tables */}
        <div className="grid grid-cols-1 gap-6">
          {/* Enhanced User Management Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage all users in the system - ban or unban users as needed</CardDescription>
            </CardHeader>
            <CardContent>
              {users.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.name || user.username || `User ${user.id}`}
                          </TableCell>
                          <TableCell>{user.email || "No email provided"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={user.is_banned ? "destructive" : "default"}
                              className={user.is_banned ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
                            >
                              {user.is_banned ? "Banned" : "Active"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {user.is_banned ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                                onClick={() => handleUnbanUser(user.id)}
                                disabled={isUpdatingUser === user.id}
                              >
                                {isUpdatingUser === user.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Unban"}
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                                onClick={() => handleBanUser(user.id)}
                                disabled={isUpdatingUser === user.id}
                              >
                                {isUpdatingUser === user.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ban"}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No users found</p>
              )}
            </CardContent>
          </Card>

          {/* Messages Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest messages in the system</CardDescription>
              </div>
              <Button onClick={sendTestMessage} size="sm">
                Send Test Message
              </Button>
            </CardHeader>
            <CardContent>
              {messages.length > 0 ? (
                <div className="space-y-2">
                  {messages.slice(0, 5).map((message) => (
                    <div key={message.id} className="p-2 border rounded">
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="text-xs">
                          ID: {message.id}
                        </Badge>
                        {message.created_at && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No messages found</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* API Testing Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>API Integration Status</CardTitle>
            <CardDescription>Backend connection and endpoint testing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Backend URL:</strong> http://localhost:8000
              </p>
              <p className="text-sm">
                <strong>API Documentation:</strong>
                <a
                  href="http://localhost:8000/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  http://localhost:8000/docs
                </a>
              </p>
              <p className="text-sm">
                <strong>Endpoints Used:</strong>
              </p>
              <ul className="text-sm text-muted-foreground ml-4 space-y-1">
                <li>• GET /api/v1/admin/users/ (with x-user-role: admin header)</li>
                <li>• GET /api/v1/admin/messages/ (with x-user-role: admin header)</li>
                <li>• POST /api/v1/admin/messages/ (with x-user-role: admin header)</li>
                <li>• GET /api/v1/admin/stats/swaps/ (with x-user-role: admin header)</li>
                <li>• PUT /api/v1/admin/users/{"{user_id}"}/ban/ (with x-user-role: admin header)</li>
                <li>• PUT /api/v1/admin/users/{"{user_id}"}/unban/ (with x-user-role: admin header)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
