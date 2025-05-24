"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {CheckCircle, Trash, Brain, Eye, Flag, Lock, Plus, Shield, User, XCircle} from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"

export default function AdminDashboard() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/all')
                if (!response.ok) {
                    throw new Error('Failed to fetch users')
                }
                const userData = await response.json()
                setUsers(userData)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    // Delete user function
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/user/delete/${userId}`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    // Remove user from state
                    setUsers(users.filter(user => user.id !== userId))
                } else {
                    alert('Failed to delete user')
                }
            } catch (err) {
                alert('Error deleting user: ' + err.message)
            }
        }
    }

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    // Get badge variant based on role
    const getRoleBadgeVariant = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return 'default'
            case 'journalist':
                return 'secondary'
            case 'client':
                return 'outline'
            default:
                return 'outline'
        }
    }

    // Mock data for pending articles
    const pendingArticles = [
        {
            id: "1",
            title: "Healthcare Reform Bill Faces Uncertain Future in Congress",
            author: "Sarah Johnson",
            category: "Health",
            submittedDate: "May 13, 2025",
        },
        {
            id: "2",
            title: "New Study Reveals Impact of Climate Change on Coastal Cities",
            author: "Michael Chen",
            category: "Environment",
            submittedDate: "May 14, 2025",
        },
        {
            id: "3",
            title: "Tech Industry Responds to New Privacy Regulations",
            author: "David Lee",
            category: "Technology",
            submittedDate: "May 15, 2025",
        },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage users, content</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                        <CardDescription className="text-2xl font-bold">{users.length}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Published Articles</CardTitle>
                        <CardDescription className="text-2xl font-bold">487</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Articles</CardTitle>
                        <CardDescription className="text-2xl font-bold">12</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Rejected Articles</CardTitle>
                        <CardDescription className="text-2xl font-bold">8</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <Tabs defaultValue="users" className="mb-8">
                <TabsList>
                    <TabsTrigger value="users">User Management</TabsTrigger>
                    <TabsTrigger value="content">Content Moderation</TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="mt-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Users</CardTitle>
                                <CardDescription>Manage user accounts</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {loading && (
                                <div className="text-center py-8">
                                    <p>Loading users...</p>
                                </div>
                            )}

                            {error && (
                                <div className="text-center py-8 text-red-500">
                                    <p>Error: {error}</p>
                                </div>
                            )}

                            {!loading && !error && (
                                <div className="space-y-4">
                                    {users.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarFallback>
                                                        {user.firstName?.charAt(0) || user.email?.charAt(0) || '?'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold">
                                                            {user.firstName && user.lastName
                                                                ? `${user.firstName} ${user.lastName}`
                                                                : user.email
                                                            }
                                                        </h3>
                                                        <Badge variant={getRoleBadgeVariant(user.role)}>
                                                            {user.role || 'User'}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                        <span>Joined: {formatDate(user.createdAt)}</span>
                                                    </div>
                                                    {user.bio && (
                                                        <p className="text-xs text-muted-foreground mt-1 max-w-md truncate">
                                                            {user.bio}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    <Trash className="h-4 w-4 mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    {users.length === 0 && (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <p>No users found</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="content" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Articles</CardTitle>
                                <CardDescription>Articles awaiting approval</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {pendingArticles.map((article) => (
                                        <div key={article.id} className="p-4 border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge variant="outline">{article.category}</Badge>
                                                <span className="text-sm text-muted-foreground">Submitted: {article.submittedDate}</span>
                                            </div>
                                            <h3 className="font-semibold mb-1">{article.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-3">By: {article.author}</p>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/article/preview/${article.id}`}>
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Preview
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Brain className="h-4 w-4 mr-1" />
                                                    Analyse with Ai
                                                </Button>
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                    <CheckCircle className="h-4 w-4 mr-1" />
                                                    Approve
                                                </Button>
                                                <Button variant="destructive" size="sm">
                                                    <XCircle className="h-4 w-4 mr-1" />
                                                    Reject
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}