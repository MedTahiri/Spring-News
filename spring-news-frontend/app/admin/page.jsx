import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {CheckCircle, Trash, Brain, Eye, Flag, Lock, Plus, Shield, User, XCircle} from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function AdminDashboard() {
    // Mock data for users
    const users = [
        {
            id: "1",
            name: "Sarah Johnson",
            email: "sarah.johnson@example.com",
            role: "journalist",
            status: "active",
            joinDate: "Jan 15, 2023",
            articles: 24,
        },
        {
            id: "2",
            name: "Michael Chen",
            email: "michael.chen@example.com",
            role: "journalist",
            status: "active",
            joinDate: "Mar 22, 2023",
            articles: 18,
        },
        {
            id: "3",
            name: "Emily Wilson",
            email: "emily.wilson@example.com",
            role: "User",
            status: "active",
            joinDate: "Nov 5, 2022",
            articles: 0,
        },
        {
            id: "4",
            name: "John Smith",
            email: "john.smith@example.com",
            role: "user",
            status: "suspended",
            joinDate: "Apr 10, 2024",
            articles: 0,
        },
    ]

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
                        <CardDescription className="text-2xl font-bold">1,245</CardDescription>
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
                            <div className="space-y-4">
                                {users.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={`/placeholder.svg?height=50&width=50&text=${user.name.charAt(0)}`} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold">{user.name}</h3>
                                                    <Badge
                                                        variant={
                                                            user.role === "admin"
                                                                ? "default"
                                                                : user.role === "journalist"
                                                                    ? "secondary"
                                                                    : user.role === "User"
                                                                        ? "outline"
                                                                        : "outline"
                                                        }
                                                    >
                                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                    {user.role === "journalist" && (
                                                        <>
                                                            <span>Articles: {user.articles}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                <Trash className="h-4 w-4 mr-1" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
