import core from '@actions/core';
import github from '@actions/github';
import { Octokit } from 'octokit';
import { getPublicKey, encryptValue, saveSecret } from '../common/main.js';

async function run() {
    const token = core.getInput('token');
    const env = core.getInput('environmentName');
    const secret = core.getInput("secret");
    const name = core.getInput("secretName");

    let api = core.getInput('githubApi');
    if (api === '') {
        api = github.context.apiUrl;
    }
    let repo = core.getInput('repositoryId');
    if (repo === '') {
        repo = github.context.repositoryId;
    }

    const publicKeyUrl = "/repositories/" + repo + "/environments/" + env + "/secrets/public-key";
    const publicKey = getPublicKey(api, token, publicKeyUrl);
    const key = publicKey.key;
    const keyId = publicKey.KeyId;

    const encryptedValue = encryptValue(secret, key);
    const environmentSecretUrl = "repositories/" + repo + "/environments/" + env + "/secrets/" + name;
    saveSecret(api, token, environmentSecretUrl, encryptedValue, keyId);
}

run();
