/** wall-dom **/

import * as wall_args from './args.mjs';
import * as conv from './conv.mjs';
import { elem } from './elem.mjs';

// element templating
export function dom(func) {
	const names = wall_args.names(func);
	const args = names.map(function(name) {
		name = conv.camel2dash(name);
		return elem.bind(this, name);
	}, this);
	return func.apply(this, args);
}
