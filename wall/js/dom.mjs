/** wall-dom **/

import * as wall_args from './args.mjs';
import * as conv from './conv.mjs';
import { elem } from './elem.mjs';

// element templating
export function dom(func) {
	const names = wall_args.names(func);
	const args = names.map(function(name) {
		name = conv.camel2dash(name);
		return elem.bind(this, name);
	}, this);
	return func.apply(this, args);
}

// dom ( func ) :: return func results
// dom ( [strings], func ) :: return func results
// dom ( string, ...string ) :: elem bind?

/*

var [ div, span ] = dom('div','span');
body.append(
	div({},
		div({},
			span({}, ''),
			span({}, '')
		)
	)
);

var [ table, tr, td ] = dom(...'table,tr,td'.split(','));


var area = dom(function(div,span){
	return div({},
		div({},
			span({}, ''),
			span({}, '')
		)
	);
});

dom(function(table, tr, th, td) {
	body.append(table(
		tr(
			th`a bunch of text!`, // these are not the same...
			th(''),
			th('')
		)
	));
});

[div,span,time,timer] = dom`div span,atr-time atrTimer`;
div({},...elem)


Redefining how all of this works...


*/
