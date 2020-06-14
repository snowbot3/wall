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

/** concept */
async function acyc(obj, params) {
	return cyc(await obj, params);
}
function cyc(obj, params) {
	if (obj instanceof Promise) {
		return acyc(obj, params);
	} else if (obj instanceof Function || typeof obj == 'function') {
		if (params.length > 0) {
			return cyc(obj(), params);
		}
	} else if (obj instanceof Object) {
		if (typeof params[0] == 'string' && params[0] in obj) {
			return cyc(obj[params[0]], params.slice(1));
		}
	} else if (typeof obj == 'object') {
		// only force default for module object
		if (typeof params[0] == 'string' && params[0] in obj) {
			return cyc(obj[params[0]], params.slice(1));
		} else if ('default' in obj) {
			return cyc(obj['default'], params);
		}
	}
	return obj;
}
export function cycle(obj, ...params) {
	return cyc(obj, params);
}

// a1,b1,c1,a2,c2,c3
export function merge(...a) {
	a = a.filter(a=>a instanceof Array);
	const res = [];
    for (let i=0; a.length>0; i++) {
        res.push(a.map(a=>a[i]));
        a = a.filter(a=>a.length<=i);
    }
    return res.flat();
}
export function arr(tmpl, ...params) {
	return merge(tmpl, params);
}
export function str(...params) {
	return arr(...params).join('');
}
