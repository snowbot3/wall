/** @module wall-elem-util */

/**
 * Alter a property on an element
 * @param {DomElement} elem
 * @param {String} key 
 * @param {*} val
 */
export function handleProp(elem, key, val) {
	// make a map when more are needed
	if ( key == 'class' ) { key = 'className'; }
	if ( val[0] == '+' && key == 'className' && elem[key] ) { // must pre-exist
		elem[key] += ' ' + val.slice(1);
	} else {
		elem[key] = val;
	}
}

/**
 * Alter multiple properties of an element
 * @param {DomElement} elem 
 * @param {Object} props - key-values to change
 */
export function handleProps(elem, props) {
	for (let key in props) {
		handleProp(elem, key, props[key]);
	}
}
