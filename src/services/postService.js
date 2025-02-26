// frontend/services/postService.js
import { getToken } from './tokenService';

const API_URL = 'http://localhost:3000';

// Helper function to build headers with token
const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Conditionally add Authorization
  };
};

// Create a new post
export async function createPost(postData) {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create post: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw error; // Re-throw to be handled by the caller
  }
}

// Get all posts
export async function getPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch posts: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Get a single post by ID
export async function getPost(postId) {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch post: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Update an existing post
export async function updatePost(postId, postData) {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update post: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Delete a post
export async function deletePost(postId) {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete post: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}