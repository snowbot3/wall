/** wall-func **/

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
