/** 
 * App Site
 */

import { css, dom, elem, frame } from './wall/all.mjs';
css.link('/css/global.css');

function link(url, text) {
	return dom((div,a)=>div(
		a`href=${url}`(text)
	));
}

const frmSide = frame();
const frmMain = frame();
frame.onhash(async function(hash){
	const mod = import(`./page/${hash || 'home'}.mjs`);
	frmMain.load(mod, 'main'); // mod.default
	try {
		await frmSide.load(mod, 'side');
	} catch(e) {
		frmSide.load(elem('div'));
	}
}, true);

const body = elem(document.body);
body.append(dom(function(div, hr) {
	return div`class=l-outer`(
		div`class=l-side`(
			div`class=l-side-nav`(
				div`style=margin-bottom:1em`(
					div`class=bb`('Nav:'),
					link('#', 'Home'),
					link('#settings', 'Settings'),
					link('#clock', 'Clock'),
					link('#notes', 'Notes'),
					link('#tiles', 'Tiles'),
				),
				frmSide
			)
		),
		div`class=l-main`(
			frmMain
		)
	);
}));
