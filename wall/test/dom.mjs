/** wall-dom **/

import { dom } from '../js/dom.mjs';

/** dom element utilities */
QUnit.module('dom');

// These test need to be per concept.
// ... each method of elem should have a test.

// not important with concept change, but might still be nice
QUnit.test('dom(node)', function(assert) {
	const body = dom(document.body); // fails
	assert.ok(body instanceof Node, 'dom(body) instanceof Node');
	assert.equal(body, document.body, 'dom(body)');
	assert.equal(body.tagName, 'BODY', 'dom(body).tagName');
	const div = document.createElement('div');
	const el = dom(div);
	assert.ok(el instanceof Node, 'dom(div) instanceof Node');
	assert.equal(el, div, 'dom(div)');
	assert.equal(el.tagName, 'DIV', 'dom(div).tagName');
});
QUnit.test('dom(str)', function(assert) {
	const el = dom('div');
	assert.ok(el instanceof Node, 'dom(div) instanceof Node');
	assert.equal(el.tagName, 'DIV', 'dom(div).tagName');
});
QUnit.test('dom`tagName props`', function(assert){
	const dt = dom`div class=turtle`;
	const d1 = dt();
	assert.equal(d1.tagName, 'DIV', 'div class=turtle tagName');
	assert.equal(d1.className, 'turtle', 'div class=turtle className');
	const sp = dom`span`;
	const s1 = sp();
	assert.equal(s1.tagName, 'SPAN', 'span tagName');
	assert.equal(s1.className, '', 'span className');
	const s2 = sp`class=s2`();
	assert.equal(s2.tagName, 'SPAN', 'span 2 tagName');
	assert.equal(s2.className, 's2', 'span 2 className');
});
QUnit.test('dom.bind(str)`prop tag temp`', function(assert) {
	const a = dom.bind(this, 'a');
	const a1 = a`href=#`;
	const a2 = a1();
	assert.equal(a2.tagName, 'A', 'bind(a)`href`().tagName');
	assert.equal(a2.href, '' + window.location.href + '#', 'bind(a)`href`().href');
});
QUnit.test('dom`prop=+val`', function(assert) {
	const a = dom`a class=a title=a`;
	const b = a`class=+b title=+b`;
	const c = b();
	assert.equal(c.tagName, 'A', 'tagname');
	assert.equal(c.className, 'a b', 'className');
	assert.equal(c.title, '+b', 'title');
});
