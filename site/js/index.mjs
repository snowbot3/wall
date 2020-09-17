/** 
 * App Site
 */

import { css, doms, elem, frame } from './wall.js';
css.link('/css/global.css');

function link(url, text) {
	return doms((div,a)=>div(
		a`href=${url}`(text)
	));
}

const elem_frame = elem`div class=jsframe`;
const frmSide = elem_frame(); //frame();
const frmMain = elem_frame();
frmMain.onload(function(ev){ this.elem.classList.remove('loading'); });
//frmMain.onunload(function(ev){ this.elem.classList.add('loading'); });

frame.onhash(async function(hash){
	const mod = import(`./page/${hash || 'home'}.mjs`);
	frmMain.elem.classList.add('loading');
	frmMain.load(mod, 'main'); // mod.default
	try {
		await frmSide.load(mod, 'side');
	} catch(e) {
		frmSide.load(elem('div'));
	}
}, true);

const body = elem(document.body);
body.append(doms(function(div, hr) {
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
