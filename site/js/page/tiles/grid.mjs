/** Tiles page helper: Grid */

import { elem } from '/js/wall.js';

export default class GridConcept {
	method=undefined;
	active=0;
	constructor(){
		this.elem = elem`div class=tile-grid`();
	}
	reset() {
		this.elem.text = '';
	}
	addOne(anime) {
		const count = this.elem.kids.length;
		const kid = elem`span class='tile hide anime${anime}'`(' '); //(count + 1);
		this.elem.append(kid);
		return kid;
	}
	fillRow(anime, delayMod) {
		delayMod = delayMod ?? 1;
		const last = this.addOne(anime);
		last.elem.classList.remove('hide');
		const count = this.elem.query(':scope>span.tile').length;
		const oComp = this.elem.comp;
		const oWidth = parseInt(oComp.width);
		const iWidth = parseInt(last.comp.width);
		const full = (oWidth - (oWidth % iWidth)) / iWidth;
		const space = full - count % full;
		for (let i=0; i<space; i++) {
			const kid = this.addOne(anime);
			this.active += 1;
			const that = this;
			setTimeout(function(){
				kid.elem.classList.remove('hide');
				that.active -= 1;
			}, (delayMod * 80 * (i+1)));
		}
	}
	needRow() {
		const pos = this.elem.elem.getBoundingClientRect();
		return pos.bottom <= window.innerHeight;
	}
	fillPage(anime, delayMod) {
		if (anime) {
			delayMod = delayMod ?? 1;
			this.method = [anime, delayMod];
		}
		//this._fillPage();
		return new Promise((res, rej)=>this._fillPage(res));
	}
	_fillPage(done) {
		const [anime, delayMod] = this.method;
		this.fillRow(anime, delayMod);
		const that = this;
		setTimeout(function(){
			if (that.needRow()) {
				that._fillPage(done);
			} else {
				done();
			}
		}, delayMod * 400);
		/*const that = this;
		for (let i=0; i<2; i++) {
			setTimeout(function(){
				that.fillRow(anime, delayMod);
			}, delayMod * 400 * i);
		}*/
	}
	//...Array.from({length:20},(v,k)=>span`class=tile`())
}
