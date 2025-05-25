"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge"
import {CalendarIcon, Edit, Eye, Plus, Trash} from "lucide-react"
import Link from "next/link"
import {use, useEffect, useState} from "react";
import {getAllNewsByJournalist} from "@/services/newsService";
import Cookie from "js-cookie";

export default function JournalistDashboard() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const userCookie = Cookie.get("user");
        if (!userCookie) {
            console.error("User cookie not found.");
            return;
        }

        try {
            const user = JSON.parse(userCookie);
            const userId = user.id;
            getAllNewsByJournalist(userId)
                .then((res) => setArticles(Array.isArray(res) ? res : [res].filter(Boolean)))
                .catch(console.error)
                .finally(() => setLoading(false));
        } catch (error) {
            console.error("Invalid user cookie JSON:", error);
        }
    }, []);


    if (loading) return <p>Loading...</p>

    // Optionally compute stats
    const publishedCount = articles?.filter(a => a.status === "published").length
    const rejectedCount = articles?.filter(a => a.status === "Rejected").length
    const totalViews = articles?.reduce((sum, a) => sum + (a.views || 0), 0)
    const totalComment = articles?.reduce((sum, a) => sum + (a.comment || 0), 0)


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Journalist Dashboard</h1>
                    <p className="text-muted-foreground">Manage your articles and content</p>
                </div>
                <Button>

                    <Plus className="h-4 w-4 mr-2"/>
                    <Link href="/journalist/new-article">
                        New Article
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Published Articles</CardTitle>
                        <CardDescription className="text-2xl font-bold">{publishedCount}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Rejected Articles</CardTitle>
                        <CardDescription className="text-2xl font-bold">{rejectedCount}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                        <CardDescription className="text-2xl font-bold">{totalViews}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Comments</CardTitle>
                        <CardDescription className="text-2xl font-bold">{totalComment}</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <Tabs defaultValue="all" className="mb-8">
                <TabsContent value="all" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Articles</CardTitle>
                            <CardDescription>Manage and edit your articles</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {articles?.map((article) => (
                                    <div key={article.id}
                                         className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge
                                                    variant={
                                                        article.status === "published"
                                                            ? "default"
                                                            : article.status === "Rejected"
                                                                ? "outline"
                                                                : "secondary"
                                                    }
                                                    className={article.status === "Rejected" && "bg-red-500 border-red-500 text-white"}
                                                >
                                                    {article.status === "published"
                                                        ? "Published"
                                                        : article.status === "Rejected"
                                                            ? "Rejected"
                                                            : "Pending"}
                                                </Badge>
                                                <Badge variant="outline">{article.category}</Badge>
                                            </div>
                                            <h3 className="font-semibold">{article.title}</h3>
                                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                {article.status === "published" && (
                                                    <>
                            <span className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1"/>
                              Submitted on {article.date}
                            </span>
                                                        <span className="mx-2">|</span>
                                                        <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1"/>
                                                            {article.views} views
                            </span>
                                                    </>
                                                )}
                                                {article.status === "Rejected" && (
                                                    <span className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1"/>
                            Submitted on {article.date}
                          </span>
                                                )}
                                                {article.status === "pending" && (
                                                    <span className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1"/>
                            Submitted on {article.date}
                          </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {article.status === "published" && (
                                                <Button variant="outline" size="icon" asChild>
                                                    <Link href={`/article/${article.id}`}>
                                                        <Eye className="h-4 w-4"/>
                                                        <span className="sr-only">View</span>
                                                    </Link>
                                                </Button>
                                            )}
                                            <Button variant="outline" size="icon">
                                                <Edit className="h-4 w-4"/>
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <Trash className="h-4 w-4"/>
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>
    )
}
