import * as api from "./api.js"

export async function getAllPublications() {
    return api.get(`/data/publications`)

}
export async function createPublication(data) {
    return api.post('/data/publications', data)
}

export async function addComment(data) {
    return api.post('/data/comments', data)
}

export async function getById(id) {
    return api.get(`/data/publications/` + id)
}

export async function editPublication(id, data) {
    return api.put('/data/publications/' + id, data)
}

export async function deletePublication(id) {
    return api.del('/data/publications/' + id)
}

export async function getComments(publicationId) {
    return api.get(`/data/comments?where=publicationId%3D%22${publicationId}%22`)
}

export async function getUserPublications(userId) {
    return api.get(`/data/publications?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
// export async function search(query) {
//     return api.get(`/data/cars?where=year%3D${query}`)
// }

// }
// export async function editListing(id, data) {
//     return api.put('/data/cars/' + id, data)
// }

// }
// export async function deleteListing(id) {
//     return api.del('/data/cars/' + id)
// }


// }


export const login = api.login
export const register = api.register
export const logout = api.logout