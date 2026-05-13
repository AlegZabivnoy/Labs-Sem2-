const baseHttpClient = require('./BaseHTTP');
const gitHubService = require('./GitHubService');
const AuthProxy = require('./AuthProxy');

const { AuthMethod } = require('./AuthStrategies.js');

async function run() {
    const client = new baseHttpClient();
    const auth = new AuthMethod("my_secret_token_123");
    const proxy = new AuthProxy(client, auth);
    const github = new gitHubService(proxy);

    try {
        const data = await github.getUserRepo("AlegZabivnoy/Labs-Sem2-");

        console.log(`Success`);
        console.log(`Name of repo: ${data.name}`);
        console.log(`Private: ${data.private}`);
    } catch (error) {
        console.error("Eror", error.message);
    }
}

run();