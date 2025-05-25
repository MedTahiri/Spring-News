"use client"

import Image from "next/image"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"
import {CalendarIcon, Clock, Facebook, Share2, Twitter} from "lucide-react"
import CommentSection from "@/components/comment-section"
import {use, useEffect, useState} from "react";

export default function ArticlePage({params}) {
    const {id} = use(params)
    const [newsArticle, setNewsArticle] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Spring Boot API
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/articles/${id}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch article: ${response.status}`);
                }

                const data = await response.json();
                setNewsArticle(data);
            } catch (err) {
                console.error('Error fetching article:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id, API_BASE_URL]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                        <div className="h-64 bg-gray-200 rounded mb-8"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                        <p className="text-gray-600">{error}</p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="mt-4"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!newsArticle) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                    <p className="text-gray-600">The requested article could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Article Header */}
                <div className="mb-8">
                    <Badge className="bg-red-700 mb-4">{newsArticle.theme}</Badge>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        {newsArticle.title}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-6">
                        {newsArticle.resume}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border">
                                <AvatarImage
                                    src="/placeholder.svg?height=100&width=100&text=Author"
                                    alt={`${newsArticle.author?.firstName || ''} ${newsArticle.author?.lastName || ''}`}
                                />
                                <AvatarFallback>
                                    {(newsArticle.author?.firstName?.[0] || '') + (newsArticle.author?.lastName?.[0] || '')}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">
                                    By {newsArticle.author?.firstName} {newsArticle.author?.lastName}
                                </p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <span className="flex items-center">
                                        <CalendarIcon className="h-4 w-4 mr-1"/>
                                        {newsArticle.createdAt ? new Date(newsArticle.createdAt).toLocaleDateString() : 'N/A'}
                                    </span>
                                    <span className="mx-2">|</span>
                                    <span className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1"/> {newsArticle.views || 0} views
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Facebook className="h-4 w-4"/>
                                <span className="sr-only">Share on Facebook</span>
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Twitter className="h-4 w-4"/>
                                <span className="sr-only">Share on Twitter</span>
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Share2 className="h-4 w-4"/>
                                <span className="sr-only">Share</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {newsArticle.image && (
                    <div className="relative h-[400px] mb-8">
                        <Image
                            src={newsArticle.image}
                            alt={newsArticle.title}
                            fill
                            className="object-cover rounded"
                            priority
                            onError={(e) => {
                                console.error('Image failed to load:', newsArticle.image);
                                e.target.style.display = 'none';
                            }}
                            unoptimized={true} // Temporary fix - allows any external image
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                            {newsArticle.title}
                        </p>
                    </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none mb-8">
                    <div className="whitespace-pre-wrap">
                        {newsArticle.content}
                    </div>
                </div>

                {/* Tags */}
                {newsArticle.tags && newsArticle.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {newsArticle.tags.map((tag, i) => (
                            <Badge key={i} variant="outline">{tag.name || tag}</Badge>
                        ))}
                    </div>
                )}

                <Separator className="mb-8"/>

                {/* Author Bio */}
                {newsArticle.author && (
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 border">
                                <AvatarImage
                                    src="/placeholder.svg?height=100&width=100&text=Author"
                                    alt={`${newsArticle.author.firstName} ${newsArticle.author.lastName}`}
                                />
                                <AvatarFallback>
                                    {newsArticle.author.firstName?.[0]}{newsArticle.author.lastName?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <Link href={`/profile/${newsArticle.author.id}`}>
                                    <h3 className="font-bold text-lg mb-1 hover:text-blue-600 transition-colors">
                                        {newsArticle.author.firstName} {newsArticle.author.lastName}
                                    </h3>
                                </Link>
                                <p className="text-sm mb-4">
                                    {newsArticle.author.bio || 'No bio available'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Comment Section */}
                <CommentSection articleId={id}/>
            </div>
        </div>
    )
}