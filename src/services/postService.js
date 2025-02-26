import { getToken } from './tokenService';

const API_URL = 'http://localhost:3000';

export async function createPost(postData) {
  const token = getToken();
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }), // Only add if token exists
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
}

export async function updatePost(postId, postData) {
  const token = getToken();
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
}