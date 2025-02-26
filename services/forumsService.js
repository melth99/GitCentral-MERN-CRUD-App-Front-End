import { stringify } from "querystring"

const BASE_URL = `${import.meta.env.VITE_BACK}/forums`

async function index() {
    try {
        const response = await fetch(BASE_URL)
        const data = await response.json() // Added await here
        return data
    } catch (err) {
        console.log(err)
        throw err // Re-throw the error for the caller to handle
    }
}

async function create(forumData) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Corrected header
            },
            body: JSON.stringify(forumData) // Removed extra stringify
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function deleteForum(forumIdFromData) {
    try {
        const response = await fetch(`${BASE_URL}/${forumIdFromData}`, { // Changed petId to forumIdFromData
            method: 'DELETE'
        })
        const data = await response.json()
        return data
    } catch(err) {
        console.log(err)
        throw err
    }
}

export { deleteForum, create, index }
