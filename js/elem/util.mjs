/* wall-elem-util */

export function handleProp(elem, key, val) {
	// make a map when more are needed
	if ( key == 'class' ) { key = 'className'; }
	if ( val[0] == '+' && key == 'className' && elem[key] ) { // must pre-exist
		elem[key] += ' ' + val.slice(1);
	} else {
		elem[key] = val;
	}
}

export function handleProps(elem, props) {
	for (let key in props) {
		handleProp(elem, key, props[key]);
	}
}
