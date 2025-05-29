"use client"

import Cookie from "js-cookie"
import {useEffect, useState} from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Menu, User, X} from "lucide-react"
import {useRouter} from "next/navigation";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    // Check authentication status using the /me endpoint
    const checkAuthStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/user/me', {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const userData = await response.json()
                console.log('User authenticated, data:', userData)
                setUser(userData)
                setIsLoggedIn(true)
            } else if (response.status === 401) {
                console.log('User not authenticated')
                setIsLoggedIn(false)
                setUser(null)
            }
        } catch (error) {
            console.error('Error checking auth status:', error)
            setIsLoggedIn(false)
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // Initial auth check
        checkAuthStatus()

        // Set up periodic checks
        const interval = setInterval(checkAuthStatus, 3000) // Check every 3 seconds

        // Listen for focus events (when user comes back to tab)
        const handleFocus = () => {
            checkAuthStatus()
        }

        window.addEventListener('focus', handleFocus)

        return () => {
            clearInterval(interval)
            window.removeEventListener('focus', handleFocus)
        }
    }, [])

    // Add a manual refresh function that can be called from outside
    useEffect(() => {
        // Custom event listener for manual auth refresh
        const handleAuthRefresh = () => {
            console.log('Manual auth refresh triggered')
            checkAuthStatus()
        }

        window.addEventListener('auth-refresh', handleAuthRefresh)

        return () => {
            window.removeEventListener('auth-refresh', handleAuthRefresh)
        }
    }, [])

    const logout = async () => {
        try {
            console.log('Logging out...')
            await fetch('http://localhost:8080/api/user/logout', {
                method: 'POST',
                credentials: 'include'
            })
        } catch (error) {
            console.error('Error during logout:', error)
        }

        setIsLoggedIn(false)
        setUser(null)
        router.push("/")
    }
    // Show loading state initially
    if (isLoading) {
        return (
            <header className="border-b sticky top-0 bg-white z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-xs text-muted-foreground hidden md:inline">{today}</span>
                        <Link href="/" className="text-center">
                            <h1 className="font-serif text-3xl font-bold tracking-tight">Spring News</h1>
                        </Link>
                        <div className="w-24">Loading...</div>
                    </div>
                </div>
            </header>
        )
    }

    return (
        <header className="border-b sticky top-0 bg-white z-50">
            <div className="container mx-auto px-4">
                {/* Top Bar */}
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5"/>
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-4 mt-8">
                                    <div className="mt-auto pt-8">
                                        {isLoggedIn ? (
                                            <Button onClick={() => logout()} className="w-full" variant="outline">
                                                Sign Out
                                            </Button>
                                        ) : (
                                            <div className="space-y-2">
                                                <Button className="w-full">
                                                    <Link href="/login">
                                                        Sign In
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" className="w-full">
                                                    <Link href="/register">
                                                        Sign Up
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <span className="text-xs text-muted-foreground hidden md:inline">{today}</span>
                    </div>

                    <Link href="/" className="text-center">
                        <h1 className="font-serif text-3xl font-bold tracking-tight">Spring News</h1>
                    </Link>

                    <div className="flex items-center gap-2">
                        {isLoggedIn ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>
                                                    {user && user.firstName && user.lastName
                                                        ? user?.firstName[0].toUpperCase() + user?.lastName[0].toUpperCase()
                                                        : 'U'
                                                    }
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            {user && user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'User'}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link href={"/profile/"+(user?.id || '')} className="flex w-full">
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        {user?.role === "Journalist" &&
                                            <DropdownMenuItem>
                                                <Link href="/journalist" className="flex w-full">
                                                    Journalist Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                        }
                                        {user?.role === "Admin" &&
                                            <DropdownMenuItem>
                                                <Link href="/admin" className="flex w-full">
                                                    Admin Panel
                                                </Link>
                                            </DropdownMenuItem>}
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem onClick={() => logout()}>Sign Out</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                                    <Link href="/login">
                                        Sign In
                                    </Link>
                                </Button>
                                <Button size="sm" className="bg-red-700 hover:bg-red-800 hidden md:inline-flex">
                                    <Link href="/register">
                                        Sign Up
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <User className="h-5 w-5"/>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}