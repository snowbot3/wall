/** wall-css **/

import { is as isType, isSimpleObject } from './type.mjs';

function convertCamelToDash(camel) {
    return camel.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

let sheet;

/*
function css(selector, declaration, ...rest) {
    if (!isType(String, selector)) {
        new Error('wall-css: css: requires String selector');
    }
    if (!isSimpleObject(declaration)) {
        new Error('wall-css: css: requires simple Object declaration');
    }
    if (!sheet) {
        const style = document.createElement('style');
        document.head.appendChild(style);
        sheet = style.sheet;
    }
    let data = selector + ' { ';
    for (let property in declaration) {
        const value = declaration[property];
        data += convertCamelToDash(property) + ': ' + value + '; '
    }
    data += '}';
    sheet.insertRule(data, sheet.cssRules.length);
    if (rest && rest.length > 0) {
        css(...rest);
    }
}
*/

function cssSingle(data) {
    if (!isType(String, data)) {
        new Error('wall-css: css: requires String full css text');
    }
    if (!sheet) {
        const style = document.createElement('style');
        document.head.appendChild(style);
        sheet = style.sheet;
    }
    sheet.insertRule(data, sheet.cssRules.length);
}

export function css(...params) {
    params.forEach(cssSingle);
}
