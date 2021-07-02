/**
 * props tag tmpl
 */

function isQuote(char) {
	return char == '"' || char == "'";
}

function next_prop_value(tmpl, args, next) {
	if (next === undefined) {
		next = tmpl[0][0];
		if (isQuote(next)) {
			tmpl[0] = tmpl[0].slice(1);
		} else {
			next = /\s/;
		}
	}
	let nind = tmpl[0].search(next);
	// what if end of template.
	if (nind == -1) {
		if (args.length > 0) {
			const parts = [tmpl.shift(), args.shift(), next_prop_value(tmpl, args, next)];
			if (parts[0] === '' && parts[2] === '') {
				return parts[1]; // allows non-string
			}
			return parts.join('');
		}
		nind = tmpl[0].length;
	}
	const dleg = isQuote(next) ? 1 : 0;
	const part = tmpl[0].slice(0, nind + dleg);
	tmpl[0] = tmpl[0].slice(nind + dleg);
	if (isQuote(next)) {
		return part.slice(0, -1);
	}
	return part;
}

function safe_props(tmpl, args) {
	const obj = {};
	tmpl[0] = tmpl[0].trimLeft();
	// if raw.length == 0; then end
	// if raw.length >= 1 && raw[0].length == 0; then end
	while (tmpl.length > 0 && tmpl[0].length > 0) {
		const ind = tmpl[0].search(/[=\s]/); // class=cats or checked
		if (ind == -1) {
			if (tmpl.length > 1) {
				throw new Error('tmpl_props: bad format: ' + tmpl);
			}
			obj[tmpl.shift()] = true;
		} else {
			const key = tmpl[0].slice(0, ind); // 0 ~ 4 = clas
			if (tmpl[0][ind] == '=') {
				tmpl[0] = tmpl[0].slice(ind + 1);
				const value = next_prop_value(tmpl, args);
				obj[key] = value;
			} else {
				tmpl[0] = tmpl[0].slice(ind);
				obj[key] = true;
			}
			tmpl[0] = tmpl[0].trimLeft();
		}
	}
	return obj;
}

export default function props(tmpl, ...args) {
	return (
		safe_props(
			Array.from(tmpl.raw || tmpl),
			Array.from(args)
		)
	);
}
