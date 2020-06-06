import { WallElem } from './base.mjs';

export class WallElemList extends Array {
	constructor(elems) {
		super(...elems);
		/*if (elems && elems.length) {
			this.push(...elems);
		}*/
	}
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
