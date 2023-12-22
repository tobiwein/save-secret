import core from '@actions/core';
import github from '@actions/github';
import { Octokit } from 'octokit';

async function run() {
    const api = core.getInput('githubApi');
    const token = core.getInput('token');
    const repo = core.getInput('repositoryId');
    const env = core.getInput('environmentName');
    const toEnc = core.getInput("valueToEncrypt");
    const name = core.getInput("secretName");

    const publicKeyUrl = "/repositories/" + repo + "/environments/" + env + "/secrets/public-key";
    const publicKey = getPublicKey(api, token, publicKeyUrl);
    const key = publicKey.key;
    const keyId = publicKey.KeyId;

    const encryptedValue = encryptValue(valueToEncrypt, key);
    const environmentSecretUrl = "repositories/" + repo + "/environments/" + env + "/secrets/" name;
    saveSecret(api, token, environmentSecretUrl, encryptedValue, keyId);
}

run();
