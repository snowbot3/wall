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

function handleChild(elem, child) {
	if (child instanceof Node) {
		elem.appendChild(child);
	} else if (typeof(child) == 'object') {
		if (child.elem instanceof Node) {
			elem.appendChild(child.elem);
		} else {
			throw new Error('WallElemUtil: unknown object type: ' + child);
		}
	} else {
		elem.appendChild(document.createTextNode(child));
	}
}

export function handleChildren(elem, ...children) {
	for (let child of children) {
		handleChild(elem, child);
	}
}