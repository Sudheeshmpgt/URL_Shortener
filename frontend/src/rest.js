export const RestURL = "http://localhost:9000/api"
export let RestService = {
    async signup(body) {
        let headers = { 'Content-Type': 'application/json'}
        return fetch(RestURL + "/user/new", {
            method: "POST", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async login(body) {
        let headers = { 'Content-Type': 'application/json'}
        return fetch(RestURL + "/user/login", {
            method: "POST", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async createShortUrl(body, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + "/url/new", {
            method: "POST", 
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    async getAllUrl(userId, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + `/url/get-all/${userId}`, {
            method: "GET", 
            headers,
        }).then(res => res.json())
    },
    async redirectToLongURL(shortUrlId, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + `/url/redirect/${shortUrlId}`, {
            method: "PUT", 
            headers,
            body: JSON.stringify({})
        }).then(res => res.json())
    },
    async deleteUrl(urlId, token) {
        let headers = { 'Content-Type': 'application/json', 'access-token':token }
        return fetch(RestURL + `/url/delete/${urlId}`, {
            method: "DELETE", 
            headers,
        }).then(res => res.json())
    },
    
}