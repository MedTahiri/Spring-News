// services/userService.js

const API_BASE_URL = 'http://localhost:8080/api/user'

// Login function
export const Login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        throw new Error('Login failed')
    }

    return await response.json()
}

// Register function
export const Register = async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ name, email, password })
    })

    if (!response.ok) {
        throw new Error('Registration failed')
    }

    return await response.json()
}

// Logout function
export const Logout = async () => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include', // Important for cookies
    })

    if (!response.ok) {
        throw new Error('Logout failed')
    }

    return true
}

// Get current user (using cookie)
export const GetCurrentUser = async () => {
    const response = await fetch(`${API_BASE_URL}/me`, {
        method: 'GET',
        credentials: 'include', // Important for cookies
    })

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Not authenticated')
        }
        throw new Error('Failed to get user')
    }

    return await response.json()
}

// Get all users (requires authentication)
export const GetAllUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/all`, {
        method: 'GET',
        credentials: 'include', // Important for cookies
    })

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Not authenticated')
        }
        throw new Error('Failed to get users')
    }

    return await response.json()
}

export async function getUserById(id) {
    const response = await fetch(`http://localhost:8080/api/user/find/${id}`, {
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user by id');
    }
    return await response.json();
}