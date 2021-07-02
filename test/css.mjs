/** wall-css **/

import { default as css, sheet, link } from '../js/css.mjs';

QUnit.module('css');

// not currently used, because use was removed.
// const wait = ms => new Promise(r => setTimeout(r, ms));
function compBorder(elem) {
	const comp = window.getComputedStyle(elem);
	return (comp.border || `${comp.borderBottomWidth} ${comp.borderBottomStyle} ${comp.borderBottomColor}`);
}

QUnit.test('css', function(assert) {
	const fixture = document.getElementById('qunit-fixture');
	fixture.innerHTML = `
		<div id="test-css-id">
			<div class="test-css-class"></div>
		</div>
	`;
	const outer = fixture.querySelector('div#test-css-id');
	const inner = fixture.querySelector('div#test-css-id > div.test-css-class');
	css('#test-css-id { border: 1px solid navy; }');
	assert.equal(compBorder(outer), '1px solid rgb(0, 0, 128)', '1 outer style border' );

	css('#test-css-id { border-color: green; }');
	assert.equal(compBorder(outer), '1px solid rgb(0, 128, 0)', '2 outer style border' );

	css('.test-css-class { color: navy; }',
		'#test-css-id > .test-css-class { color: purple; }');
	let compIn = window.getComputedStyle(inner);
	assert.equal(compIn.color, 'rgb(128, 0, 128)', '3 inner text color' );
});

QUnit.test('css splitting', function(assert) {
	const fixture = document.getElementById('qunit-fixture');
	fixture.innerHTML = `
		<div id="test-css-id">
			<div class="test-css-class"></div>
		</div>
	`;
	const inner = fixture.querySelector('div#test-css-id > div.test-css-class');
	css('#test-css-id { border: 1px solid navy; }');
	css('#test-css-id { border-color: green; } ');
	css('.test-css-class { color: navy; } #test-css-id > .test-css-class { color: purple; }');
	const compIn = window.getComputedStyle(inner);
	assert.equal(compIn.color, 'rgb(128, 0, 128)', 'split inner text color' );
});

QUnit.test('sheet', function(assert){
	const fixture = document.getElementById('qunit-fixture');
	fixture.innerHTML = `
		<div id="test-sheet-id">
			<div class="test-sheet-class">child</div>
		</div>
	`;
	const outer = fixture.querySelector('div#test-sheet-id');
	assert.equal(compBorder(outer), '0px none rgb(0, 0, 0)', '1 border before' );
	
	const s1 = sheet();
	s1.css('#test-sheet-id { border: 1px solid red; }');
	assert.equal(compBorder(outer), '1px solid rgb(255, 0, 0)', '2 border 1 sheet' );
	
	const s2 = sheet();
	s2.css('#test-sheet-id { border-color: pink; }');
	assert.equal(compBorder(outer), '1px solid rgb(255, 192, 203)', '3 border 2 sheets' );

	s2.disable();
	assert.equal(compBorder(outer), '1px solid rgb(255, 0, 0)', '4 border disabled 1 sheet' );
});

QUnit.test('link', async function(assert){
	const fixture = document.getElementById('qunit-fixture');
	fixture.innerHTML = `
		<div id="test-link-id">
			<div class="test-link-class">child</div>
		</div>
	`;
	const outer = fixture.querySelector('div#test-link-id');
	assert.equal(compBorder(outer), '0px none rgb(0, 0, 0)', '1 border before' );
	
	// url based on html file
	const s1 = await link('/test/test.css');
	assert.equal(compBorder(outer), '1px solid rgb(250, 128, 114)', '2 border 1 link' );
	
	s1.css('#test-link-id { border-color: blueviolet; }');
	assert.equal(compBorder(outer), '1px solid rgb(138, 43, 226)', '3 border added 2 link' );

	s1.disable();
	assert.equal(compBorder(outer), '0px none rgb(0, 0, 0)', '4 border disabled 1 link' );
});