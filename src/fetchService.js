import { Response } from "./constants.js"

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