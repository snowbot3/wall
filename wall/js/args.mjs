/** wall-args **/

import * as wall_type from './type.mjs';

/**
 * original source: https://davidwalsh.name/javascript-arguments
 *  had to modify for anonymous functions.
**/
export function names(func) {
	if (!wall_type.is(Function, func)) {
		throw new Error('wall-func: argNames: bad argument');
	}
	let fnStr = func.toString(); // .replace(/[ \t\r\n]+/g, ' ');
	if (!fnStr.startsWith('function')) {
		if (fnStr.startsWith('class')) {
			throw new Error('wall-func: argNames: unsupported class argument: ' + fnStr);
		}
		let [args, body] = fnStr.split('=>').map(val=>val.trim());
		if (!args.startsWith('(')) {
			args = `(${args})`;
		}
		fnStr = `function ${args} { return (${body}); }`;
	}
	const args = fnStr.match(/function\s*.*?\(([^)]*)\)/)[1];
	return args.split(',').map(function(arg) {
		// clears out comments
		return arg.replace(/\/\*.*\*\//, '').trim();
	}).filter(function(arg) {
		return arg;
	});
}

/* Designed to use with argNames */
export function map(names, obj, backup, that) {
	return names.map(function(name){
		if (name in obj) {
			let arg = obj[name];
			if (arg instanceof Function) {
				arg = arg.bind(obj);
			}
			return arg;
		}
		if (backup) {
			if (backup instanceof Function) {
				return backup(name);
			}
			return backup;
		}
		throw new Error('wall-func: argMap: invalid name: ', name);
	});
}
