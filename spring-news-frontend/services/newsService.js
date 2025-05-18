const newsArticles = [
    {
        id: "1",
        title: "Senate Passes Historic Infrastructure Bill After Months of Negotiations",
        excerpt: "The $1.2 trillion package represents the largest investment in public works in decades",
        category: "Politics",
        content: "After months of intense negotiations and bipartisan efforts, the Senate has finally passed the much-anticipated infrastructure bill, marking a significant legislative victory. The comprehensive package, totaling $1.2 trillion, aims to revitalize America's aging infrastructure, create millions of jobs, and boost economic growth across the nation.",
        image: "https://placehold.co/1200x800.svg?text=Infrastructure",
        tag: ["infrastructure", "economy"],
        journalist: {
            id: "1",
            firstname: "Sarah",
            lastname: "Johnson",
            role: "journalist",
            bio: "Sarah Johnson is a senior political correspondent for Spring News, covering Congress and national politics. She has been reporting from Washington for over a decade and has covered three presidential administrations."
        },
        date: "May 16, 2025",
        status: "published",
        views: 1024,
        comment: 128,
    },
    {
        id: "2",
        title: "Breakthrough AI Model Sets New Standards in Healthcare Diagnostics",
        excerpt: "A new AI system detects early-stage diseases with unprecedented accuracy",
        category: "Technology",
        content: "Researchers at TechHealth Labs have unveiled an advanced AI model capable of diagnosing a range of diseases with over 95% accuracy. Experts believe this breakthrough could revolutionize medical diagnostics, particularly in underserved regions.",
        image: "https://placehold.co/1200x800.svg?text=AI+Healthcare",
        tag: ["ai", "healthcare"],
        journalist: {
            id: "1",
            firstname: "Sarah",
            lastname: "Johnson",
            role: "journalist",
            bio: "Sarah Johnson is a senior political correspondent for Spring News, covering Congress and national politics. She has been reporting from Washington for over a decade and has covered three presidential administrations."
        },
        date: "May 15, 2025",
        status: "pending",
        views: 850,
        comment: 92,
    },
    {
        id: "3",
        title: "Climate Summit Ends with Ambitious Global Emission Pledges",
        excerpt: "World leaders agree on significant carbon reduction goals for 2030",
        category: "World",
        content: "The global climate summit concluded today with countries committing to aggressive emission cuts. The agreement emphasizes renewable energy investment and stricter environmental policies to limit global warming to 1.5°C.",
        image: "https://placehold.co/1200x800.svg?text=Climate+Summit",
        tag: ["climate", "environment", "policy"],
        journalist: {
            id: "3",
            firstname: "Amina",
            lastname: "El-Tayeb",
            role: "journalist",
            bio: "Amina El-Tayeb is an environmental journalist who has reported on international climate policies and global ecological movements for over 8 years."
        },
        date: "May 14, 2025",
        status: "published",
        views: 1390,
        comment: 204,
    },
    {
        id: "4",
        title: "Tech Giant Announces Foldable AR Glasses at Annual Conference",
        excerpt: "The futuristic device combines AR with cutting-edge design",
        category: "Technology",
        content: "At its annual product event, VisionTech revealed its next-generation foldable AR glasses, offering real-time interaction overlays and seamless integration with smartphones. The product has been praised for its innovation and design.",
        image: "https://placehold.co/1200x800.svg?text=AR+Glasses",
        tag: ["ar", "gadgets", "innovation"],
        journalist: {
            id: "1",
            firstname: "Sarah",
            lastname: "Johnson",
            role: "journalist",
            bio: "Sarah Johnson is a senior political correspondent for Spring News, covering Congress and national politics. She has been reporting from Washington for over a decade and has covered three presidential administrations."
        },
        date: "May 13, 2025",
        status: "Rejected",
        views: 1120,
        comment: 147,
    },
    {
        id: "5",
        title: "New Economic Plan to Boost Small Business Growth Unveiled",
        excerpt: "The plan includes tax breaks and grants to stimulate entrepreneurship",
        category: "Economy",
        content: "The Department of Commerce has released a comprehensive strategy to support small businesses nationwide. The initiative includes tax incentives, reduced loan interest rates, and grant programs aimed at increasing economic resilience.",
        image: "https://placehold.co/1200x800.svg?text=Small+Business+Plan",
        tag: ["economy", "policy", "business"],
        journalist: {
            id: "5",
            firstname: "Natalie",
            lastname: "Kim",
            role: "journalist",
            bio: "Natalie Kim reports on economic policy and small business affairs, with a decade of experience covering financial legislation and commerce news."
        },
        date: "May 12, 2025",
        status: "published",
        views: 975,
        comment: 110,
    },
];


export async function News() {
    return (newsArticles)
}

export async function TopNews() {
    const topNewsArticles = [
        {
            id: "1",
            title: "Senate Passes Historic Infrastructure Bill After Months of Negotiations",
            excerpt: "The $1.2 trillion package represents the largest investment in public works in decades",
            category: "Politics",
            content: "After months of intense negotiations and bipartisan efforts, the Senate has finally passed the much-anticipated infrastructure bill, marking a significant legislative victory. The comprehensive package, totaling $1.2 trillion, aims to revitalize America's aging infrastructure, create millions of jobs, and boost economic growth across the nation.",
            image: "https://placehold.co/200x200.svg?text=Infrastructure",
            tag: ["infrastructure", "economy"],
            journalist: "Sarah Johnson",
            date: "May 16, 2025",
            views: 1024,
            comment: 128,
        },
        {
            id: "2",
            title: "Breakthrough AI Model Sets New Standards in Healthcare Diagnostics",
            excerpt: "A new AI system detects early-stage diseases with unprecedented accuracy",
            category: "Technology",
            content: "Researchers at TechHealth Labs have unveiled an advanced AI model capable of diagnosing a range of diseases with over 95% accuracy. Experts believe this breakthrough could revolutionize medical diagnostics, particularly in underserved regions.",
            image: "https://placehold.co/200x200.svg?text=AI+Healthcare",
            tag: ["ai", "healthcare"],
            journalist: "Liam Bennett",
            date: "May 15, 2025",
            views: 850,
            comment: 92,
        },
        {
            id: "3",
            title: "Climate Summit Ends with Ambitious Global Emission Pledges",
            excerpt: "World leaders agree on significant carbon reduction goals for 2030",
            category: "World",
            content: "The global climate summit concluded today with countries committing to aggressive emission cuts. The agreement emphasizes renewable energy investment and stricter environmental policies to limit global warming to 1.5°C.",
            image: "https://placehold.co/200x200.svg?text=Climate+Summit",
            tag: ["climate", "environment", "policy"],
            journalist: "Amina El-Tayeb",
            date: "May 14, 2025",
            views: 1390,
            comment: 204,
        }
    ]

    return (topNewsArticles)
}

export async function NewsById(newsId) {
    return (newsArticles[newsId])
}

export async function getAllNewsByJournalist(journalistId) {
    return newsArticles.filter((article) => article.journalist.id === journalistId);
}
