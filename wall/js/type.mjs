/** wall-type **/

export function is(type, value) {
	if (typeof type === 'function') {
		if (value instanceof type) {
			return true;
		}
		const typetype = typeof type.prototype.valueOf();
		if (typetype !== 'object') {
			return (typetype === typeof value);
		}
	}
	return false;
}

export function isSimpleObject(value) {
	return (
		is(Object, value)
		&& value.constructor == Object
	);
}

export function name(val) {
	if (val === undefined || val === null) {
		return '' + val;
	}
	let type = typeof val;
	if (type !== 'object') {
		return (
			type.charAt(0).toUpperCase()
			+ type.slice(1)
		);
	}
	return val.constructor.name;
}

export function names(...args) {
	return args.map((arg)=>name(arg));
}

function match(values, types, func, ...args) {
	if (is(Array, values)) {
		if (is(Array, types) && is(Function, func)) {
			// check types.
			if (values.length === types.length) {
				if (types.every((type,ind)=>is(type,values[ind]))) {
					return func;
				}
			}
			return match(values, ...args);
		} else if (is(Function, types) && func === undefined) {
			// types is now default function
			return types
		}
	}
	throw new Error('wall-type: match');
}

export function run(that, args, ...params) {
	if (is(Array, that)) {
		params.unshift(args);
		args = that;
		that = {};
	}
	if (is(Array, args)) {
		const func = match(args, ...params);
		return func.apply(that, args);
	}
	throw new Error('wall-type: run');
}
