// src/services/postService.js

import * as tokenService from './tokenService'

const BASE_URL = '/api/posts'

export async function createPost(postData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    return await res.json()
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

