/** @module wall-doms **/
/* concept change
doms('tag1', 'tag2 class=blue', dom`tag3 class=${varClass}`, (t1,t2,t3)=>t1(
	t2(), t3`id=specific`('cat')
));
*/

import * as wall_args from './args.mjs';
import { dom } from './dom.mjs';
import * as type from './type.mjs';

export function camel2dash(camel) {
	return camel.replace(/^([A-Z])/, (g)=>g[0].toLowerCase()).replace(/([A-Z])/g, (g) => '-'+g[0].toLowerCase());
}

/**
 * dom element templating
 * doms ( func ) :: return func results
 * doms ( [strings], func ) :: return func results
 * doms ( string, ...string ) :: elem bind?
 * @param params 
 * @returns function | DomElement
 */
export function doms(...params) {
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
			throw new Error('wall.doms: unknown param type: ' + typeof params[0]);
		}
	}
	if (cb && names.length == 0) {
		names = wall_args.names(cb);
	}
	const args = names.map(function(name) {
		name = camel2dash(name);
		return dom.bind(this, name);
	}, this);
	if (cb) {
		return cb.apply(this, args);
	}
	if (args.length == 1) {
		return args[0];
	}
	return args;
}

/*

var [ div, span ] = doms('div','span');
body.append(
	div({},
		div({},
			span({}, ''),
			span({}, '')
		)
	)
);

var [ table, tr, td ] = doms(...'table,tr,td'.split(','));


var area = doms(function(div,span){
	return div({},
		div({},
			span({}, ''),
			span({}, '')
		)
	);
});

doms(function(table, tr, th, td) {
	body.append(table(
		tr(
			th`a bunch of text!`, // these are not the same...
			th(''),
			th('')
		)
	));
});

[div,span,time,timer] = doms`div span,atr-time atrTimer`;
div({},...elem)


Redefining how all of this works...

20.08 doms should return DOMElement instead of WallElement.
wall elem shorthand should be separate and optional.

*/
