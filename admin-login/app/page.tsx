import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-16 w-16 text-primary" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Admin Portal</h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Secure administrative interface with FastAPI backend integration. Manage users, messages, and system
            operations with ease.
          </p>

          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Shield className="h-5 w-5" />
                Access Admin Panel
              </CardTitle>
              <CardDescription>Sign in with your administrator credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/login">
                <Button className="w-full" size="lg">
                  Go to Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
                <p className="text-gray-600 text-sm">View and manage system users</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Message System</h3>
                <p className="text-gray-600 text-sm">Handle system messages and communications</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">API Integration</h3>
                <p className="text-gray-600 text-sm">Full FastAPI backend integration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
