/**
 * Wall Page
 * adds onload (on WallFrameLoad) onunload (on WallFrameUnload)
 * might want title and status abilities on this or in the frame.
 */

import { WallElem } from './elem.mjs';

export const EVLOAD = 'WallFrameLoad';
export const EVUNLOAD = 'WallFrameUnload';

class WallPage extends WallElem {
	constructor(elem){
		super(elem);
	}
	onload(fn) {
		this.on(EVLOAD, fn);
	}
	onunload(fn) {
		this.on(EVUNLOAD, fn);
	}
}

export default function page(elem){
	return new WallPage(elem ?? 'div');
}
