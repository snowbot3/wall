/** Route **/

import { elem, frame as wall_frame } from '../wall/all.mjs';

function hashToPage(hash) {
	if (hash[0] == '#') { hash = hash.slice(1); }
	return `../page/${hash || 'home'}.mjs`;
}

export default function route(){
	const frm = wall_frame();
	frm.onhash(function(ev) {
		frm.load(import(hashToPage(window.location.hash)));
	}, true);
	return frm;
}
