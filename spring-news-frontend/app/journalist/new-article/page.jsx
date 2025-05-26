"use client"

import {useState, useEffect} from "react"
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
    const [isLoadingUser, setIsLoadingUser] = useState(true)
    const [userError, setUserError] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        resume: "",
        theme: "",
        image: "",
        content: "",
        tags: "",
        authorId: 0,
        link: ""
    })
    const [submitMessage, setSubmitMessage] = useState("")

    // Fetch current user from cookie on component mount
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/me', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                    headers: {
                        'Accept': 'application/json',
                    }
                })

                if (response.ok) {
                    const userData = await response.json()
                    setFormData(prev => ({
                        ...prev,
                        authorId: userData.id
                    }))
                    setUserError("")
                } else if (response.status === 401) {
                    setUserError("You must be logged in to create an article")
                } else {
                    setUserError("Failed to get user information")
                }
            } catch (error) {
                console.error('Error fetching user:', error)
                setUserError("Network error while getting user information")
            } finally {
                setIsLoadingUser(false)
            }
        }

        fetchCurrentUser()
    }, [])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        // Auto-generate link from title
        if (field === 'title') {
            const generatedLink = value
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim()
            setFormData(prev => ({
                ...prev,
                link: generatedLink
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check if we have a valid authorId
        if (!formData.authorId || formData.authorId === 0) {
            setSubmitMessage("Error: User authentication required. Please refresh the page and try again.")
            return
        }

        setIsSubmitting(true)
        setSubmitMessage("")

        try {
            // Process tags - split by comma and trim whitespace
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)

            // JSON
            const payload = {
                title: formData.title,
                resume: formData.resume,
                theme: formData.theme.toUpperCase(),
                image: formData.image,
                content: formData.content,
                tags: tagsArray,
                authorId: formData.authorId,
                link: formData.link
            }

            console.log('Submitting payload:', JSON.stringify(payload, null, 2))

            const response = await fetch('http://localhost:8080/api/articles/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                const result = await response.json()
                setSubmitMessage("Article submitted successfully!")
                console.log('Success:', result)

                // reset form
                // setFormData({
                //     title: "",
                //     resume: "",
                //     theme: "",
                //     image: "",
                //     content: "",
                //     tags: "",
                //     authorId: formData.authorId,
                //     link: ""
                // })

            } else {
                const errorData = await response.text()
                setSubmitMessage(`Error: ${response.status} - ${errorData}`)
                console.error('Error response:', errorData)
            }
        } catch (error) {
            setSubmitMessage(`Network error: ${error.message}`)
            console.error('Network error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const themes = [
        "POLITICS",
        "BUSINESS",
        "TECHNOLOGY",
        "HEALTH",
        "SPORTS",
        "ENTERTAINMENT",
        "WORLD",
        "SCIENCE",
        "OPINION",
        "EDUCATION",
    ]

    // Show loading or error state if user is not authenticated
    if (isLoadingUser) {
        return (
            <main className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading user information...</p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    if (userError) {
        return (
            <main className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center h-64">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle className="text-red-600">Authentication Required</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">{userError}</p>
                                <Button asChild className="w-full">
                                    <Link href="/login">Go to Login</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        )
    }

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
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            placeholder="Enter article title"
                                            className="text-lg"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="resume">Resume/Summary *</Label>
                                        <Textarea
                                            id="resume"
                                            placeholder="Write a short summary or resume of the article"
                                            className="resize-none"
                                            rows={3}
                                            value={formData.resume}
                                            onChange={(e) => handleInputChange('resume', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="content">Content *</Label>
                                        <Textarea
                                            id="content"
                                            placeholder="Write your article content here..."
                                            className="min-h-[400px]"
                                            value={formData.content}
                                            onChange={(e) => handleInputChange('content', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="link">URL Link</Label>
                                        <Input
                                            id="link"
                                            placeholder="Article URL (auto-generated from title)"
                                            value={formData.link}
                                            onChange={(e) => handleInputChange('link', e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">This will be auto-generated from the title, but you can customize it</p>
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
                                        <Label htmlFor="theme">Theme *</Label>
                                        <Select onValueChange={(value) => handleInputChange('theme', value)} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select theme"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {themes.map((theme) => (
                                                    <SelectItem key={theme} value={theme}>
                                                        {theme}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <Input
                                            id="tags"
                                            placeholder="Enter tags separated by commas (e.g., tech, infos, ai)"
                                            value={formData.tags}
                                            onChange={(e) => handleInputChange('tags', e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">Separate multiple tags with commas</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image">Image URL</Label>
                                        <Input
                                            id="image"
                                            placeholder="https://example.com/image.jpg"
                                            value={formData.image}
                                            onChange={(e) => handleInputChange('image', e.target.value)}
                                        />
                                    </div>

                                    {/* Author ID display (read-only) */}
                                    <div className="space-y-2">
                                        <Label>Author ID</Label>
                                        <div className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-700">
                                            {formData.authorId || 'Loading...'}
                                        </div>
                                        <p className="text-xs text-gray-500">Automatically set from your login session</p>
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
                                    type="submit"
                                    className="w-full bg-red-700 hover:bg-red-800"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !formData.authorId}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Article"}
                                </Button>

                                {submitMessage && (
                                    <div className={`p-3 rounded text-sm ${
                                        submitMessage.includes('successfully')
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {submitMessage}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}