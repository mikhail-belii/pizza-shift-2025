import { Response } from "./constants.js"
import { getToken } from "./tokenService.js"

export async function sendOtp(url, requestBody) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        })

        let resp = new Response()
        resp.isSuccess = true

        if (!response.ok) {
            resp.isSuccess = false
        }
    
        const data = await response.json()
        resp.response = data
        return resp
    }
    catch (err) {
        throw err
    }
}

export async function signin(url, requestBody) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        })

        let resp = new Response()
        resp.isSuccess = true

        if (!response.ok) {
            resp.isSuccess = false
        }
    
        const data = await response.json()
        resp.response = data
        return resp
    }
    catch (err) {
        throw err
    }
}

export async function getProfile(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })

        let resp = new Response()
        resp.isSuccess = true

        if (!response.ok) {
            resp.isSuccess = false
            return resp
        }
    
        const data = await response.json()
        resp.response = data
        return resp
    }
    catch (err) {
        throw err
    }
}

export async function editProfile(url, requestBody) {
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getToken()}`
            },
            body: requestBody
        })

        let resp = new Response()
        resp.isSuccess = false

        if (response.ok) {
            resp.isSuccess = true
            return resp
        }
    
        const data = await response.json()
        resp.response = data
        return resp
    }
    catch (err) {
        throw err
    }
}

export async function getPizzas(url) {
    try {
        const response = await fetch(url, {
            method: "GET"
        })

        let resp = new Response()
        resp.isSuccess = true

        if (!response.ok) {
            resp.isSuccess = false
            return resp
        }
    
        const data = await response.json()
        resp.response = data
        return resp
    }
    catch (err) {
        throw err
    }
}
