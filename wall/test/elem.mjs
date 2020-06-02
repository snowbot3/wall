/** wall-elem **/

import { elem, WallElem, WallElemList } from '../js/elem.mjs';

/** element utilities */
QUnit.module('elem');

QUnit.test('elem', function(assert) {
	const a1 = elem('a', {
		href: '#'
	}, 'anchor link');
	assert.equal(typeof a1, 'object', 'a1 typeof object');
	assert.ok(a1 instanceof WallElem, 'a1 instanceof WallElem');
	assert.equal(typeof a1.elem, 'object', 'a1.elem typeof');
	assert.ok(a1.elem instanceof Element, 'a1.elem instanceof Element');
	assert.equal(a1.prop('href'), '' + location.href + '#', 'a1 prop href');
	assert.equal(a1.text, 'anchor link', 'a1 text');

	const div = document.createElement('div');
	div.innerHTML = 'Hello, <span>World<b>!</b></span><b>!</b>';
	div.classList.add('example');
	const d1 = new WallElem(div);
	assert.equal(typeof d1, 'object', 'd1 typeof object');
	assert.ok(d1 instanceof WallElem, 'd1 instanceof WallElem');
	assert.equal(typeof d1.elem, 'object', 'd1.elem typeof');
	assert.ok(d1.elem instanceof Element, 'd1.elem instanceof Element');
	assert.equal(d1.prop('className'), 'example', 'd1 prop className');
	assert.equal(d1.text, 'Hello, World!!', 'd1 text');

	const sar = d1.query('span');
	assert.ok( sar instanceof WallElemList, 'div\'s span query is of WallElemList' );
	assert.ok( sar instanceof Array, 'div\'s span query is of Array' );
	assert.equal( sar.constructor, WallElemList, 'div\'s span query is a WallElemList' );
	assert.equal( sar.length, 1, 'div\'s span children length' );
	const s1 = sar.get(0);
	assert.strictEqual(s1.elem, sar[0], 'list[0] == list.get(0).elem');
	assert.equal(typeof s1, 'object', 's1 typeof object');
	assert.ok(s1 instanceof WallElem, 's1 instanceof WallElem');
	assert.equal(s1.text, 'World!', 's1 text');

	const bar = d1.query('b');
	assert.equal(bar.length, 2, 'bar length');
	const kids = d1.kids; //this... creates a new wallelemlist each time...
	assert.equal(kids.constructor, WallElemList, 'div\'s kids is a WallElemList' );
	assert.equal(kids.length, 2, 'kids length');

	// multiple props and children
	const a2 = elem('a', {id:'a2', className:'bad'}, {className:'a2c'}, 'Acd', 'Bef');
	assert.equal(typeof a2, 'object', 'a2 typeof object');
	assert.ok(a2 instanceof WallElem, 'a2 instanceof WallElem');
	assert.equal(typeof a2.elem, 'object', 'a2.elem typeof');
	assert.ok(a2.elem instanceof Element, 'a2.elem instanceof Element');
	assert.equal(a2.prop('id'), 'a2', 'a2 prop id');
	assert.equal(a2.prop('className'), 'a2c', 'a2 prop className');
	assert.equal(a2.text, 'AcdBef', 'a2 text');
});

QUnit.test('elem bind props', function(assert) {
	const a = elem.bind(null, 'a');
	const a1 = a({ href: '#' }, 'anchor link');
	assert.equal(typeof a1, 'object', 'a1 typeof object');
	assert.ok(a1 instanceof WallElem, 'a1 instanceof WallElem');
	assert.equal(typeof a1.elem, 'object', 'a1.elem typeof');
	assert.ok(a1.elem instanceof Element, 'a1.elem instanceof Element');
	assert.equal(a1.prop('href'), '' + location.href + '#', 'a1 prop href');
	assert.equal(a1.text, 'anchor link', 'a1 text');

	const a2 = a`className=a2p href=#`('anchor 2');
	assert.equal(typeof a2, 'object', 'a2 typeof object');
	assert.ok(a2 instanceof WallElem, 'a2 instanceof WallElem');
	assert.equal(typeof a2.elem, 'object', 'a2.elem typeof');
	assert.ok(a2.elem instanceof Element, 'a2.elem instanceof Element');
	assert.equal(a2.prop('href'), '' + location.href + '#', 'a2 prop href');
	assert.equal(a2.prop('className'), 'a2p', 'a2 prop class name');
	assert.equal(a2.text, 'anchor 2', 'a2 text');

	const a3 = a`className=bad href=#``class=a3p`('anchor 3'); // stackable?!
	assert.equal(typeof a3, 'object', 'a3 typeof object');
	assert.ok(a3 instanceof WallElem, 'a3 instanceof WallElem');
	assert.equal(typeof a3.elem, 'object', 'a3.elem typeof');
	assert.ok(a3.elem instanceof Element, 'a3.elem instanceof Element');
	assert.equal(a3.prop('href'), '' + location.href + '#', 'a3 prop href');
	assert.equal(a3.prop('className'), 'a3p', 'a2 prop class name');
	assert.equal(a3.text, 'anchor 3', 'a3 text');
});
