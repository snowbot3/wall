/**
 * props tag tmpl
 */

function next_prop_value(tmpl, args, next) {
	if (next === undefined) {
		next = tmpl[0][0];
		if (next == '"' || next == "'") {
			tmpl[0] = tmpl[0].slice(1);
		} else {
			next = ' ';
		}
	}
	let nind = tmpl[0].indexOf(next);
	// what if end of template.
	if (nind == -1) {
		if (args.length > 0) {
			// this should be more complex to allow objects to be passed through
			// currently everything become a single string value.
			const parts = [tmpl.shift(), args.shift(), next_prop_value(tmpl, args, next)];
			if (parts[0] === '' && parts[2] === '') {
				return parts[1]; // allows non-string
			}
			return parts.join('');
		}
		nind = tmpl[0].length;
	}
	const dleg = next == ' ' ? 0 : 1;
	const part = tmpl[0].slice(0, nind + dleg);
	tmpl[0] = tmpl[0].slice(nind + dleg);
	if (next != ' ') {
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
		const ind = tmpl[0].indexOf('='); // class=cats 5
		if (ind == -1) {
			throw new Error('tmpl_props: bad format');
		}
		//const key = tmpl[0].splice(0, ind).slice(0, -1);
		const key = tmpl[0].slice(0, ind); // 0 ~ 4 = clas
		tmpl[0] = tmpl[0].slice(ind + 1);
		const value = next_prop_value(tmpl, args);
		obj[key] = value;
		tmpl[0] = tmpl[0].trimLeft();
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
