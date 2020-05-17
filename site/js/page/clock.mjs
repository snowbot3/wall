// clock

import { elem } from '/js/wall/all.mjs';

class Clock {
	#par;
	constructor(par) {
		this.#par = par;
		this.tick();
	}
	tick(){
		console.log('tick');
		const now = new Date();
		const text = '' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
		this.#par.text = text;
		setTimeout(this.next.bind(this), 1010-now.getMilliseconds());
	}
	next(){
		if (this.#par) { // this is why a page-like concept would be nice. onbeforeunload
			this.tick();
		}
	}
}

export default function settings() {
	const el = elem('div', 'Loading...');
	const clock = new Clock(el);
	return el;
}

