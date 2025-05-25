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
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
    const router = useRouter()
    const [users, setUsers] = useState([])
    const [pendingArticles, setPendingArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [articlesLoading, setArticlesLoading] = useState(true)
    const [error, setError] = useState(null)
    const [articlesError, setArticlesError] = useState(null)
    const [authChecking, setAuthChecking] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    // Check if user is admin on component mount
    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                // get current user
                const userResponse = await fetch('http://localhost:8080/api/user/me', {
                    credentials: 'include' // Include cookies
                })

                if (!userResponse.ok) {
                    router.push('/')
                    return
                }

                const userData = await userResponse.json()
                setCurrentUser(userData)

                // Check if user is admin
                const adminResponse = await fetch(`http://localhost:8080/api/user/is-admin/${userData.id}`, {
                    credentials: 'include'
                })

                if (adminResponse.ok) {
                    const adminStatus = await adminResponse.json()
                    setIsAdmin(adminStatus)

                    if (!adminStatus) {
                        router.push('/')
                        return
                    }
                } else {
                    router.push('/')
                    return
                }
            } catch (err) {
                console.error('Error checking admin status:', err)
                router.push('/')
                return
            } finally {
                setAuthChecking(false)
            }
        }

        checkAdminStatus()
    }, [router])

    useEffect(() => {
        // Only fetch users if user is confirmed admin
        if (!authChecking && isAdmin) {
            const fetchUsers = async () => {
                try {
                    const response = await fetch('http://localhost:8080/api/user/non-admins', {
                        credentials: 'include'
                    })
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
        }
    }, [authChecking, isAdmin])

    useEffect(() => {
        // Only fetch articles if user is confirmed admin
        if (!authChecking && isAdmin) {
            const fetchPendingArticles = async () => {
                try {
                    const response = await fetch('http://localhost:8080/api/articles/pending')
                    if (!response.ok) {
                        throw new Error('Failed to fetch pending articles')
                    }
                    const articlesData = await response.json()
                    setPendingArticles(articlesData)
                } catch (err) {
                    setArticlesError(err.message)
                } finally {
                    setArticlesLoading(false)
                }
            }

            fetchPendingArticles()
        }
    }, [authChecking, isAdmin])

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/user/delete/${userId}`, {
                    method: 'DELETE',
                    credentials: 'include'
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

    const handleApproveArticle = async (articleId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/articles/${articleId}/publish`, {
                method: 'POST'
            })
            if (response.ok) {
                // Remove article from pending list
                setPendingArticles(pendingArticles.filter(article => article.id !== articleId))
                alert('Article approved successfully!')
            } else {
                alert('Failed to approve article')
            }
        } catch (err) {
            alert('Error approving article: ' + err.message)
        }
    }

    const handleRejectArticle = async (articleId) => {
        if (window.confirm('Are you sure you want to reject this article?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/articles/${articleId}/refuse`, {
                    method: 'POST'
                })
                if (response.ok) {
                    // Remove article from pending list
                    setPendingArticles(pendingArticles.filter(article => article.id !== articleId))
                    alert('Article rejected successfully!')
                } else {
                    alert('Failed to reject article')
                }
            } catch (err) {
                alert('Error rejecting article: ' + err.message)
            }
        }
    }

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

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

    // Get theme display name and badge variant
    const getThemeInfo = (theme) => {
        const themeMap = {
            'TECHNOLOGY': { name: 'Technology', variant: 'default' },
            'HEALTH': { name: 'Health', variant: 'secondary' },
            'ENVIRONMENT': { name: 'Environment', variant: 'outline' },
            'POLITICS': { name: 'Politics', variant: 'destructive' },
            'BUSINESS': { name: 'Business', variant: 'secondary' },
            'SPORTS': { name: 'Sports', variant: 'outline' }
        }
        return themeMap[theme] || { name: theme, variant: 'outline' }
    }

    // Show loading while checking authentication
    if (authChecking) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Checking permissions...</p>
                    </div>
                </div>
            </div>
        )
    }

    // This component will only render if the user is an admin
    // Non-admin users will be redirected before reaching this point
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                        Manage users, content
                        {currentUser && (
                            <span className="ml-2">
                                • Welcome, {currentUser.firstName} {currentUser.lastName}
                            </span>
                        )}
                    </p>
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
                        <CardDescription className="text-2xl font-bold">{pendingArticles.length}</CardDescription>
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
                                {articlesLoading && (
                                    <div className="text-center py-8">
                                        <p>Loading pending articles...</p>
                                    </div>
                                )}

                                {articlesError && (
                                    <div className="text-center py-8 text-red-500">
                                        <p>Error: {articlesError}</p>
                                    </div>
                                )}

                                {!articlesLoading && !articlesError && (
                                    <div className="space-y-4">
                                        {pendingArticles.map((article) => {
                                            const themeInfo = getThemeInfo(article.theme)
                                            return (
                                                <div key={article.id} className="p-4 border rounded-lg">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant={themeInfo.variant}>{themeInfo.name}</Badge>
                                                            <Badge variant="outline">ID: {article.id}</Badge>
                                                            {article.tags && article.tags.length > 0 && (
                                                                <div className="flex gap-1">
                                                                    {article.tags.slice(0, 2).map((tag) => (
                                                                        <Badge key={tag.id} variant="secondary" className="text-xs">
                                                                            {tag.name}
                                                                        </Badge>
                                                                    ))}
                                                                    {article.tags.length > 2 && (
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            +{article.tags.length - 2}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="text-sm text-muted-foreground">
                                                            Submitted: {formatDate(article.createdAt)}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-semibold mb-1">{article.title}</h3>
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        By: {article.author.firstName} {article.author.lastName} ({article.author.email})
                                                    </p>
                                                    {article.resume && (
                                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                            {article.resume}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                                                        <span>Views: {article.views}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>Status: {article.status}</span>
                                                        {article.link && (
                                                            <>
                                                                <span className="mx-2">•</span>
                                                                <span>Link: {article.link}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={`/article/${article.id}`}>
                                                                <Eye className="h-4 w-4 mr-1" />
                                                                Preview
                                                            </Link>
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            <Brain className="h-4 w-4 mr-1" />
                                                            Analyse with AI
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700"
                                                            onClick={() => handleApproveArticle(article.id)}
                                                        >
                                                            <CheckCircle className="h-4 w-4 mr-1" />
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleRejectArticle(article.id)}
                                                        >
                                                            <XCircle className="h-4 w-4 mr-1" />
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        {pendingArticles.length === 0 && (
                                            <div className="text-center py-8 text-muted-foreground">
                                                <p>No pending articles found</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}