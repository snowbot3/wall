/** 
 * Old Win Style Site
 * http://www.michaelv.org/
 * http://www.windows93.net/
 */

import { css, doms, dom } from './wall/all.mjs';
css.link('/css/win31.css');

function uiWinTitle(title) {
	return doms('div', 'span', 'button', (d,s, b)=>d`class=ui-win-titlebar`(
		b`class='ui-button ui-win-titlemnu'`('\u2212'),
		s`class=ui-win-title`(title),
		b`class='ui-button ui-win-min'`('\u2227'),
		b`class='ui-button ui-win-max'`('\u2228')
	));
}
function uiWin(title, ...children) {
	return doms('div', d=>d`class=ui-win`(
		d`class=ui-win-outer`(
			uiWinTitle(title),
			d`class=ui-win-inner`(
				...children
			)
		)
	));
}

function uiTextSelect(...children){
	return dom`span class=ui-text-select`(...children);
}

document.body.appendChild(uiWin(
	'some title',
	uiTextSelect('something else')
));
