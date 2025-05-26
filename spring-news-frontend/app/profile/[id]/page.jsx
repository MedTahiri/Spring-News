"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {User, ShieldCheck, PenLine, Settings, FileText} from "lucide-react"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation"
import Link from "next/link"

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/me', {
                    credentials: 'include' // Include cookies
                })

                if (!response.ok) {
                    if (response.status === 401) {
                        // User not authenticated
                        router.push('/login')
                        return
                    }
                    throw new Error('Failed to fetch user data')
                }

                const userData = await response.json()
                setUser(userData)
            } catch (err) {
                console.error('Error fetching user:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCurrentUser()
    }, [router])

    // Role-based badge and description
    const roleMeta = {
        admin: {
            label: "admin",
            icon: <ShieldCheck className="w-4 h-4 mr-1"/>,
            description: "Administrator with full system access.",
            badgeVariant: "default",
        },
        journalist: {
            label: "journalist",
            icon: <PenLine className="w-4 h-4 mr-1"/>,
            description: "Can publish and manage articles.",
            badgeVariant: "secondary",
        },
        user: {
            label: "user",
            icon: <User className="w-4 h-4 mr-1"/>,
            description: "Basic access to view and comment on articles.",
            badgeVariant: "outline",
        },
    }

    const role = user?.role?.toLowerCase() || 'user'
    const meta = roleMeta[role] || roleMeta.user

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading profile...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-8 text-red-500">
                    <p>Error loading profile: {error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>
                        {user?.firstName && user?.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user?.email || 'Unknown User'
                        }
                    </CardTitle>
                    <CardDescription>{user?.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        {meta.icon}
                        <Badge variant={meta.badgeVariant}>{meta.label}</Badge>
                    </div>
                    <p className="text-muted-foreground">{meta.description}</p>

                    {/* Role-based action buttons */}
                    <div className="pt-4 space-y-2">
                        {user?.role === "Journalist" && (
                            <Button asChild className="w-full">
                                <Link href="/journalist" className="flex items-center justify-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Go to Journalist Dashboard
                                </Link>
                            </Button>
                        )}
                        {user?.role === "Admin" && (
                            <Button asChild className="w-full">
                                <Link href="/admin" className="flex items-center justify-center gap-2">
                                    <Settings className="w-4 h-4" />
                                    Go to Admin Panel
                                </Link>
                            </Button>
                        )}
                    </div>

                    {user?.bio && (
                        <div>
                            <h3 className="font-semibold text-sm mt-4 mb-1">Bio</h3>
                            <p>{user?.bio}</p>
                        </div>
                    )}
                    {user?.createdAt && (
                        <div>
                            <h3 className="font-semibold text-sm mt-4 mb-1">Member Since</h3>
                            <p>{new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}