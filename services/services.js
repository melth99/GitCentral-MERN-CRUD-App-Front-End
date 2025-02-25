// import axios from 'axios';

// // Base URL for your backend API (replace with your actual backend URL)
// const API_URL = 'http://localhost:3001/api'; // Example URL, adjust as needed

// // Create an Axios instance with default headers
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add an interceptor to include the JWT token in requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // Error handler
// const handleError = (error) => {
//   console.error('API Error:', error.response?.data || error.message);
//   throw error.response?.data || error.message;
// };

// // User Authentication Services
// export const signUp = async (userData) => {
//   try {
//     const response = await api.post('/users/signup', userData);
//     localStorage.setItem('token', response.data.token);
//     return response.data.user; // Assumes backend returns user object
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const signIn = async (credentials) => {
//   try {
//     const response = await api.post('/users/signin', credentials);
//     localStorage.setItem('token', response.data.token);
//     return response.data.user; // Assumes backend returns user object
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const signOut = () => {
//   localStorage.removeItem('token');
// };

// export const getCurrentUser = async () => {
//   try {
//     const response = await api.get('/users/me');
//     return response.data; // Assumes backend returns current user data
//   } catch (error) {
//     handleError(error);
//   }
// };

// // User Profile Services
// export const getUserProfile = async (userId) => {
//   try {
//     const response = await api.get(`/users/${userId}/profile`);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const updateUserProfile = async (userId, profileData) => {
//   try {
//     const response = await api.put(`/users/${userId}/profile`, profileData);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// // Topic Services
// export const getTopics = async () => {
//   try {
//     const response = await api.get('/topics');
//     return response.data; // Returns list of topics
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const getTopicById = async (topicId) => {
//   try {
//     const response = await api.get(`/topics/${topicId}`);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// // Post Services
// export const getPostsByTopic = async (topicId) => {
//   try {
//     const response = await api.get(`/topics/${topicId}/posts`);
//     return response.data; // Returns list of posts for the topic
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const createPost = async (topicId, postData) => {
//   try {
//     const response = await api.post(`/topics/${topicId}/posts`, postData);
//     return response.data; // Returns created post
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const getPostById = async (topicId, postId) => {
//   try {
//     const response = await api.get(`/topics/${topicId}/posts/${postId}`);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const updatePost = async (topicId, postId, postData) => {
//   try {
//     const response = await api.put(`/topics/${topicId}/posts/${postId}`, postData);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const deletePost = async (topicId, postId) => {
//   try {
//     const response = await api.delete(`/topics/${topicId}/posts/${postId}`);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// // Dashboard Services (e.g., fetching all users, if needed)
// export const index = async () => {
//   try {
//     const response = await api.get('/users');
//     return response.data; // Returns list of users
//   } catch (error) {
//     handleError(error);
//   }
// };

// export default {
//   signUp,
//   signIn,
//   signOut,
//   getCurrentUser,
//   getUserProfile,
//   updateUserProfile,
//   getTopics,
//   getTopicById,
//   getPostsByTopic,
//   createPost,
//   getPostById,
//   updatePost,
//   deletePost,
//   index,
// };