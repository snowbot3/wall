/** wall-elem **/

import { elem, WallElem, WallElemList } from '../js/elem.mjs';

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
QUnit.test('remove', function(assert){
	const div = elem('div');
	const s1 = elem('span', 'span 1');
	const s2 = elem('span', 'span 2');
	div.elem.appendChild(s1.elem);
	div.elem.appendChild(s2.elem);
	assert.equal(div.text, 'span 1span 2', 'before text');
	s1.remove();
	assert.equal(div.text, 'span 2', 'after text');
});
QUnit.test('comp', function(assert){
	const div = elem('div');
	div.elem.style='border:1px solid navy';
	assert.equal(div.comp.border, '', 'comp border');
	const fixture = document.getElementById('qunit-fixture');
	fixture.appendChild(div.elem);
	assert.equal(div.comp.border, '1px solid rgb(0, 0, 128)', 'comp border');
});
QUnit.skip('on', function(){});
QUnit.skip('fire', function(){});

// should move elem list
QUnit.skip('list.get', function(){});
QUnit.skip('list[]', function(){});
QUnit.skip('list.each', function(){});

// considering merging js frames and js page concept here
//QUnit.skip('onload', function(){});
//QUnit.skip('onunload', function(){});
QUnit.test('load', function(assert){
	const fixture = document.getElementById('qunit-fixture');
	const frame = elem('div');
	fixture.appendChild(frame.elem);
	assert.equal(frame.elem.children.length, 0, 'no children');
	const page = elem('div', 'Loading...');
	page.onload(function(){ this.append('onload.'); });
	page.onunload(function(){ this.append('onunload'); });
	frame.load(page);
	assert.equal(frame.elem.children.length, 1, 'load import children');
	const c1 = frame.elem.children[0];
	assert.equal(c1.textContent, 'Loading...onload.', 'load import text');
	frame.load({ 'second': elem('div', 'loaded second') }, 'second');
	assert.equal(frame.elem.children.length, 1, 'load import children');
	const c2 = frame.elem.children[0];
	assert.equal(c1.textContent, 'Loading...onload.', 'load import text');
	assert.equal(c2.textContent, 'loaded second', 'load import text');
});
QUnit.test('load import', async function(assert){
	const fixture = document.getElementById('qunit-fixture');
	const frame = elem('div');
	fixture.appendChild(frame.elem);
	assert.equal(frame.elem.children.length, 0, 'no children');
	await frame.load(import('./frame-page.mjs'));
	assert.equal(frame.elem.children.length, 1, 'load import children');
	const c1 = frame.elem.children[0];
	assert.equal(c1.textContent, 'Hello Frames!?Loaded!', 'load import text');
	frame.load(await import('./frame-page.mjs'), 'second');
});
