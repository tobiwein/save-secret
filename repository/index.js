import core from '@actions/core';
import github from '@actions/github';
import { Octokit } from 'octokit';
import { getPublicKey, encryptValue, saveSecret } from '../common/main.js';
import { log, debug, logJson, debugJson } from '../common/log.js';

async function run() {
    const token = core.getInput('token');
    const repoName = core.getInput('repositoryName');
    const repoOwner = core.getInput('repositoryOwner');
    const secret = core.getInput("secret");
    const name = core.getInput("secretName");

    let api = core.getInput('githubApi');
    if (api === '') {
        api = github.context.apiUrl;
    }

    log(token)
    log(env)
    log(secret)
    log(api)
    log(repoName)
    log(repoOwner)

    const publicKeyUrl = "/repos/" + repoOwner + "/" + repoName + "/actions/secrets/public-key";
    log(publicKeyUrl)
    const publicKey = await getPublicKey(api, token, publicKeyUrl);
    log(publicKey)
    const key = publicKey.key;
    log(key)
    const keyId = publicKey.keyId;
    log(keyId)

    const encryptedValue = await encryptValue(secret, key);
    log("enc: " + encryptedValue);
    const environmentSecretUrl = "/repos/" + repoOwner + "/" + repoName + "/actions/secrets/" + name;
    saveSecret(api, token, environmentSecretUrl, encryptedValue, keyId);
}

run();
