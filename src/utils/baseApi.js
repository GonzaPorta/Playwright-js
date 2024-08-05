export class BaseApi{
    constructor(){
        this.baseUrl = 'https://regres.in/api';
        this.accesToken = null;
    }

    async getToken(secretId, type){
        const requestBody = {
            secret_id: secretId,
            type: type
        };

        try {
            const response = await fetch(`${this.baseUrl}/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const responseData = await response.json();
                this.accessToken = responseData.access_token;
                return this.accessToken;
            } else {
                throw new Error('Failed to get token');
            }
        } catch (error) {
            throw new Error('Error fetching token: ' + error.message);
        }
    }

    getAccessToken() {
        return this.accessToken;
    }
}