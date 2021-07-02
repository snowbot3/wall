/** wall-elem **/

import { WallElem } from '../js/elem.mjs';

function elem(tagName, ...kids) {
	const elem = new WallElem(tagName);
	if (kids.length > 0) {
		elem.append(...kids);
	}
	return elem;
}

/** element utilities */
QUnit.module('elem/base');

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
	assert.equal(div.comp.borderTopWidth, '1px', 'comp border width');
	assert.equal(div.comp.borderTopStyle, 'solid', 'comp border style');
	assert.equal(div.comp.borderTopColor, 'rgb(0, 0, 128)', 'comp border color');
});
QUnit.skip('on', function(){});
QUnit.skip('fire', function(){});
