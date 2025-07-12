"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Settings, LogOut, Loader2 } from "lucide-react"

interface User {
  id: number
  username: string
  email?: string
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

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest registered users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              {users.length > 0 ? (
                <div className="space-y-2">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{user.username}</p>
                        {user.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
                      </div>
                      <Badge variant="secondary">ID: {user.id}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No users found</p>
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
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
