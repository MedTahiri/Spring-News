"use client"

import Image from "next/image"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"
import {CalendarIcon, Clock, Facebook, Share2, Twitter} from "lucide-react"
import CommentSection from "@/components/comment-section"
import {useEffect, useState} from "react";
import {NewsById} from "@/services/newService";

export default function ArticlePage({params}) {
    const [newsArticle, setNewsArticle] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        NewsById(params.id).then(setNewsArticle)
            .catch(console.error)
            .finally(() => setLoading(false));
    })
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Article Header */}
                <div className="mb-8">
                    <Badge className="bg-red-700 mb-4">{newsArticle?.category}</Badge>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        {newsArticle?.title}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-6">
                        {newsArticle?.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border">
                                <AvatarImage src="/placeholder.svg?height=100&width=100&text=SJ" alt="Sarah Johnson"/>
                                <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">By {newsArticle?.journalist}</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1"/> {newsArticle?.date}
                  </span>
                                    <span className="mx-2">|</span>
                                    <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1"/> {newsArticle?.views} views
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
                <div className="relative h-[400px] mb-8">
                    <Image
                        src={newsArticle?.image}
                        alt={newsArticle?.title}
                        fill
                        className="object-cover rounded"
                        priority
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                        {newsArticle?.title}
                    </p>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none mb-8">
                    <p>
                        {newsArticle?.content}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {newsArticle?.tag.map((tag, i) => (
                        <Badge variant="outline">{tag}</Badge>
                    ))}
                </div>

                <Separator className="mb-8"/>

                {/* Author Bio */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border">
                            <AvatarImage src="/placeholder.svg?height=100&width=100&text=SJ" alt="Sarah Johnson"/>
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-bold text-lg mb-1">{newsArticle?.journalist}</h3>
                            <p className="text-sm text-muted-foreground mb-2">Political Correspondent</p>
                            <p className="text-sm mb-4">
                                Sarah Johnson is a senior political correspondent for Spring News, covering Congress and
                                national
                                politics. She has been reporting from Washington for over a decade and has covered three
                                presidential
                                administrations.
                            </p>
                            <Button variant="outline" size="sm">
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <CommentSection articleId="infrastructure-bill"/>
            </div>
        </div>
    )
}
