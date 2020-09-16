import { WallElem } from './base.mjs';
import * as frame from '../frame.mjs';

Object.assign(WallElem.prototype, {
	load: async function load(original, fnname) {
		return frame.load(this.elem, original, fnname);
	},
	onload: function onload(fn) {
		frame.onload(this.elem, fn.bind(this));
	},
	onunload: function onunload(fn) {
		frame.onunload(this.elem, fn.bind(this));
	}
});
