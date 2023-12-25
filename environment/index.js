import core from '@actions/core';
import github from '@actions/github';
import { getPublicKey, encryptValue, saveSecret } from '../common/main.js';
import { log, debug, logJson, debugJson } from '../common/log.js';

async function run() {
    const token = core.setSecret(core.getInput('token'));
    const repo = core.getInput('repositoryId');
    const env = core.getInput('environment');
    const secret = core.setSecret(core.getInput("secret"));
    const name = core.getInput("secretName");

    let api = core.getInput('githubApi');
    if (api === '') {
        api = github.context.apiUrl;
    }

    log(`Retireving public key of environment ${env} of repository ${repo}`);

    const publicKeyUrl = `/repositories/${repo}/environments/${env}/secrets/public-key`;
    log(publicKeyUrl)
    const publicKey = core.setSecret(await getPublicKey(api, token, publicKeyUrl));
    const key = core.setSecret(publicKey.key);
    const keyId = core.setSecret(publicKey.keyId);

    const encryptedValue = core.setSecret(await encryptValue(secret, key));
    const environmentSecretUrl = `/repositories/${repo}/environments/${env}/secrets/${name}`;
    log(environmentSecretUrl)

    log(`Saving secret value with name ${name}`);

    saveSecret(api, token, environmentSecretUrl, encryptedValue, keyId);
}

run();
