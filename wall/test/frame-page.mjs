/**
 * JavaScript Module with default function that returns a WallPage object, for testing.
 */

import page from '../js/page.mjs';

export default function() {
	const elem = page();
	elem.append('Hello Frames!?');
	elem.onload(function(){
		elem.append('Loaded!');
	});
	elem.onunload(function(){
		elem.append('Unloaded?');
	});
	return elem;
}

export function second() {
	const elem = page();
	elem.elem.innerHTML = `<div>Good Bye!</div><div>Now go away...</div>`;
	return elem;
}
