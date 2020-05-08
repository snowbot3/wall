/** Route **/

import { elem } from '../wall/all.mjs';

const map = {
	'': './home.mjs',
	'settings': './settings.mjs'
};

export default function route(){
	const el = elem('div', 'Loading');
	window.addEventListener('hashchange', function(){
		// get hash
		let hash = window.location.hash;
		if (hash[0] == '#') { hash = hash.slice(1); }
		if (hash in map) {
			import(map[hash]).then(function(pg){
				el.text = ''; // second fastest remove all children, innerHTML is faster.
				el.append(pg.default());
			}).catch(function(err){
				throw err;
			});
		}
	});
	return el;
}
