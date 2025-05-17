import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge"
import Image from "next/image"
import {CalendarIcon, Clock, MessageSquare} from "lucide-react"
import Link from "next/link";

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-6">
            {/* Featured Article */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                <div className="lg:col-span-2">
                    <Card className="border-0 shadow-none">
                        <CardContent className="p-0">
                            <div className="relative h-[400px] mb-4">
                                <Image
                                    src="https://placehold.co/1200x800.svg"
                                    alt="Featured article image"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <Badge className="bg-red-700 mb-2">POLITICS</Badge>
                                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                                        Senate Passes Historic Infrastructure Bill After Months of Negotiations
                                    </h1>
                                    <p className="text-white/90 text-sm md:text-base">
                                        The $1.2 trillion package represents the largest investment in public works in
                                        decades
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <span className="font-semibold text-foreground mr-2">By Sarah Johnson</span>
                                <span className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1"/> May 15, 2025
                </span>
                                <span className="mx-2">|</span>
                                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1"/> 8 min read
                </span>
                                <span className="mx-2">|</span>
                                <span className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1"/> 128 comments
                </span>
                            </div>
                            <p className="text-lg leading-relaxed">
                                After months of intense negotiations and bipartisan efforts, the Senate has finally
                                passed the
                                much-anticipated infrastructure bill, marking a significant legislative victory. The
                                comprehensive
                                package, totaling $1.2 trillion, aims to revitalize America's aging infrastructure,
                                create millions of
                                jobs, and boost economic growth across the nation.
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2 font-bold">
                                <Link href="/article/1">
                                    Continue Reading →
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold border-b border-gray-200 pb-2">TOP NEWS</h2>

                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="border-0 shadow-none">
                            <CardContent className="p-0">
                                <div className="flex gap-4">
                                    <div className="relative w-24 h-24 flex-shrink-0">
                                        <Image
                                            src={`https://placehold.co/200x200.svg`}
                                            alt={`News story ${i}`}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div>
                                        <Badge className="mb-1" variant="outline">
                                            BUSINESS
                                        </Badge>
                                        <h3 className="font-bold mb-1 line-clamp-2">
                                            Tech Giant Announces Revolutionary AI Product at Annual Conference
                                        </h3>
                                        <p className="text-sm text-muted-foreground">May 15, 2025</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* News Categories */}
            <Tabs defaultValue="all" className="mb-10">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 mb-6">
                    <TabsTrigger
                        value="all"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none px-4 py-2"
                    >
                        All
                    </TabsTrigger>
                    <TabsTrigger
                        value="politics"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none px-4 py-2"
                    >
                        Politics
                    </TabsTrigger>
                    <TabsTrigger
                        value="business"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none px-4 py-2"
                    >
                        Business
                    </TabsTrigger>
                    <TabsTrigger
                        value="technology"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none px-4 py-2"
                    >
                        Technology
                    </TabsTrigger>
                    <TabsTrigger
                        value="health"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none px-4 py-2"
                    >
                        Health
                    </TabsTrigger>
                    <TabsTrigger
                        value="opinion"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none px-4 py-2"
                    >
                        Opinion
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card key={i} className="overflow-hidden">
                                <div className="relative h-48">
                                    <Image
                                        src={`https://placehold.co/600x400.svg`}
                                        alt={`Article ${i}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardHeader>
                                    <Badge className="w-fit" variant="outline">
                                        WORLD
                                    </Badge>
                                    <CardTitle className="line-clamp-2">
                                        Global Leaders Gather for Climate Summit as Deadline Looms
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2">
                                        <span>By Michael Chen</span>
                                        <span>•</span>
                                        <span>May 15, 2025</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="line-clamp-3">
                                        Representatives from over 190 countries have convened in Geneva to address the
                                        pressing issue of
                                        climate change, with just months remaining before the Paris Agreement deadline.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="link" className="p-0 h-auto">
                                        <Link href={`/article/${i}`}>
                                            Continue Reading →
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Other tab contents would be similar */}
                <TabsContent value="politics" className="mt-0">
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Select a different category to view more articles</p>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Video Section */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">FEATURED VIDEOS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative h-48 mb-2 overflow-hidden rounded">
                                <Image
                                    src={`https://placehold.co/400x300.svg`}
                                    alt={`Video ${i}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                                        <div
                                            className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-red-700 border-b-[8px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold line-clamp-2">Behind the Scenes: How the Infrastructure Bill Came
                                Together</h3>
                            <p className="text-sm text-muted-foreground">3:45 • May 14, 2025</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
