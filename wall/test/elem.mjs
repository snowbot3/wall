/** wall-elem **/

import { elem, WallElem } from '../js/elem.mjs';

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
	assert.equal(a1.prop('href'), '' + location.href + '#', 'a1 prop href')
	assert.equal(a1.text, 'anchor link', 'a1 text');

	const div = document.createElement('div');
	div.innerHTML = 'Hello, <span>World</span>';
	div.classList.add('example');
	const d1 = new WallElem(div);
	assert.equal(typeof d1, 'object', 'd1 typeof object');
	assert.ok(d1 instanceof WallElem, 'd1 instanceof WallElem');
	assert.equal(typeof d1.elem, 'object', 'd1.elem typeof');
	assert.ok(d1.elem instanceof Element, 'd1.elem instanceof Element');
	assert.equal(d1.prop('className'), 'example', 'd1 prop className')
	assert.equal(d1.text, 'Hello, World', 'd1 text');

	const sar = d1.query('span');
	assert.equal( sar.constructor, Array, 'div\'s span children is Array' );
	assert.equal( sar.length, 1, 'div\'s span children length' );
	const s1 = sar[0];
	assert.equal(typeof s1, 'object', 's1 typeof object');
	assert.ok(s1 instanceof WallElem, 's1 instanceof WallElem');
	assert.equal(s1.text, 'World', 's1 text');
});
