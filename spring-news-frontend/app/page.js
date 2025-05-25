"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge"
// import Image from "next/image" // Comment out if using regular img tags
import {CalendarIcon, Eye, MessageSquare} from "lucide-react"
import Link from "next/link";
import {useEffect, useState} from "react";
import {News, TopNews} from "@/services/newsService";

export default function Home() {
    const [news, setNews] = useState([]);
    const [topNews, setTopNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ["all", "politics", "business", "technology", "health", "opinion"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [newsData, topNewsData] = await Promise.all([
                    News(),
                    TopNews()
                ]);

                setNews(newsData);
                setTopNews(topNewsData);
            } catch (err) {
                setError('Failed to load articles. Please try again later.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg">Loading articles...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <p className="text-lg text-red-600 mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (news.length === 0) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-muted-foreground">No published articles available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Featured Article */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                <div className="lg:col-span-2">
                    <Card className="border-0 shadow-none">
                        <CardContent className="p-0">
                            <div className="relative h-[400px] mb-4">
                                <img
                                    src={news[0]?.image || '/placeholder-image.jpg'}
                                    alt={news[0]?.title || 'News Article'}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <Badge className="bg-red-700 mb-2">{news[0]?.category}</Badge>
                                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                                        {news[0]?.title}
                                    </h1>
                                    <p className="text-white/90 text-sm md:text-base">
                                        {news[0]?.excerpt}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <span className="font-semibold text-foreground mr-2">
                                    By {news[0]?.journalist?.firstname} {news[0]?.journalist?.lastname}
                                </span>
                                <span className="flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-1"/> {news[0]?.date}
                                </span>
                                <span className="mx-2">|</span>
                                <span className="flex items-center">
                                    <Eye className="h-4 w-4 mr-1"/> {news[0]?.views}
                                </span>
                                <span className="mx-2">|</span>
                                <span className="flex items-center">
                                    <MessageSquare className="h-4 w-4 mr-1"/> {news[0]?.comment}
                                </span>
                            </div>
                            <p className="text-lg leading-relaxed">
                                {news[0]?.content}
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2 font-bold">
                                <Link href={`/article/${news[0]?.id}`}>
                                    Continue Reading →
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold border-b border-gray-200 pb-2">TOP NEWS</h2>

                    {topNews.length > 0 ? (
                        topNews.map((item) => (
                            <Card key={item.id} className="border-0 shadow-none">
                                <CardContent className="p-0">
                                    <div className="flex gap-4">
                                        <div className="relative w-24 h-24 flex-shrink-0">
                                            <img
                                                src={item.image || '/placeholder-image.jpg'}
                                                alt={item.title}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                        <div>
                                            <Badge className="mb-1" variant="outline">
                                                {item.category}
                                            </Badge>
                                            <h3 className="font-bold mb-1 line-clamp-2">
                                                <Link href={`/article/${item.id}`} className="hover:underline">
                                                    {item.title}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{item.date}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No top news available.</p>
                    )}
                </div>
            </div>

            {/* News Categories */}
            <Tabs defaultValue="all" className="mb-10">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 mb-6">
                    {categories.map((category) => (
                        <TabsTrigger
                            key={category}
                            value={category}
                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none px-4 py-2 capitalize"
                        >
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map((category) => {
                    const filteredNews =
                        category === "all" ? news : news.filter((n) => n.category?.toLowerCase() === category);

                    return (
                        <TabsContent key={category} value={category} className="mt-0">
                            {filteredNews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredNews.map((item) => (
                                        <Card key={item.id} className="overflow-hidden">
                                            <div className="relative h-48">
                                                <img
                                                    src={item.image || '/placeholder-image.jpg'}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <CardHeader>
                                                <Badge className="w-fit" variant="outline">
                                                    {item.category}
                                                </Badge>
                                                <CardTitle className="line-clamp-2">
                                                    {item.title}
                                                </CardTitle>
                                                <CardDescription className="flex items-center gap-2">
                                                    <span>By {item.journalist?.firstname} {item.journalist?.lastname}</span>
                                                    <span>•</span>
                                                    <span>{item.date}</span>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="line-clamp-3">
                                                    {item.excerpt}
                                                </p>
                                            </CardContent>
                                            <CardFooter>
                                                <Button variant="link" className="p-0 h-auto">
                                                    <Link href={`/article/${item.id}`}>
                                                        Continue Reading →
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">No articles found in {category}.</p>
                                </div>
                            )}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    )
}