const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/forums`;

const index = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const res = await fetch(BASE_URL, {
      method: 'GET', // Explicitly specify method for clarity
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.err || `Failed to fetch forums: ${res.status}`);
    }

    const data = await res.json();
    console.log('Raw response:', data);
    return data;
  } catch (err) {
    console.error('Error in index function:', err.message);
    throw new Error(err.message || 'Failed to fetch forums');
  }
};

const create = async (forumData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(forumData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.err || `Failed to create forum: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error in create function:', err.message);
    throw new Error(err.message || 'Failed to create forum');
  }
};

const update = async (forumId, forumData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const res = await fetch(`${BASE_URL}/${forumId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(forumData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.err || `Failed to update forum: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error in update function:', err.message);
    throw new Error(err.message || 'Failed to update forum');
  }
};

const deleteForum = async (forumId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const res = await fetch(`${BASE_URL}/${forumId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.err || `Failed to delete forum: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error in deleteForum function:', err.message);
    throw new Error(err.message || 'Failed to delete forum');
  }
};

const getById = async (forumId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const res = await fetch(`${BASE_URL}/${forumId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.err || `Failed to fetch forum: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error in getById function:', err.message);
    throw new Error(err.message || 'Failed to fetch forum');
  }
};

export { index, create, update, deleteForum, getById };