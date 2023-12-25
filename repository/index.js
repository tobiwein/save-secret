import core from '@actions/core';
import github from '@actions/github';
import { getPublicKey, encryptValue, saveSecret } from '../common/main.js';
import { log, debug, logJson, debugJson } from '../common/log.js';

async function run() {
    const token = core.getInput('token');
    const repo = core.getInput('repository');
    const secret = core.getInput("secret");
    const name = core.getInput("secretName");

    let api = core.getInput('githubApi');
    if (api === '') {
        api = github.context.apiUrl;
    }

    log(`Retrieving public key of repository ${repo}`);

    const publicKeyUrl = `/repos/${repo}/actions/secrets/public-key`;
    log(publicKeyUrl);
    const publicKey = await getPublicKey(api, token, publicKeyUrl);
    const key = publicKey.key;
    const keyId = publicKey.keyId;

    log(`Public Key: ${key}`);
    log(`Key ID: ${keyId}`);

    const encryptedValue = await encryptValue(secret, key);
    const repoSecretUrl = `/repos/${repo}/actions/secrets/${name}`;
    log(repoSecretUrl)

    log(`Saving secret value with name ${name}`);

    saveSecret(api, token, repoSecretUrl, encryptedValue, keyId);
}

run();
