/* wall-quick-elem */
/* quick is a step of shorthanding,
	these quick function will wrap up parts that are wordy,
	or should be simple.
*/
/* quick element wraps element functionality
	such as events and appending.
*/

// qe.on(elem, fn);
export function on(elem, name, fn, opts) {
	// opts are special addEventListener options.
	elem.addEventListener(name, fn, opts);
}
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
