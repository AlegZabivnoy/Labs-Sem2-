class AuthMethod {
    constructor(token) {
        this.token = token;
    }

    applyAuth(options) {
        const headers = options.headers || {};
        return {
            ...options,
            headers: {
                ...headers,
                'Authorization': `Bearer ${this.token}`
            }
        }
    }
}

module.exports = { AuthMethod };