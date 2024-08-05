const { test, expect } = require ('@playwright/test');

test.describe.parallel('API Testing @serviciofa', () => {
    const baseUrl = 'https://regres.in/api'

    test("Simple 1 @interfaz ", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)
        expect(response.statusText()).toMatch('OK')

        const responseBody = await response.text()
        console.log(responseBody)
        // const responseBody = JSON.parse(await response.text())
    })

    test("Simple 2 @interfaz", async ({ request }) => {
        const response = await request.get(`${baseUrl}/user/non-existing-endpoint`)
        expect(response.status()).toBe(200)//404

        const posts = await response.json();
        const first = posts[0]
        const comentsResponse = await request.get(
            `${baseUrl}/user/non-existing-endpoint/posts/${firtsId}`);
        expect(comentsResponse.status()).toBe(200);

        const comemntsPo = await comentsResponse.json();
        expect(comemntsPo.length).toBeGreaterThan(0);
        expect(comemntsPo[0].postId).toBe(first.id);
        console.log(comemntsPo[0].postId)
    })

    test("GET Request - Get User Detail", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = await response.text()

        expect(response.status()).toBe(200)//201
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.id).toContain('Janet')
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.email).toBeTruthy()
    })

    test("POST Request - Create New User", async ({ request }) => {
        const response = await request.post(`${baseUrl}/user`, {
            data: {
                id: 1000,
            },
        })
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

        expect(responseBody.id).toBe(1000)
    })

    test("POST Request - Login", async ({ request }) => {

        // Create POST api request
        const response = await request.post(`${baseUrl}/user`, {
            data: {
                email: 'gonzalo@hotmail.com.ar',
                password: 'citybell',
                "totalprice": 1000,
                "bookingdates":{
                    "checkin": "2024-05-11",
                    "checkout": "2024-05-12"
                },
                "additionaneeds": "super bowls"
            }
        })

        const responseBody = await response.json();
        console.log(responseBody)

        // Validate status code
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200)

        // Validate JSON api response
        expect(response.totalprice).toHaveProperty(1000);
        expect(response.totalprice).toHaveProperty("");
    })

    test("POST Request - Login Fail", async ({ request }) => {
        const response = await request.post(`${baseUrl}/user`, {
            data: {
                email: 'gonzalo@hotmail.com.ar',
            },
        })
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe('Missing password')
    })

    test("PUT Request - Update User", async ({ request }) => {
        const response = await request.post(`${baseUrl}/user/2`, {
            data: {
                name: 'gonzalo',
                job: 'new job',
            },
        })
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe('new name')
        expect(responseBody.updateAt).toBeTruthy()
    })

    test("DELETE Request - Delete User", async ({ request }) => {
        const response = await request.post(`${baseUrl}/user/2`)
        expect(response.status()).toBe(204)
    })
})