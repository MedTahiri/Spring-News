// Helper function to format dates safely
const formatDate = (dateString) => {
    if (!dateString) return 'Recently published';

    try {
        const date = new Date(dateString);
        // Check if date is valid
        if (isNaN(date.getTime())) return 'Recently published';

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Recently published';
    }
};

const API_BASE_URL = 'http://localhost:8080/api';

export const News = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/published`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data.map(article => ({
            id: article.id,
            title: article.title,
            excerpt: article.resume,
            content: article.content,
            image: article.image,
            category: article.theme,
            date: formatDate(article.publicationDate),
            views: article.views || 0,
            comment: article.comments?.length || 0,
            journalist: {
                firstname: article.author?.firstName || 'Unknown',
                lastname: article.author?.lastName || 'Author'
            }
        }));
    } catch (error) {
        console.error('Error fetching published articles:', error);
        throw error;
    }
};

export const TopNews = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/published`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // top 5 articles sorted by views (or by date)
        const topArticles = data
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 3);

        return topArticles.map(article => ({
            id: article.id,
            title: article.title,
            image: article.image,
            category: article.theme,
            date: formatDate(article.publicationDate)
        }));
    } catch (error) {
        console.error('Error fetching top news:', error);
        throw error;
    }
};

export const getArticleById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const article = await response.json();

        return {
            id: article.id,
            title: article.title,
            excerpt: article.resume,
            content: article.content,
            image: article.image,
            category: article.theme,
            date: formatDate(article.publicationDate),
            views: article.views || 0,
            comment: article.comments?.length || 0,
            journalist: {
                firstname: article.author?.firstName || 'Unknown',
                lastname: article.author?.lastName || 'Author'
            },
            tags: article.tags || []
        };
    } catch (error) {
        console.error('Error fetching article by ID:', error);
        throw error;
    }
};

export const getAllArticles = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/all`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data.map(article => ({
            id: article.id,
            title: article.title,
            excerpt: article.resume,
            content: article.content,
            image: article.image,
            category: article.theme,
            date: new Date(article.createdAt).toLocaleDateString(),
            views: article.views || 0,
            comment: article.comments?.length || 0,
            status: article.status,
            journalist: {
                firstname: article.author?.firstName || 'Unknown',
                lastname: article.author?.lastName || 'Author'
            }
        }));
    } catch (error) {
        console.error('Error fetching all articles:', error);
        throw error;
    }
};