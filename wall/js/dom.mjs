/** wall-dom **/

import * as wall_args from './args.mjs';
import { elem } from './elem.mjs';

function convertCamelToDash(camel) {
    return camel.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

// element templating
export function dom(func) {
    const names = wall_args.names(func);
    const args = names.map(function(name) {
        name = convertCamelToDash(name);
        return elem.bind(this, name);
    }, this);
    return func.apply(this, args);
}
