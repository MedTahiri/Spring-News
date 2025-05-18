"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Reply, Trash } from "lucide-react"

export default function CommentSection({ articleId }) {
    const [commentText, setCommentText] = useState("")
    const [replyText, setReplyText] = useState("")
    const [activeReplyId, setActiveReplyId] = useState(null)

    const [comments, setComments] = useState([
        {
            id: "1",
            author: {
                name: "John Smith",
                avatar: "/placeholder.svg?height=50&width=50&text=JS",
                initials: "JS",
            },
            content: "This is a significant step forward for our country's infrastructure.",
            timestamp: "2 hours ago",
            likes: 24,
            replies: [],
        },
        {
            id: "2",
            author: {
                name: "Emily Wilson",
                avatar: "/placeholder.svg?height=50&width=50&text=EW",
                initials: "EW",
            },
            content: "I'm excited about the broadband investments!",
            timestamp: "5 hours ago",
            likes: 32,
            replies: [],
        },
    ])

    const handleCommentSubmit = () => {
        if (!commentText.trim()) return

        const newComment = {
            id: `${Date.now()}`,
            author: {
                name: "Current User",
                avatar: "/placeholder.svg?height=50&width=50&text=CU",
                initials: "CU",
            },
            content: commentText,
            timestamp: "Just now",
            likes: 0,
            replies: [],
        }

        setComments([newComment, ...comments])
        setCommentText("")
    }

    const handleReplySubmit = (parentId) => {
        if (!replyText.trim()) return

        const newReply = {
            id: `${Date.now()}`,
            author: {
                name: "Current User",
                avatar: "/placeholder.svg?height=50&width=50&text=CU",
                initials: "CU",
            },
            content: replyText,
            timestamp: "Just now",
            likes: 0,
            replies: [],
        }

        const updatedComments = comments.map(comment =>
            comment.id === parentId
                ? { ...comment, replies: [...comment.replies, newReply] }
                : comment
        )

        setComments(updatedComments)
        setReplyText("")
        setActiveReplyId(null)
    }

    const renderComment = (comment, isReply = false) => (
        <div key={comment.id} className={`${isReply ? "ml-12 mt-4" : "mb-6"}`}>
            <div className="flex gap-4">
                <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold">{comment.author.name}</p>
                                <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <p>{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() =>
                                setActiveReplyId(activeReplyId === comment.id ? null : comment.id)
                            }
                        >
                            <Reply className="h-4 w-4 mr-1" />
                            Reply
                        </Button>
                    </div>

                    {/* Reply input */}
                    {activeReplyId === comment.id && (
                        <AddComment
                            value={replyText}
                            onChange={setReplyText}
                            onCancel={() => {
                                setActiveReplyId(null)
                                setReplyText("")
                            }}
                            onSubmit={() => handleReplySubmit(comment.id)}
                        />
                    )}

                    {/* Render replies */}
                    {comment.replies.map((reply) => renderComment(reply, true))}
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

            {/* Add a new top-level comment */}
            <div className="mb-8">
                <AddComment
                    value={commentText}
                    onChange={setCommentText}
                    onCancel={() => setCommentText("")}
                    onSubmit={handleCommentSubmit}
                />
            </div>

            <Separator className="mb-6" />

            <div>{comments.map((comment) => renderComment(comment))}</div>
        </div>
    )
}

// Reusable AddComment component
function AddComment({ value, onChange, onCancel, onSubmit }) {
    return (
        <div className="flex gap-4">
            <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src="/placeholder.svg?height=50&width=50&text=CU" alt="Current User" />
                <AvatarFallback>CU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <Textarea
                    placeholder="Add a comment..."
                    className="mb-2 resize-none"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        className="bg-red-700 hover:bg-red-800"
                        onClick={onSubmit}
                        disabled={!value.trim()}
                    >
                        Comment
                    </Button>
                </div>
            </div>
        </div>
    )
}
