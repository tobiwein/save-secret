import core from '@actions/core';
import github from '@actions/github';
import { Octokit } from 'octokit';
import { getPublicKey, encryptValue, saveSecret } from '../common/main.js';
import { log, debug, logJson, debugJson } from '../common/log.js';

async function run() {
    const token = core.getInput('token');
    const repo = core.getInput('repositoryId');
    const env = core.getInput('environmentName');
    const secret = core.getInput("secret");
    const name = core.getInput("secretName");

    let api = core.getInput('githubApi');
    if (api === '') {
        api = github.context.apiUrl;
    }

    log(token)
    log(env)
    log(secret)
    log(name)
    log(api)
    log(repo)

    const publicKeyUrl = "/repositories/" + repo + "/environments/" + env + "/secrets/public-key";
    log(publicKeyUrl)
    const publicKey = await getPublicKey(api, token, publicKeyUrl);
    log(publicKey)
    const key = publicKey.key;
    log(key)
    const keyId = publicKey.KeyId;
    log(keyId)

    const encryptedValue = await encryptValue(secret, key);
    log("enc: " + encryptedValue);
    const environmentSecretUrl = "/repositories/" + repo + "/environments/" + env + "/secrets/" + name;
    saveSecret(api, token, environmentSecretUrl, encryptedValue, keyId);
}

run();
