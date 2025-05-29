"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge"
import {CalendarIcon, Edit, Eye, Plus, Trash} from "lucide-react"
import Link from "next/link"
import {use, useEffect, useState} from "react";
import Cookie from "js-cookie";
import {useRouter} from "next/navigation";

const getCurrentUser = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/user/me', {
            method: 'GET',
            credentials: 'include', // Important: includes httpOnly cookies
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error getting current user:', error);
        throw error;
    }
};

const fetchArticlesByAuthor = async (authorId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/articles/author/${authorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

export default function JournalistDashboard() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter();
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            // First, check if user is authenticated by calling /api/user/me
            const currentUser = await getCurrentUser();

            if (!currentUser || !currentUser.id) {
                console.log("No valid user authentication found, redirecting to login");
                router.push("/login");
                return;
            }

            console.log("Authenticated user:", currentUser);
            const userId = currentUser.id;

            // Now fetch articles for this authenticated user
            const fetchedArticles = await fetchArticlesByAuthor(userId);
            setArticles(Array.isArray(fetchedArticles) ? fetchedArticles : []);

        } catch (error) {
            console.error("Authentication or data fetch error:", error);

            // If it's an authentication error, redirect to login
            if (error.message === 'Unauthorized') {
                console.log("User not authenticated, redirecting to login");
                router.push("/login");
                return;
            }

            // For other errors, show error message
            setError("Failed to load articles. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchData();
    }, [router]);

    if (loading) return <div className="container mx-auto px-4 py-8"><p>Loading...</p></div>
    if (error) return <div className="container mx-auto px-4 py-8"><p className="text-red-500">Error: {error}</p></div>


    const mappedArticles = articles.map(article => ({
        id: article.id,
        title: article.title,
        status: article.status?.toLowerCase(),
        category: article.theme,
        date: article.createdAt || new Date().toLocaleDateString(),
        views: article.views || 0,
        comments: article.comments?.length || 0,
        resume: article.resume,
        content: article.content,
        image: article.image,
        tags: article.tags || []
    }));

    const deleteArticle = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/articles/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            fetchData();
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    }

    // Compute stats based on mapped data
    const publishedCount = mappedArticles.filter(a => a.status === "published").length;
    const rejectedCount = mappedArticles.filter(a => a.status === "refused").length;
    const pendingCount = mappedArticles.filter(a => a.status === "pending").length;
    const totalViews = mappedArticles.reduce((sum, a) => sum + (a.views || 0), 0);
    const totalComments = mappedArticles.reduce((sum, a) => sum + (a.comments || 0), 0);

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
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Articles</CardTitle>
                        <CardDescription className="text-2xl font-bold">{pendingCount}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                        <CardDescription className="text-2xl font-bold">{totalViews}</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <Tabs defaultValue="all" className="mb-8">
                <TabsList>
                    <TabsTrigger value="all">All Articles</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="refused">Rejected</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Articles</CardTitle>
                            <CardDescription>Manage and edit all your articles</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ArticleList articles={mappedArticles} onDelete={deleteArticle}/>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="published" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Published Articles</CardTitle>
                            <CardDescription>Your published articles</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ArticleList articles={mappedArticles.filter(a => a.status === "published")} onDelete={deleteArticle}/>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pending" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Articles</CardTitle>
                            <CardDescription>Articles awaiting review</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ArticleList articles={mappedArticles.filter(a => a.status === "pending")} onDelete={deleteArticle}/>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="refused" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rejected Articles</CardTitle>
                            <CardDescription>Articles that were rejected</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ArticleList articles={mappedArticles.filter(a => a.status === "refused")} onDelete={deleteArticle}/>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

// Separate component for article list to avoid repetition
function ArticleList({articles,onDelete}) {
    if (articles.length === 0) {
        return <p className="text-muted-foreground">No articles found.</p>;
    }

    return (
        <div className="space-y-4">
            {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge
                                variant={
                                    article.status === "published"
                                        ? "default"
                                        : article.status === "refused"
                                            ? "destructive"
                                            : "secondary"
                                }
                            >
                                {article.status === "published"
                                    ? "Published"
                                    : article.status === "refused"
                                        ? "Rejected"
                                        : "Pending"}
                            </Badge>
                            <Badge variant="outline">{article.category}</Badge>
                        </div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{article.resume}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-2">
                            <span className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1"/>
                                {article.date}
                            </span>
                            {article.status === "published" && (
                                <>
                                    <span className="mx-2">|</span>
                                    <span className="flex items-center">
                                        <Eye className="h-4 w-4 mr-1"/>
                                        {article.views} views
                                    </span>
                                </>
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
                        {/*<Button variant="outline" size="icon">*/}
                        {/*    <Edit className="h-4 w-4"/>*/}
                        {/*    <span className="sr-only">Edit</span>*/}
                        {/*</Button>*/}
                        <Button variant="outline" size="icon" onClick={() => {
                            onDelete(article.id)
                        }}>
                            <Trash className="h-4 w-4"/>
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}