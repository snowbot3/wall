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
QUnit.module('elem/frame');

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
