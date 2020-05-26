/** 
 * App Site
 */

import { css, dom, elem } from './wall/all.mjs';
import elNav from './view/nav.mjs';
import elRoute from './view/route.mjs';

css(`.l-outer {
	display: grid;
	height: 100%;
	grid-template-columns: 100px auto;
	grid-template-rows: auto;
	grid-template-areas: "side main";
}`, `.l-side {
	display: block;
	grid-area: side;
}`, `.l-main {
	display: block;
	grid-area: main;
}`);

const body = elem(document.body);
body.append(dom(function(div){
	return div`class=l-outer`(
		div`class=l-side`(
			elNav()
		),
		div`class=l-main`(
			elRoute()
		)
	);
}));
