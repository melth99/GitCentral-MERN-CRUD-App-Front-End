// frontend/services/forumsService.js
import { getToken } from './tokenService';

const API_URL = 'http://localhost:3000';

const getHeaders = () => {
  const token = getToken();
  console.log('Forum service headers:', { // Debug token
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  });
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Get all forums
export const index = async () => {
  try {
    const response = await fetch(`${API_URL}/forums`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to fetch forums: ${response.status} - ${data.error || 'Unknown error'}`);
    }
    console.log('Fetched forums:', data); // Debug
    return data;
  } catch (error) {
    console.error('Index forums error:', error.message);
    throw error;
  }
};

// Create a new forum
export const create = async (forumData) => {
  try {
    const response = await fetch(`${API_URL}/forums`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(forumData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to create forum: ${response.status} - ${data.error || 'Unknown error'}`);
    }
    console.log('Created forum:', data); // Debug
    return data;
  } catch (error) {
    console.error('Create forum error:', error.message);
    throw error;
  }
};

// Delete a forum
export const deleteForum = async (forumId) => {
  try {
    const response = await fetch(`${API_URL}/forums/${forumId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to delete forum: ${response.status} - ${data.error || 'Unknown error'}`);
    }
    console.log('Deleted forum:', data); // Debug
    return data;
  } catch (error) {
    console.error('Delete forum error:', error.message);
    throw error;
  }
};