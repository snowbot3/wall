/** wall-elem **/

import { elem, WallElem, WallElemList } from '../js/elem.mjs';

/** element utilities */
QUnit.module('elem');

// These test need to be per concept.
// ... each method of elem should have a test.

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

// dom uses this elem bind concept
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
QUnit.test('elem.bind(str)`prop tag temp`', function(assert) {
	const a = elem.bind(this, 'a');
	const a1 = a`href=#`;
	const a2 = a1();
	assert.equal(a2.elem.tagName, 'A', 'bind(a)`href`().tagName');
	assert.equal(a2.elem.href, '' + window.location.href + '#', 'bind(a)`href`().href');
});

QUnit.test('append', function(assert) {
	const div = elem('div');
	const sp1 = elem('span');
	div.append(sp1);
	sp1.append('span text 1');
	const sp2 = document.createElement('span');
	sp2.textContent = 'span text 2';
	div.append(sp2);
	assert.equal(div.elem.tagName, 'DIV', 'div tagName');
	assert.equal(div.elem.children.length, 2, 'children.length');
	assert.equal(div.elem.children[0].tagName, 'SPAN', 'child 1 tagName');
	assert.equal(div.elem.children[0].textContent, 'span text 1', 'child 1 text');
	assert.equal(div.elem.children[1].tagName, 'SPAN', 'child 2 tagName');
	assert.equal(div.elem.children[1].textContent, 'span text 2', 'child 2 text');
});
QUnit.test('prop', function(assert) {
	const a = elem('a');
	a.prop('href', '#');
	assert.equal(a.elem.tagName, 'A', 'a tagName');
	assert.equal(a.elem.href, '' + window.location.href + '#', 'a href');
	a.elem.className = 'link';
	assert.equal(a.prop('class'), undefined, 'a prop class');
	assert.equal(a.prop('className'), 'link', 'a prop className');
	// class = className for setting
	a.prop('class', 'other');
	assert.equal(a.elem.className, 'other', 'a className');
});
QUnit.test('props', function(assert) {
	const a = elem('a');
	a.props({
		href: '#',
		style: 'color:navy',
		className: 'link'
	});
	assert.equal(a.elem.tagName, 'A', 'a tagName');
	assert.equal(a.elem.href, '' + window.location.href + '#', 'a href');
	assert.equal(a.elem.style.color, 'navy', 'a style color'); // might be different per browser
	assert.equal(a.elem.className, 'link', 'a className');
});
QUnit.test('text', function(assert) {
	const sp1 = elem('span');
	sp1.text = 'span text 1';
	assert.equal(sp1.elem.textContent, 'span text 1', 'span text');
	const div = elem('div');
	const sp2 = document.createElement('span');
	sp2.textContent = 'span text 2';
	div.elem.appendChild(sp1.elem);
	div.elem.appendChild(sp2);
	assert.equal(div.text, 'span text 1span text 2', 'div text');
});
QUnit.test('clear', function(assert) {
	const div = elem('div');
	div.elem.innerHTML = `<span>
		span 1
	</span><span>
		span 2
	</span>`;
	assert.equal(div.elem.children.length, 2, 'before children length');
	div.clear();
	assert.equal(div.elem.children.length, 0, 'after children length');
	assert.equal(div.elem.innerHTML, '', 'after innerHTML');
});
QUnit.test('query', function(assert) {
	const div = elem('div');
	div.elem.innerHTML = `<div>
		div 1
		<span>
			span 1
		</span><span>
			span 2
		</span>
	</div><span>
		span 3
	</span><div>
		div 2
		<span>span 4</span>
		<div>div 3</div>
	</div>`;
	const q1 = div.query('span');
	assert.equal(q1.length, 4, 'query span length');
	assert.equal(q1[0], div.elem.children[0].children[0], 'query span index 0');
	assert.equal(q1[2], div.elem.children[1], 'query span index 2');
});
QUnit.test('kids', function(assert) {
	const div = elem('div');
	div.elem.innerHTML = `<div>
		div 1
		<span>
			span 1
		</span><span>
			span 2
		</span>
	</div><span>
		span 3
	</span><div>
		div 2
		<span>span 4</span>
		<div>div 3</div>
	</div>`;
	assert.equal(div.kids.length, 3, 'kids length 3');
	div.elem.children[1].remove();
	assert.equal(div.kids.length, 2, 'kids length 2');
});
QUnit.skip('remove', function(){});
QUnit.skip('comp', function(){});
QUnit.skip('on', function(){});
QUnit.skip('fire', function(){});

// should move elem list
QUnit.skip('list.get', function(){});
QUnit.skip('list[]', function(){});
QUnit.skip('list.each', function(){});

// considering merging js frames and js page concept here
//QUnit.skip('onload', function(){});
//QUnit.skip('onunload', function(){});
QUnit.skip('load', function(){});
QUnit.test('load import', async function(assert){
	const fixture = document.getElementById('qunit-fixture');
	const frame = elem('div');
	fixture.appendChild(frame.elem);
	assert.equal(frame.elem.children.length, 0, 'no children');
	// . should be based on this file... but is not...
	//await frame.load('./frame-page.mjs');
	await frame.load(import('./frame-page.mjs'));
	assert.equal(frame.elem.children.length, 1, 'load import children');
	const c1 = frame.elem.children[0];
	assert.equal(c1.textContent, 'Hello Frames!?Loaded!', 'load import text');
	frame.load(await import('./frame-page.mjs'), 'second');
});
