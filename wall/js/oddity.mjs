/** wall-oddity **/
// odd utility functions

export function one(fn) {
	let ran = false, res;
	return function(...args) {
		if (!ran) {
			res = fn.apply(this, args);
			ran = true;
		}
		return res;
	};
}

export function capitalize(str) {
	return (
		str.charAt(0).toUpperCase()
		+ str.slice(1)
	);
}
