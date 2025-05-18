"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {User, ShieldCheck, PenLine} from "lucide-react"
import {use, useEffect, useState} from "react";
import {getUserById} from "@/services/userService";

export default function ProfilePage({params}) {

    const {id} = use(params)

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserById(id).then(setUser)
            .catch(console.error)
            .finally(() => setLoading(false));
    },[id])


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

    const role = user?.role
    const meta = roleMeta[role] || roleMeta.user

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>{user?.firstname + user?.lastname}</CardTitle>
                    <CardDescription>{user?.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        {meta.icon}
                        <Badge variant={meta.badgeVariant}>{meta.label}</Badge>
                    </div>
                    <p className="text-muted-foreground">{meta.description}</p>
                    {user?.bio && (
                        <div>
                            <h3 className="font-semibold text-sm mt-4 mb-1">Bio</h3>
                            <p>{user?.bio}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
