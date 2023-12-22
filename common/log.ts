import core from '@actions/core'

export function log(message: string): void {
    console.log(message);
}

export function debug(message: string): void {
    core.debug(message);
}

export function logJson(jsonObj: Record<string, any>): void {
    for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            log("${key}: ${jsonObj[key]}");
        }
    }
}

export function debugJson(jsonObj: Record<string, any>): void {
    for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            debug("${key}: ${jsonObj[key]}");
        }
    }
}