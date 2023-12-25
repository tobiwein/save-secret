import core from '@actions/core'

export function log(message) {
    console.log(message);
}

export function debug(message) {
    if (core.isDebug()) {
        core.debug(message);
    }
}

export function logJson(jsonObj) {
    Object.entries(jsonObj).forEach(([key, value]) => {
        console.log(key + ": " + value);
    });
    for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            log("${key}: ${jsonObj[key]}");
        }
    }
}

export function debugJson(jsonObj) {
    if (core.isDebug()) {
        for (const key in jsonObj) {
            if (jsonObj.hasOwnProperty(key)) {
                debug("${key}: ${jsonObj[key]}");
            }
        }
    }
}
