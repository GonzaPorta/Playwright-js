// import { test, expect } from '@playwright/test';
// import { BaseApi } from '../../src/utils/baseApi.js';
// import { ProviderOfQuery } from "../../src/db/helpers-query/proveedor-querys";

// test.describe('API Testing', () => {
//     const providerQuery = new ProviderOfQuery();
//     const baseUrl = 'https://regres.in/api'
//     let accesToken;

//     test.beforeAll('Get Token', async () => {
//         const baseApi = new BaseApi()
//         accesToken = await baseApi.getAccessToken();
//     })

// // Agregar archivo similar a testsuite metodos chargedParams y setBody
//     test("GET", async () => {
//         try{
//             const queryParams = new URLSearchParams({
//                 ID : 12345,
//                 PRICE : 'TUBE'
//             });

//             const datosDestino = await providerQuery.obtenerNumeroDeShipping();

//             const requestBody = {
//                 id: 172,
//                 phone: '123456789',
//                 city: 'Buenos Aires',
//                 moneda: datosDestino.MONEDA
//             };

//             const endpoint = `${baseUrl}?${queryParams}`;
//             const response = await fetch(endpoint, {
//                 method: 'GET',
//                 Headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${accesToken}`
//                 },
//                 body: JSON.stringify(requestBody)
//             });


//             expect(response.status()).toBe(200)
//             expect(response.statusText()).toMatch('OK')

//             const responseBody = await response.text()
//             console.log(responseBody);
//             console.log(response);
//         } catch (error) {console.error("Error:", error)}
//     })

//     test("POST", async () => {
//             const response = await fetch(`${baseUrl}/user`, {
//                 method: 'POST',
//                 Headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${accesToken}`
//                 },
//                 body: JSON.stringify({ key: 'llave', telefono: '123456789' })
//             });
//             expect(response.status()).toBe(201)
//     })
// });
// const baseUrl = 'https://regres.in/api'

// const queryParams = {
//     ID : 12345,
//     PRICE : 'TUBE'
// };

// const requestBody = {
//     id: 172,
//     phone: '123456789',
//     city: 'Buenos Aires'
// };
// const response = await fetch(`${baseUrl}?${queryParams}`, {
//     method: 'GET',
//     Headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': `Bearer ${accesToken}`
//     },
//     body: JSON.stringify(requestBody)
// });
// expect(response.status()).toBe(200)
// expect(response.statusText()).toMatch('OK')
// const responseBody = await response.text()
// console.log(responseBody);
// console.log(response);

// const baseUrl = 'https://reqres.in/api'; // Corregido "regres.in" a "reqres.in" para que la URL sea válida

// // Valores para enviar x queryParams
// const queryParams = new URLSearchParams({
//     ID: 12345,
//     PRICE: 'TUBE'
// });

// // Valores para las Path Variables
// const userId = 123;
// const action = 'update';

// const requestBody = {
//     id: 172,
//     phone: '123456789',
//     city: 'Buenos Aires'
// };

// // Construir la URL con los query params
// const urlWithParams = `${baseUrl}/users/${userId}?${queryParams}`;

// try {
//     const response = await fetch(urlWithParams, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`
//         }
//     });

//     expect(response.status()).toBe(200);
//     expect(response.statusText()).toMatch('OK');
    
//     const responseBody = await response.json();
//     console.log(responseBody);
// } catch (error) {
//     console.error('Se produjo un error:', error);
// }