/** @module wall-elem-util */

import { dash2camel } from '../oddity.mjs';

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
	} else if ( key.startsWith('data-') ) {
		//elem.setAttribute(key, val);
		const key2 = dash2camel(key.slice(5));
		elem.dataset[key2] = val;
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
