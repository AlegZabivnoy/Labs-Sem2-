class AuthProxy {
    constructor(httpClient, authMethod) {
        this.httpClient = httpClient;
        this.authMethod = authMethod;
    }

    async request(url, options = {}) {
        const authenticatedOptions = this.authMethod.applyAuth(options);

        console.log(`Proxy intercepted a request to ${url}`);

        const response = await this.httpClient.request(url, authenticatedOptions);

        if (response.status === 401) {
            console.error("Proxy error: 401 Unauthorized");
        }
        return response;
    }
}

module.exports = AuthProxy;