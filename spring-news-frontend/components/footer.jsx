import Link from "next/link"
import {Facebook, Instagram, Rss, Twitter, Youtube} from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t">
            <div className="container mx-auto px-4 py-10">
                <div className="flex justify-between items-center">
                    <h2 className="font-serif text-2xl font-bold mb-4">Spring News</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Your trusted source for the latest news and updates from around the world.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Facebook className="h-5 w-5"/>
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Twitter className="h-5 w-5"/>
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Instagram className="h-5 w-5"/>
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Youtube className="h-5 w-5"/>
                            <span className="sr-only">YouTube</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Rss className="h-5 w-5"/>
                            <span className="sr-only">RSS</span>
                        </Link>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Spring News. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
