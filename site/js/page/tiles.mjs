/** Tiles page */

import { css, dom, elem } from '../wall/all.mjs';

css.link('./css/tiles.css').then(function(sheet){
	// how many colors?
	// color css function rgb(0-255,0-255,0-255);
	const colors = [];
	for (let i=0; i<18; i++) {
		const red = i % 2;
		const rRed = (i - red) / 2;
		const green = rRed % 3;
		const blue = (rRed - green) / 3;
		const cRed = 127 + 128 * red;
		const cGreen = 127 + 64 * green;
		const cBlue = 127 + 64 * blue;
		if (cRed == cGreen && cRed == cBlue) { continue; }
		colors.push(`rgb(${cRed},${cGreen},${cBlue})`);
	}
	console.log(colors);
	// sheet.insert => sheet.elem.sheet.insertRule(rule, ind);
	colors.forEach((color, ind, arr)=>sheet.insert(`
		span.tile:nth-child(${arr.length+1}n+${ind+1}){
			background-color: ${color};
		}
	`));
});

class GridConcept {
	constructor(){
		this.elem = dom('div')`class=tile-grid`();
	}
	reset() {
		this.elem.text = '';
	}
	addOne(anime) {
		const count = this.elem.kids.length;
		const kid = dom('span')`class='tile hide anime${anime}'`(count + 1);
		this.elem.append(kid);
		return kid;
	}
	fillRow(anime) {
		const last = this.addOne(anime);
		last.elem.classList.remove('hide');
		const count = this.elem.query(':scope>span.tile').length;
		const oComp = this.elem.comp();
		const oWidth = parseInt(oComp.width);
		const iWidth = parseInt(last.comp().width);
		const full = (oWidth - (oWidth % iWidth)) / iWidth;
		const space = full - count % full;
		for (let i=0; i<space; i++) {
			const kid = this.addOne(anime);
			setTimeout(function(){
				kid.elem.classList.remove('hide');
			}, (80 * (i+1)));
		}
	}
	fillPage(anime) {
		const that = this;
		for (let i=0; i<8; i++) {
			setTimeout(function(){
				that.fillRow(anime);
			}, 400 * i);
		}
	}
	//...Array.from({length:20},(v,k)=>span`class=tile`())
}

export default function() {
	let grid = new GridConcept();
	function wrap(cmd, ...params) {
		return function(ev){
			ev.preventDefault();
			grid[cmd](...params);
			return false;
		}
	}
	return dom((div,span,a)=>div`class=tile-outer`(
		div`class=tile-controls`(
			//a({ href: '#tiles', onclick: wrap('reset') }, 'Reset'),
			a`href=#tiles onclick=${wrap('reset')}`('Reset'),
			' ',
			a`href=#tiles onclick=${wrap('addOne')}`('Add 1'),
			' ',
			a`href=#tiles onclick=${wrap('fillRow')}`('Fill Row'),
			' ',
			span`style='display:inline-block;width:2em;'`(' '),
			' Fill Page::',
			a`href=#tiles onclick=${wrap('fillPage', 'none')}`('Quick'),
			' ',
			a`href=#tiles onclick=${wrap('fillPage', 'fadein')}`('Fade In'),
			' ',
			a`href=#tiles onclick=${wrap('fillPage', 'fadeup')}`('Fade Up'),
			' ',
			a`href=#tiles onclick=${wrap('fillPage', 'upoff')}`('Up Offset'),
			' ',
			a`href=#tiles onclick=${wrap('fillPage', 'skew')}`('Skew')
		),
		grid.elem
	));
};
