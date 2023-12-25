import core from '@actions/core';
import github from '@actions/github';
import { getPublicKey, encryptValue, saveSecret } from '../common/main.js';
import { log, debug, logJson, debugJson } from '../common/log.js';

async function run() {
    const token = core.setSecret(core.getInput('token'));
    const repo = core.getInput('repository');
    const secret = core.setSecret(core.getInput("secret"));
    const name = core.getInput("secretName");

    let api = core.getInput('githubApi');
    if (api === '') {
        api = github.context.apiUrl;
    }

    log(`Retrieving public key of repository ${repo}`);

    const publicKeyUrl = `/repos/${repo}/actions/secrets/public-key`;
    log()
    const publicKey = core.setSecret(await getPublicKey(api, token, publicKeyUrl));
    const key = core.setSecret(publicKey.key);
    const keyId = core.setSecret(publicKey.keyId);

    const encryptedValue = core.setSecret(await encryptValue(secret, key));
    const repoSecretUrl = `/repos/${repo}/actions/secrets/${name}`;

    log(`Saving secret value with name ${name}`);

    saveSecret(api, token, repoSecretUrl, encryptedValue, keyId);
}

run();
