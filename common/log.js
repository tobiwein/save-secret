import core from '@actions/core'

export function log(message) {
    console.log(message);
}

export function debug(message) {
    if (core.isDebug()) {
        core.debug(message);
    }
}

function isNestedKeyValuePair(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function logJson(jsonObj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
    
            console.log(`${indent}${key}:`);
    
            if (isNestedKeyValuePair(value)) {
                printKeyValuePairs(value, `${indent}  `);
            } else {
                console.log(`${indent}  ${value}`);
            }
        }
    }
}

export function debugJson(jsonObj) {
    if (core.isDebug()) {
        for (const key in jsonObj) {
            if (jsonObj.hasOwnProperty(key)) {
                debug(`${key}: ${jsonObj[key]}`);
            }
        }
    }
}
