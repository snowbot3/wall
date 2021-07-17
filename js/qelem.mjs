/**
 * @module wall-quick-elem
 * quick is a step of shorthanding, these quick function will wrap up parts that are wordy, or should be simple.
 * quick element wraps element functionality such as events and appending.
 */

/**
 * wrap event binding
 * @param elem {DomElement}
 * @param name {string} Event name
 * @param fn {function} Event handler
 * @param opt {Object}
 */
export function on(elem, name, fn, opts) {
	elem.addEventListener(name, fn, opts);
}
/**
 * wrap event triggering
 * @param elem {DomElement}
 * @param name {string}
 * @param detail {Object}
 * @returns {Event}
 */
export function emit(elem, name, detail) {
	// no clue how 'detail' works, just including it.
	const ev = new CustomEvent(name, {
		//bubbles: true,
		detail: detail || {}
	});
	return elem.dispatchEvent(ev);
}
export function query(elem, selector) {
	return elem.querySelectorAll(selector);
}
export function clear(elem) {
	elem.innerHTML = ''; // fasted tested method of clearing.
}

function appendOne(elem, kid) {
	if (kid instanceof Node) {
		elem.appendChild(kid);
	} else if (kid instanceof Array) {
		append(elem, ...kid);
	} else if (typeof(kid) == 'object') {
		if (kid.elem instanceof Node) {
			elem.appendChild(kid.elem);
		} else {
			throw new Error('Wall:Quick:Elem: unknown object type: ' + kid);
		}
	} else {
		elem.appendChild(document.createTextNode(kid));
	}
}

export function append(elem, ...kids) {
	for (let kid of kids) {
		appendOne(elem, kid);
	}
}
