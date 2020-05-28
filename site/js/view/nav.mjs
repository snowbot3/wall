/** 
 * App Nav
 */

import { css, dom, elem } from '../wall/all.mjs';

function link(url, text){
	return elem('div',
		elem('a', {
			href: url
		}, text)
	);
}

export default function nav() {
	return dom(function(div, a){
		return div(
			div('Nav:'),
			link('#', 'Home'),
			link('#settings', 'Settings'),
			link('#clock', 'Clock'),
			link('#tiles', 'Tiles'),
		);
	});
}
