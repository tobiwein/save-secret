import core from '@actions/core';
import github from '@actions/github';
import sodium from 'libsodium-wrappers';
import { Octokit } from 'octokit';
import { log, debug, logJson, debugJson } from './log.js';

export async function getPublicKey(api, token, url) {
    try {
        const octokit = new Octokit({
            baseUrl: api,
            auth: token
        });

        const response = await octokit.request('GET {url}', {
            url: url,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        if (core.isDebug()) {
            debug("Status: " + response.status);
            debug("URL: " + response.url);
            debugJson(response.headers);
        }

        return {
            key: response.data.key,
            keyId: response.data.key_id
        };
    } catch (error) {
        core.setFailed(error.message);
        throw error;
    }
}

export async function saveSecret(api, token, url, secret, id) {
    try {
        const octokit = new Octokit({
            baseUrl: api,
            auth: token
        });

        const response = await octokit.request('PUT {url}', {
            url: url,
            encrypted_value: secret,
            key_id: id,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        if (core.isDebug()) {
            debug("Status: " + response.status);
            debug("URL: " + response.url);
            debugJson(response.headers);
        }
    } catch (error) {
        core.setFailed(error.message);
        throw error;
    }
}

export function encryptValue(valueToEncrypt, publicKey) {
    sodium.ready.then(() => {
      let binkey = sodium.from_base64(publicKey, sodium.base64_variants.ORIGINAL)
      let binsec = sodium.from_string(valueToEncrypt)

      let encBytes = sodium.crypto_box_seal(binsec, binkey)

      let output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL)

      return output;
    });
}
