import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ShieldCheck, PenLine } from "lucide-react"

export default function ProfilePage() {
    // Simulate logged-in user
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "journalist", // Change to "admin", "visitor", etc.
        joinedDate: "March 10, 2024",
        bio: "Experienced reporter covering politics and technology.",
    }

    // Role-based badge and description
    const roleMeta = {
        admin: {
            label: "Admin",
            icon: <ShieldCheck className="w-4 h-4 mr-1" />,
            description: "Administrator with full system access.",
            badgeVariant: "default",
        },
        journalist: {
            label: "Journalist",
            icon: <PenLine className="w-4 h-4 mr-1" />,
            description: "Can publish and manage articles.",
            badgeVariant: "secondary",
        },
        visitor: {
            label: "Visitor",
            icon: null,
            description: "Basic access to view and comment on articles.",
            badgeVariant: "outline",
        },
    }

    const role = user.role
    const meta = roleMeta[role] || roleMeta.visitor

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        {meta.icon}
                        <Badge variant={meta.badgeVariant}>{meta.label}</Badge>
                    </div>
                    <p className="text-muted-foreground">{meta.description}</p>
                    {user.bio && (
                        <div>
                            <h3 className="font-semibold text-sm mt-4 mb-1">Bio</h3>
                            <p>{user.bio}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
