import core from '@actions/core';
import github from '@actions/github';
import { getPublicKey, encryptValue, saveSecret } from '../common/main.js';
import { log, debug } from '../common/log.js';

async function run() {
    const token = core.getInput('token');
    const repo = core.getInput('repositoryId');
    const env = core.getInput('environment');
    const secret = core.getInput("secret");
    const name = core.getInput("secretName");

    let api = core.getInput('githubApi');
    if (api === '') {
        api = github.context.apiUrl;
    }

    log(`Retireving public key of environment '${env}' with repository ID '${repo}'.`);

    const publicKeyUrl = `/repositories/${repo}/environments/${env}/secrets/public-key`;
    const publicKey = await getPublicKey(api, token, publicKeyUrl);
    const key = publicKey.key;
    const keyId = publicKey.keyId;

    debug(`Environment public key: ${key}`);
    debug(`Key ID: ${keyId}`);

    const encryptedValue = await encryptValue(secret, key);
    const environmentSecretUrl = `/repositories/${repo}/environments/${env}/secrets/${name}`;

    log(`Saving secret value with name '${name}'.`);

    saveSecret(api, token, environmentSecretUrl, encryptedValue, keyId);

    log("Done.");
}

run();
