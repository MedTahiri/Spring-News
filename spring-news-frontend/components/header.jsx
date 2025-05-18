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
import {Menu, Search, User, X} from "lucide-react"
import {useRouter} from "next/navigation";

export default function Header() {
    const [showSearch, setShowSearch] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    const router = useRouter()

    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })


    useEffect(() => {
        const userCookie = Cookie.get("user")
        if (userCookie) {
            const parsedUser = JSON.parse(userCookie)
            setUser(parsedUser)
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
            setUser(null)
        }
    }, [])

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }

    const logout = () => {
        Cookie.remove("user")
        setIsLoggedIn(false)
        router.push("/")
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
                                            <Button oonClick={() => logout()} className="w-full" variant="outline">
                                                Sign Out
                                            </Button>
                                        ) : (
                                            <div className="space-y-2">
                                                <Button className="w-full">
                                                    Sign In
                                                </Button>
                                                <Button variant="outline" className="w-full">
                                                    Sign Up
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
                        <Button variant="ghost" size="icon" onClick={toggleSearch} className="relative">
                            {showSearch ? <X className="h-5 w-5"/> : <Search className="h-5 w-5"/>}
                            <span className="sr-only">{showSearch ? "Close search" : "Search"}</span>
                        </Button>

                        {isLoggedIn ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>{user.firstname[0] + user.lastname[0]}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Link href={"/profile/"+user.id} className="flex w-full">
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        {user.role === "journalist" &&
                                            <DropdownMenuItem>
                                                <Link href="/journalist" className="flex w-full">
                                                    Journalist Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                        }
                                        {user.role === "admin" &&
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

                {/* Search Bar */}
                {showSearch && (
                    <div className="py-3 border-t">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search for articles, topics, and more..." className="pl-10" autoFocus/>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
