/** Tiles page */

import { css, elem, doms } from '/js/wall.js';
import GridConcept from './tiles/grid.mjs';

css.link('./css/tiles.css').then(function(sheet){
	// how many colors?
	// color css function rgb(0-255,0-255,0-255);
	const colors = [];
	const dRed = 4;
	const dGreen = 5;
	const dBlue = 5;
	for (let i=0; i<(dRed*dGreen*dBlue); i++) {
		const red = i % dRed;
		const rRed = (i - red) / dRed;
		const green = rRed % dGreen;
		const blue = (rRed - green) / dBlue;
		const cRed = 127 + Math.floor(128 / (dRed - 1)) * red;
		const cGreen = 127 + Math.floor(128 / (dGreen - 1)) * green;
		const cBlue = 127 + Math.floor(128 / (dBlue - 1)) * blue;
		if (cRed == cGreen && cRed == cBlue) { continue; }
		colors.push(`rgb(${cRed},${cGreen},${cBlue})`);
	}
	colors.sort(()=>Math.random()*4-2); // lazy shuffle
	console.log(colors);
	// sheet.insert => sheet.elem.sheet.insertRule(rule, ind);
	colors.forEach((color, ind, arr)=>sheet.insert(`
		div.tile-outer span.tile:nth-child(${arr.length+1}n+${ind+1}){
			background-color: ${color};
		}
	`));
});

const grid = new GridConcept();
const scroll = elem`div class=tile-scroll`();

export function side() {
	function wrap(cmd, ...params) {
		return function(ev){
			ev.preventDefault();
			if (cmd == 'addOne') {
				const rtn = grid[cmd](...params);
				rtn.elem.classList.remove('hide');
			} else {
				grid[cmd](...params);
			}
			return false;
		}
	}
	let lastMethod;
	function page(...params) {
		if (params[0]) {
			lastMethod = params;
		}
		return wrap('fillPage', ...params);
	}
	// this will duplicate every navigate the current way it is written...
	window.addEventListener('scroll', function(ev){
		if (lastMethod && grid.active == 0) {
			const pos = scroll.elem.getBoundingClientRect();
			if (pos.top < window.innerHeight) {
				grid['fillPage']();
			}
		}
	});
	return doms((div,span,a)=>div`class=tile-controls`(
		//a({ href: '#tiles', onclick: wrap('reset') }, 'Reset'),
		div`style='display:inline-block;width:2em;height:2em;border-bottom:1px solid black;'`(' '),
		div(' Tile Base::'),
		div( a`href=#tiles onclick=${wrap('reset')}`('Reset') ),
		div( a`href=#tiles onclick=${wrap('addOne')}`('Add 1') ),
		div( a`href=#tiles onclick=${wrap('fillRow')}`('Fill Row') ),
		div`style='display:inline-block;width:2em;height:2em;border-bottom:1px solid black;'`(' '),
		div(' Fill Page::'),
		div( a`href=#tiles onclick=${page('none', 0)}`('Quick') ),
		div( a`href=#tiles onclick=${page('fadein')}`('Fade In') ),
		div( a`href=#tiles onclick=${page('fadeup')}`('Fade Up') ),
		div( a`href=#tiles onclick=${page('upoff')}`('Up Offset') ),
		div( a`href=#tiles onclick=${page('skew')}`('Skew') ),
		div( a`href=#tiles onclick=${page('puzzle')}`('Puzzle') )
	));
};
export default function() {
	return doms((div,span,a)=>div`class=tile-outer`(
		grid.elem,
		scroll
	));
};
