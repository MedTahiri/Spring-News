"use client"

import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Send, Trash2 } from "lucide-react"

const CommentSection = ({ articleId }) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

    // current user
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/user/me`, {
                    credentials: 'include'
                })
                if (response.ok) {
                    const userData = await response.json()
                    setCurrentUser(userData)
                }
            } catch (error) {
                console.error('Error fetching current user:', error)
            }
        }

        fetchCurrentUser()
    }, [API_BASE_URL])

    // fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${API_BASE_URL}/api/comments/article/${articleId}`)
                if (response.ok) {
                    const commentsData = await response.json()
                    setComments(commentsData)
                }
            } catch (error) {
                console.error('Error fetching comments:', error)
            } finally {
                setLoading(false)
            }
        }

        if (articleId) {
            fetchComments()
        }
    }, [articleId, API_BASE_URL])

    const handleSubmitComment = async (e) => {
        e.preventDefault()

        if (!newComment.trim() || !currentUser) {
            return
        }

        try {
            setSubmitting(true)
            const response = await fetch(`${API_BASE_URL}/api/comments/article/${articleId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    content: newComment.trim()
                })
            })

            if (response.ok) {
                const newCommentData = await response.json()
                setComments(prev => [newCommentData, ...prev])
                setNewComment('')
            } else {
                console.error('Failed to submit comment')
            }
        } catch (error) {
            console.error('Error submitting comment:', error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (response.ok) {
                setComments(prev => prev.filter(comment => comment.id !== commentId))
            } else {
                console.error('Failed to delete comment')
            }
        } catch (error) {
            console.error('Error deleting comment:', error)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const canDeleteComment = (comment) => {
        return currentUser && (
            currentUser.id === comment.user?.id ||
            currentUser.role === 'ADMIN'
        )
    }

    if (loading) {
        return (
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Comments
                </h3>
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-3">
                            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-16 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            {currentUser ? (
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmitComment}>
                            <div className="flex gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src="/placeholder.svg?height=40&width=40&text=User"
                                        alt={`${currentUser.firstName} ${currentUser.lastName}`}
                                    />
                                    <AvatarFallback>
                                        {currentUser.firstName?.[0]}{currentUser.lastName?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <Textarea
                                        placeholder="Write a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className="mb-3 min-h-[80px]"
                                    />
                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={!newComment.trim() || submitting}
                                            className="flex items-center gap-2"
                                        >
                                            <Send className="h-4 w-4" />
                                            {submitting ? 'Posting...' : 'Post Comment'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <Card className="mb-6">
                    <CardContent className="pt-6 text-center">
                        <p className="text-muted-foreground">
                            Please log in to leave a comment.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">
                                No comments yet. Be the first to share your thoughts!
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    comments.map((comment, index) => (
                        <div key={comment.id}>
                            <div className="flex gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src="/placeholder.svg?height=40&width=40&text=User"
                                        alt={`${comment.user?.firstName || ''} ${comment.user?.lastName || ''}`}
                                    />
                                    <AvatarFallback>
                                        {(comment.user?.firstName?.[0] || '') + (comment.user?.lastName?.[0] || '')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-sm">
                                                {comment.user?.firstName} {comment.user?.lastName}
                                            </h4>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDate(comment.createdAt)}
                                            </span>
                                        </div>
                                        {canDeleteComment(comment) && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                            {index < comments.length - 1 && <Separator className="mt-6" />}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CommentSection