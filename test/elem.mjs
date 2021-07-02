/** wall-elem **/

import { default as elem, WallElem } from '../js/elem.mjs';

/** element utilities */
QUnit.module('elem');

// These test need to be per concept.
// ... each method of elem should have a test.

// should separate WallElem from elem()?
QUnit.test('elem(dom)', function(assert) {
	const body = elem(document.body);
	assert.equal(body.constructor, WallElem, 'elem(body).constructor');
	assert.equal(body.elem, document.body, 'elem(body).elem');
	assert.equal(body.elem.tagName, 'BODY', 'elem(body).elem.tagName');
	const dom = document.createElement('div');
	const el = elem(dom);
	assert.equal(el.constructor, WallElem, 'elem(dom).constructor');
	assert.equal(el.elem, dom, 'elem(dom).elem');
	assert.equal(el.elem.tagName, 'DIV', 'elem(dom).elem.tagName');
});
QUnit.test('elem(str)', function(assert) {
	const el = elem('div');
	assert.equal(el.constructor, WallElem, 'elem(dom).constructor');
	assert.equal(el.elem.tagName, 'DIV', 'elem(dom).elem.tagName');
});
QUnit.test('elem`tagName props`', function(assert){
	const dt = elem`div class=turtle`;
	const d1 = dt();
	assert.equal(d1.elem.tagName, 'DIV', 'div class=turtle tagName');
	assert.equal(d1.elem.className, 'turtle', 'div class=turtle className');
	const sp = elem`span`;
	const s1 = sp();
	assert.equal(s1.elem.tagName, 'SPAN', 'span tagName');
	assert.equal(s1.elem.className, '', 'span className');
	const s2 = sp`class=s2`();
	assert.equal(s2.elem.tagName, 'SPAN', 'span 2 tagName');
	assert.equal(s2.elem.className, 's2', 'span 2 className');
});
QUnit.test('elem.bind(str)`prop tag temp`', function(assert) {
	const a = elem.bind(this, 'a');
	const a1 = a`href=#`;
	const a2 = a1();
	assert.equal(a2.elem.tagName, 'A', 'bind(a)`href`().tagName');
	assert.equal(a2.elem.href, '' + window.location.href + '#', 'bind(a)`href`().href');
});
