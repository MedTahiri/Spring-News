"use client"

import {useState} from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate login process
        setTimeout(() => {
            setIsLoading(false)
            // Redirect would happen here
        }, 1500)
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login to Spring News</CardTitle>
                            <CardDescription>Enter your credentials to access your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="name@example.com" required/>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <Input id="password" type="password" required/>
                                    </div>
                                    <Button type="submit" className="w-full bg-red-700 hover:bg-red-800"
                                            disabled={isLoading}>
                                        {isLoading ? "Signing in..." : "Sign In"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

            </div>
        </div>
</main>
)
}
