import core from '@actions/core';
import github from '@actions/github';
import { getPublicKey, encryptValue, saveSecret } from '../common/main.js';
import { log, debug, logJson, debugJson } from '../common/log.js';

async function run() {
    const token = core.setSecret(core.getInput('token'));
    const repo = core.getInput('repositoryId');
    const env = core.getInput('environmentName');
    const secret = core.setSecret(core.getInput("secret"));
    const name = core.getInput("secretName");

    let api = core.getInput('githubApi');
    if (api === '') {
        api = github.context.apiUrl;
    }

    const publicKeyUrl = `/repositories/${repo}/environments/${env}/secrets/public-key`;
    const publicKey = core.setSecret(await getPublicKey(api, token, publicKeyUrl));
    const key = core.setSecret(publicKey.key);
    const keyId = core.setSecret(publicKey.keyId);

    const encryptedValue = core.setSecret(await encryptValue(secret, key));
    const environmentSecretUrl = `/repositories/${repo}/environments/${env}/secrets/${name}`;
    saveSecret(api, token, environmentSecretUrl, encryptedValue, keyId);
}

run();
