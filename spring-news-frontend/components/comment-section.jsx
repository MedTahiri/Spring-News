"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Heart, Flag, MoreHorizontal, Reply } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CommentSection({ articleId }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [commentText, setCommentText] = useState("")

    const [comments, setComments] = useState([
        {
            id: "1",
            author: {
                name: "John Smith",
                avatar: "/placeholder.svg?height=50&width=50&text=JS",
                initials: "JS",
            },
            content:
                "This is a significant step forward for our country's infrastructure. I'm glad to see bipartisan support for such an important issue.",
            timestamp: "2 hours ago",
            likes: 24,
            replies: [
                {
                    id: "1-1",
                    author: {
                        name: "Maria Garcia",
                        avatar: "/placeholder.svg?height=50&width=50&text=MG",
                        initials: "MG",
                    },
                    content:
                        "I agree. It's refreshing to see both parties working together on something that benefits everyone.",
                    timestamp: "1 hour ago",
                    likes: 8,
                    replies: [],
                },
            ],
        },
        {
            id: "2",
            author: {
                name: "Robert Johnson",
                avatar: "/placeholder.svg?height=50&width=50&text=RJ",
                initials: "RJ",
            },
            content:
                "While I support infrastructure investment, I'm concerned about how this will impact the national debt. Has there been any discussion about how this will be paid for?",
            timestamp: "3 hours ago",
            likes: 15,
            replies: [],
        },
        {
            id: "3",
            author: {
                name: "Emily Wilson",
                avatar: "/placeholder.svg?height=50&width=50&text=EW",
                initials: "EW",
            },
            content:
                "I'm particularly excited about the broadband investments. This will help bridge the digital divide that has become so apparent during the pandemic.",
            timestamp: "5 hours ago",
            likes: 32,
            replies: [],
        },
    ])

    const handleCommentSubmit = () => {
        if (!commentText.trim()) return

        const newComment = {
            id: `${comments.length + 1}`,
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

    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn)
    }

    const renderComment = (comment, isReply = false) => (
        <div key={comment.id} className={`${isReply ? "ml-12 mt-4" : "mb-6"}`}>
            <div className="flex gap-4">
                <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold">{comment.author.name}</p>
                                <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">More options</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Flag className="h-4 w-4 mr-2" />
                                        Report
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p>{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Heart className="h-4 w-4 mr-1" />
                            {comment.likes > 0 && <span>{comment.likes}</span>}
                            <span className="sr-only">Like</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Reply className="h-4 w-4 mr-1" />
                            Reply
                            <span className="sr-only">Reply</span>
                        </Button>
                    </div>

                    {/* Render replies */}
                    {comment.replies.map((reply) => renderComment(reply, true))}
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

            {/* Comment form */}
            <div className="mb-8">
                {isLoggedIn ? (
                    <div className="flex gap-4">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src="/placeholder.svg?height=50&width=50&text=CU" alt="Current User" />
                            <AvatarFallback>CU</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <Textarea
                                placeholder="Add a comment..."
                                className="mb-2 resize-none"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setCommentText("")}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-red-700 hover:bg-red-800"
                                    onClick={handleCommentSubmit}
                                    disabled={!commentText.trim()}
                                >
                                    Comment
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <p className="mb-4">Sign in to join the conversation</p>
                        <Button onClick={toggleLogin}>Sign In</Button>
                    </div>
                )}
            </div>

            <Separator className="mb-6" />

            {/* Comments list */}
            <div>{comments.map((comment) => renderComment(comment))}</div>
        </div>
    )
}
