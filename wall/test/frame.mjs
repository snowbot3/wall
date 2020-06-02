/**
 * ...
 */

import wall_frame from '../js/frame.mjs';

QUnit.module('frame');

QUnit.test('frame', function(assert) {
	const fixture = document.getElementById('qunit-fixture');
	const frame = wall_frame();
	fixture.appendChild(frame.elem);
	assert.equal(frame.elem.children.length, 0, 'no children');
	// allow directly loading WallElem(s);
});

QUnit.test('load import', async function(assert){
	const fixture = document.getElementById('qunit-fixture');
	const frame = wall_frame();
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
