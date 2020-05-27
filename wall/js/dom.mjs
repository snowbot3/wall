/** wall-dom **/

import * as wall_args from './args.mjs';
import * as conv from './conv.mjs';
import { elem } from './elem.mjs';
import * as type from './type.mjs';

// element templating
export function dom(...params) {
	let names = [];
	let cb;
	while(params.length > 0) {
		if (type.is(String, params[0])) {
			names.push(params.shift());
		} else if (type.is(Array, params[0])) {
			params.forEach(val=>{if(val instanceof String){
				names.push(val);
			}});
		} else if (type.is(Function,params[0])) {
			cb = params[0];
			break;
		} else {
			throw new Error('wall.dom: unknown param type: ' + typeof params[0]);
		}
	}
	if (cb && names.length == 0) {
		names = wall_args.names(cb);
	}
	const args = names.map(function(name) {
		name = conv.camel2dash(name);
		return elem.bind(this, name);
	}, this);
	if (cb) {
		return cb.apply(this, args);
	}
	if (args.length == 1) {
		return args[0];
	}
	return args;
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
