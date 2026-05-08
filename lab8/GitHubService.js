class gitHubService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async getUserRepo (repo) {
        console.log(`fetch user repo ${repo}`);

        const response = await this.httpClient.request(`https://api.github.com/repos/${repo}`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`)
        }
        return await response.json();
    }
}

module.exports = gitHubService;
