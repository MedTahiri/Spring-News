"use client"

import {useState} from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ArrowLeft, ImageIcon, Save} from "lucide-react"

export default function NewArticlePage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e, status) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            // Redirect would happen here
        }, 1500)
    }

    const categories = [
        "Politics",
        "Business",
        "Technology",
        "Health",
        "Sports",
        "Entertainment",
        "World",
        "Science",
        "Opinion",
        "Education",
    ]

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-8">
                    <Button variant="ghost" size="icon" asChild className="mr-2">
                        <Link href="/journalist">
                            <ArrowLeft className="h-5 w-5"/>
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">Create New Article</h1>
                        <p className="text-gray-600 mt-1">Write and publish a new article</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Article Content</CardTitle>
                                <CardDescription>Write your article content and add media</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input id="title" placeholder="Enter article title" className="text-lg"/>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="excerpt">Excerpt</Label>
                                        <Textarea
                                            id="excerpt"
                                            placeholder="Write a short excerpt or summary"
                                            className="resize-none"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="content">Content</Label>

                                        <Textarea
                                            id="content"
                                            placeholder="Write your article content here..."
                                            className="min-h-[400px]"
                                        />

                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Publishing Options</CardTitle>
                                <CardDescription>Configure article settings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category.toLowerCase()}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <Input id="tags" placeholder="Enter tags separated by commas"/>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Featured Image</Label>
                                        <div className="border-2 border-dashed rounded-md p-6 text-center">
                                            <ImageIcon className="h-8 w-8 mx-auto text-gray-400"/>
                                            <div className="mt-2">
                                                <Button variant="secondary" size="sm">
                                                    Upload Image
                                                </Button>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">PNG, JPG or GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button
                                    className="w-full bg-red-700 hover:bg-red-800"
                                    onClick={(e) => handleSubmit(e, "publish")}
                                    disabled={isSubmitting}
                                >
                                    Submit for Review
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}
