// clock
import { format as df } from '/js/date.js';
import { page } from '/js/wall/all.mjs';

const dfTime = df`h:mm:ss tt`;

class Clock {
	#par;
	constructor(par) {
		this.#par = par;
		this.tick();
		par.onunload(this.stop.bind(this));
	}
	stop() {
		this.#par = null;
	}
	tick() {
		const now = new Date();
		//const text = '' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
		const text = dfTime(now);
		this.#par.text = text;
		setTimeout(this.next.bind(this), 1010-now.getMilliseconds());
	}
	next() {
		if (this.#par) { // this is why a page-like concept would be nice. onbeforeunload
			this.tick();
		}
	}
}

export default function settings() {
	// this is not correct, page only takes 1 argument.
	const el = page('div', 'Loading...');
	const clock = new Clock(el);
	return el;
}

