import core from '@actions/core';
import github from '@actions/github';
import { getPublicKey, encryptValue, saveSecret } from '../common/main.js';
import { log, debug } from '../common/log.js';

async function run() {
    const token = core.getInput('token');
    const org = core.getInput('organisation');
    const secret = core.getInput("secret");
    const name = core.getInput("secretName");

    let api = core.getInput('githubApi');
    if (api === '') {
        api = github.context.apiUrl;
    }

    log(`Retrieving public key of organisation '${org}'.`);

    const publicKeyUrl = `/orgs/${org}/actions/secrets/public-key`;
    const publicKey = await getPublicKey(api, token, publicKeyUrl);
    const key = publicKey.key;
    const keyId = publicKey.keyId;

    debug(`Organisation public key: ${key}`);
    debug(`Key ID: ${keyId}`);

    const encryptedValue = await encryptValue(secret, key);
    const orgSecretUrl = `/orgs/${org}/actions/secrets/${name}`;

    log(`Saving secret value with name '${name}'.`);

    saveSecret(api, token, orgSecretUrl, encryptedValue, keyId);

    log("Done.");
}

run();
