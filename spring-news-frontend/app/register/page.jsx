"use client"

import {useState} from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Register} from "@/services/userService";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("user")
    const [bio, setBio] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleRegister = async (e) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)
        try {
            if (password === confirmPassword) {
                const user = await Register(firstname, lastname, email, password, role, bio)
                console.log(user)
                router.push("/")
            } else {
                setError("Passwords don't match")
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create an account</CardTitle>
                            <CardDescription>Enter your information to create an account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRegister}>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="first-name">First name</Label>
                                            <Input id="first-name" type="text" value={firstname}
                                                   onChange={(e) => setFirstname(e.target.value)} required/>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="last-name">Last name</Label>
                                            <Input id="last-name" type="text" value={lastname}
                                                   onChange={(e) => setLastname(e.target.value)} required/>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Role</Label>
                                        <Tabs defaultValue={role} onValueChange={setRole}>
                                            <TabsList>
                                                <TabsTrigger value="user">User</TabsTrigger>
                                                <TabsTrigger value="journalist">Journalist</TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="register-email">Email</Label>
                                        <Input id="register-email" type="email" placeholder="name@example.com"
                                               value={email} onChange={(e) => setEmail(e.target.value)}
                                            required/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="register-bio">Bio</Label>
                                        <Input id="register-bio" type="text" placeholder="bio"
                                               value={bio} onChange={(e) => setBio(e.target.value)}
                                               required/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="register-password">Password</Label>
                                        <Input id="register-password" type="password"
                                               value={password} onChange={(e) => setPassword(e.target.value)}
                                               required/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input id="confirm-password" type="password"
                                               value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                               required/>
                                    </div>
                                    <Button type="submit" className="w-full bg-red-700 hover:bg-red-800"
                                            disabled={isLoading}>
                                        {isLoading ? "Creating account..." : "Create Account"}
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
