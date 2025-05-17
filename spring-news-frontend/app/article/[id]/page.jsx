import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Clock, Facebook, Share2, Twitter } from "lucide-react"
import CommentSection from "@/components/comment-section"

export default function ArticlePage({ params }) {
    // In a real app, you would fetch the article data based on the slug

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Article Header */}
                <div className="mb-8">
                    <Badge className="bg-red-700 mb-4">POLITICS</Badge>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        Senate Passes Historic Infrastructure Bill After Months of Negotiations
                    </h1>
                    <p className="text-xl text-muted-foreground mb-6">
                        The $1.2 trillion package represents the largest investment in public works in decades
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border">
                                <AvatarImage src="/placeholder.svg?height=100&width=100&text=SJ" alt="Sarah Johnson" />
                                <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">By Sarah Johnson</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" /> May 15, 2025
                  </span>
                                    <span className="mx-2">|</span>
                                    <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> 8 min read
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Facebook className="h-4 w-4" />
                                <span className="sr-only">Share on Facebook</span>
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Share on Twitter</span>
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Share2 className="h-4 w-4" />
                                <span className="sr-only">Share</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative h-[400px] mb-8">
                    <Image
                        src="https://placehold.co/1200x800.svg"
                        alt="Senate chamber during infrastructure bill vote"
                        fill
                        className="object-cover rounded"
                        priority
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                        The Senate chamber during the final vote on the infrastructure bill. (Photo: Spring News)
                    </p>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none mb-8">
                    <p>
                        <strong>WASHINGTON</strong> — After months of intense negotiations and bipartisan efforts, the Senate has
                        finally passed the much-anticipated infrastructure bill, marking a significant legislative victory. The
                        comprehensive package, totaling $1.2 trillion, aims to revitalize America's aging infrastructure, create
                        millions of jobs, and boost economic growth across the nation.
                    </p>

                    <p>
                        The bill, which passed with a vote of 69-30, garnered support from both Democrats and Republicans,
                        highlighting the rare bipartisan consensus on the urgent need to address the country's deteriorating roads,
                        bridges, railways, and broadband networks.
                    </p>

                    <h2>A Historic Investment</h2>

                    <p>
                        The legislation represents the largest investment in public works in decades, allocating funds for a wide
                        range of infrastructure projects:
                    </p>

                    <ul>
                        <li>$110 billion for roads, bridges, and major infrastructure projects</li>
                        <li>$66 billion for passenger and freight rail</li>
                        <li>$65 billion for broadband infrastructure</li>
                        <li>$55 billion for water infrastructure</li>
                        <li>$39 billion for public transit</li>
                        <li>$25 billion for airports</li>
                        <li>$7.5 billion for electric vehicle charging stations</li>
                    </ul>

                    <p>
                        "This is a monumental step forward for our nation," said Senate Majority Leader in a press conference
                        following the vote. "We're not just fixing roads and bridges; we're building the foundation for America's
                        future prosperity."
                    </p>

                    <h2>Bipartisan Breakthrough</h2>

                    <p>
                        The bill's passage marks a rare moment of bipartisan cooperation in an otherwise deeply divided Congress.
                        Nineteen Republican senators joined all 50 Democrats in supporting the legislation, defying opposition from
                        former President and some conservative groups.
                    </p>

                    <p>
                        "Infrastructure shouldn't be a partisan issue," said Senator Robert Johnson, a key Republican negotiator.
                        "These investments will benefit every state and every American, regardless of political affiliation."
                    </p>

                    <div className="bg-gray-100 p-6 rounded my-8">
                        <blockquote className="text-xl italic border-l-4 border-red-700 pl-4">
                            "This bill proves that we can work across the aisle to deliver real results for the American people. It's
                            a testament to what's possible when we put politics aside and focus on the needs of our country."
                        </blockquote>
                        <p className="text-right font-semibold mt-2">— Senate Minority Leader</p>
                    </div>

                    <h2>Economic Impact</h2>

                    <p>
                        According to White House estimates, the infrastructure package is expected to create approximately 2 million
                        jobs per year over the next decade. Economic analysts project that the investments will enhance
                        productivity, reduce supply chain bottlenecks, and improve economic competitiveness on the global stage.
                    </p>

                    <p>
                        "This is exactly the kind of bold investment we need to jumpstart our economy and create good-paying jobs,"
                        said the Secretary of Transportation. "Modern infrastructure is essential for economic growth in the 21st
                        century."
                    </p>

                    <h2>Next Steps</h2>

                    <p>
                        The bill now heads to the House of Representatives, where it faces a more uncertain future. Progressive
                        Democrats have indicated they won't support the infrastructure bill unless it's paired with a larger $3.5
                        trillion budget reconciliation package focused on climate change, healthcare, and education.
                    </p>

                    <p>
                        House Speaker has committed to bringing both bills to the floor, but the timing remains unclear. The House
                        is currently in recess until September, though members could be called back earlier to vote on the
                        infrastructure package.
                    </p>

                    <p>
                        Despite the challenges ahead, the Senate's approval of the infrastructure bill represents a significant
                        achievement and a potential turning point for bipartisan cooperation in Congress.
                    </p>

                    <p>
                        "Today's vote shows that democracy can still work," said the President in a statement. "We can still come
                        together to tackle big challenges and deliver real results for the American people."
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <Badge variant="outline">Infrastructure</Badge>
                    <Badge variant="outline">Senate</Badge>
                    <Badge variant="outline">Bipartisan</Badge>
                    <Badge variant="outline">Transportation</Badge>
                    <Badge variant="outline">Economy</Badge>
                </div>

                <Separator className="mb-8" />

                {/* Author Bio */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border">
                            <AvatarImage src="/placeholder.svg?height=100&width=100&text=SJ" alt="Sarah Johnson" />
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Sarah Johnson</h3>
                            <p className="text-sm text-muted-foreground mb-2">Political Correspondent</p>
                            <p className="text-sm mb-4">
                                Sarah Johnson is a senior political correspondent for Spring News, covering Congress and national
                                politics. She has been reporting from Washington for over a decade and has covered three presidential
                                administrations.
                            </p>
                            <Button variant="outline" size="sm">
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <CommentSection articleId="infrastructure-bill" />
            </div>
        </div>
    )
}
