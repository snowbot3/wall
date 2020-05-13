/** Route **/

import { elem } from '../wall/all.mjs';

class Pager {
	#par;
	#map;
	constructor(par) {
		this.#par = par;
		this.#map = {};
	}
	swap(pg) {
		this.#par.text = '';
		this.#par.append(pg.default());
	}
	async load(pid) {
		pid = pid || 'home';
		if (pid in this.#map) {
			this.swap(this.#map[pid]);
		} else {
			try {
				const pg = await import(`./page/${pid}.mjs`);
				if (pg && pg.default) {
					this.#map[pid] = pg;
					this.swap(pg);
				}
			} catch(er) {
				console.error('Pager.load ', er);
			}
		}
	}
}
//	'': './home.mjs', 'settings': './settings.mjs' };

export default function route(){
	const el = elem('div', 'Loading');
	const pager = new Pager(el);
	window.addEventListener('hashchange', function(){
		let hash = window.location.hash;
		if (hash[0] == '#') { hash = hash.slice(1); }
		pager.load(hash);
	});
	return el;
}
