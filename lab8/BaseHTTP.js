class baseHttpClient {
    async request(url, options={}) {
        const response = await fetch(url, options);
        return response;
    }
}

module.exports = baseHttpClient;