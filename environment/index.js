import core from '@actions/core';
import github from '@actions/github';
import { Octokit } from 'octokit';
import { getPublicKey, encryptValue, saveSecret } from '../common/main.js';
import { log, debug, logJson, debugJson } from '../common/log.js';

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

    debug(token)
    debug(env)
    debug(secret)
    debug(name)
    debug(api)
    debug(repo)

    const publicKeyUrl = "/repositories/" + repo + "/environments/" + env + "/secrets/public-key";
    debug(publicKeyUrl)
    const publicKey = getPublicKey(api, token, publicKeyUrl);
    debugJson(publicKey)
    const key = publicKey.key;
    debug(key)
    const keyId = publicKey.KeyId;
    debug(keyId)

    const encryptedValue = encryptValue(secret, key);
    const environmentSecretUrl = "repositories/" + repo + "/environments/" + env + "/secrets/" + name;
    saveSecret(api, token, environmentSecretUrl, encryptedValue, keyId);
}

run();
