/**
 * JavaScript Module with default function that returns a WallPage object, for testing.
 */

import wall_elem from '../js/elem.mjs';

export default function() {
	const elem = wall_elem('div');
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
	const elem = wall_elem('div');
	elem.elem.innerHTML = `<div>Good Bye!</div><div>Now go away...</div>`;
	return elem;
}
