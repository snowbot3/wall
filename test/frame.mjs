/** wall-frame **/

import * as frame from '../js/frame.mjs';

QUnit.module('frame');

QUnit.test('load', function(assert){
	const fixture = document.getElementById('qunit-fixture');
	const outer = document.createElement('div');
	fixture.appendChild(outer);
	assert.equal(outer.children.length, 0, 'no children');
	const page = document.createElement('div');
	page.textContent = 'Loading...';
	frame.onload(page, function(){
		this.appendChild(document.createTextNode('onload.'));
	});
	frame.onunload(page, function(){
		console.log('::COF:: ', this);
		this.appendChild(document.createTextNode('onunload'));
	});
	frame.load(outer, page);
	assert.equal(outer.children.length, 1, 'load import children');
	const c1 = outer.children[0];
	assert.equal(c1.textContent, 'Loading...onload.', 'load import text');
	const secondElem = document.createElement('div');
	secondElem.textContent = 'loaded second';
	console.log('::COF:: before second');
	frame.load(outer, { 'second': secondElem }, 'second');
	assert.equal(outer.children.length, 1, 'load import children');
	const c2 = outer.children[0];
	assert.equal(c1.textContent, 'Loading...onload.onunload', 'load import text');
	assert.equal(c2.textContent, 'loaded second', 'load import text');
});

QUnit.test('load import', async function(assert){
	const fixture = document.getElementById('qunit-fixture');
	const outer = document.createElement('div');
	fixture.appendChild(outer);
	assert.equal(outer.children.length, 0, 'no children');
	await frame.load(outer, import('./frame-page.mjs'));
	assert.equal(outer.children.length, 1, 'load import children');
	const c1 = outer.children[0];
	assert.equal(c1.textContent, 'Hello Frames!?Loaded!', 'load import text');
	frame.load(outer, await import('./frame-page.mjs'), 'second');
});
