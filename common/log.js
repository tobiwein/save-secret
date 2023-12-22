import core from '@actions/core'

export function log(message: string) {
    console.log(message);
}

export function debug(message: string) {
    core.debug(message);
}

export function logJson(jsonObj) {
    for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            log("${key}: ${jsonObj[key]}");
        }
    }
}

export function debugJson(jsonObj) {
    for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            debug("${key}: ${jsonObj[key]}");
        }
    }
}