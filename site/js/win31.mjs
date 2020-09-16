/** 
 * Old Win Style Site
 * http://www.michaelv.org/
 * http://www.windows93.net/
 */

import { css, doms, dom } from './wall.js';
css.link('/css/win31.css');

function px(px) {
	return '' + px + 'px';
}

function dragWin(win, ev) {
	const b = document.body;
	const ox = parseInt(win.style.left || 0) - ev.pageX;
	const oy = parseInt(win.style.top || 0) - ev.pageY;
	function onMouseMove(ev) {
		const x = ev.pageX + ox;
		const y = ev.pageY + oy;
		win.style.left = px(x);
		win.style.top = px(y);
	}
	function onMouseUp(ev) {
		b.removeEventListener('pointermove', onMouseMove);
	}
	b.addEventListener('pointerup', onMouseUp, { once: true });
	b.addEventListener('pointermove', onMouseMove);
}

function uiWinTitle(title) {
	const s = dom`span class=ui-win-title draggable`(title);
	function onDragStart(ev) {
		ev.preventDefault();
		dragWin( s.parentElement.parentElement.parentElement, ev );
	}
	s.addEventListener('dragstart', onDragStart);
	return s;
}
function uiWinTitleBar(title) {
	return doms('div', 'span', 'button', (d, b)=>d`class=ui-win-titlebar`(
		b`class='ui-button ui-win-titlemnu'`('\u2212'),
		uiWinTitle(title),
		b`class='ui-button ui-win-min'`('\u2227'),
		b`class='ui-button ui-win-max'`('\u2228')
	));
}
// todo: need an easy way to alter min-height and min-width
function uiWin(title, ...children) {
	return doms('div', d=>d`class='ui-win'`(
		d`class=ui-win-outer`(
			uiWinTitleBar(title),
			d`class=ui-win-inner`(
				...children
			)
		)
	));
}

function uiTextSelect(...children){
	return dom`span class=ui-text-select`(...children);
}

class WinManager {
	constructor() {
		this.list = [];
	}
	add(win) {
		const x = this.list.length * 20;
		win.style.left = win.style.top = px(x);
		document.body.appendChild(win);
		win.addEventListener('mousedown', ()=>this.onWinMDown(win));
		this.list.push(win);
	}
	onWinMDown(win) {
		console.log('click: ', win.nextElementSibling);
		if (win.nextElementSibling != null) {
			console.log('append child');
			const par = win.parentElement;
			par.appendChild(win);
		}
	}
	
}

class WinFormIdea {
	constructor(){
		//this.view = doms('div', 'form','label', 'input type=text', 'textarea', 'button', (d,f,l,i,t,b)=>d(
		this.view = doms('div', 'form','label', 'input', 'textarea', 'button', function (d,f,l,i,t,b) {
			const it=i`type=text`;
			return d(
				f`action='#' onsubmit=${(ev)=>this.onSubmit(ev)}`(
					d(l('First Name'), it`name=first`()),
					d(l('Last Name'), it`name=last`()),
					d(l('Note'), t()),
					d(b`type=submit`('Submit'))
				)
			);
		});
		// need to set (parent '.ui-win').style = 'min-width:250px;min-height:250px;'
	}
	onSubmit(ev) {
		ev.preventDefault();
	}
}

const man = new WinManager();
man.add(uiWin( 'Some Title', uiTextSelect('something else')));
man.add(uiWin( 'Title 2', uiTextSelect('something else')));
man.add(uiWin( 'Title C', (new WinFormIdea()).view));
man.add(uiWin( 'Another', uiTextSelect('something else')));
