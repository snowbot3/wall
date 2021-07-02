import { WallElem } from './base.mjs';

export class WallElemList extends Array {
	constructor(elems) {
		super(...elems);
		/*if (elems && elems.length) {
			this.push(...elems);
		}*/
	}
	// elem.kids[0] == dom child
	// elem.kids.get(0) == elem wrapped dom child
	get(index) {
		return new WallElem(this[index]);
	}
	each(fn, ...params) {
		const list = this;
		return this.forEach(function(node, ind, arr){
			const elem = list.get(ind);
			fn.call(elem, elem, ind, arr);
		}, ...params);
	}
	// forEach(function(value, index, array){});
	// forEachW(function(wallelem, index, array, elem){});
}

/*
	query(selector) {
		const list = this.elem.querySelectorAll(selector);
		//return Array.prototype.map.call(list, (el)=>new WallElem(el));
		return new WallElemList(list);
	}
	// queryOne?
	get kids() {
		return new WallElemList(this.elem.children);
	}
*/

/*WallElem.prototype.query = function query(selector) {
	const list = this.elem.querySelectorAll(selector);
	//return Array.prototype.map.call(list, (el)=>new WallElem(el));
	return new WallElemList(list);
};*/
Reflect.set(WallElem.prototype, 'query', function query(selector) {
	const list = this.elem.querySelectorAll(selector);
	//return Array.prototype.map.call(list, (el)=>new WallElem(el));
	return new WallElemList(list);
});
Reflect.defineProperty(WallElem.prototype, 'kids', {
	get: function kids(){
		return new WallElemList(this.elem.children);
	}
});
