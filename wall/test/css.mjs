/** wall-css **/

import { css, sheet, link } from '../js/css.mjs';

QUnit.module('css');

// not currently used, because use was removed.
// const wait = ms => new Promise(r => setTimeout(r, ms));

QUnit.test('css', function(assert) {
	const fixture = document.getElementById('qunit-fixture');
	fixture.innerHTML = `
		<div id="test-css-id">
			<div class="test-css-class"></div>
		</div>
	`;
	const outer = fixture.querySelector('div#test-css-id');
	const inner = fixture.querySelector('div#test-css-id > div.test-css-class');
	// css('#test-css-id', { border: '1px solid navy' });
	css('#test-css-id { border: 1px solid navy; }');
	let compOut = window.getComputedStyle(outer);
	assert.equal( compOut.border, '1px solid rgb(0, 0, 128)', '1 outer style border' );

	// css('#test-css-id', { borderColor: 'green' });
	css('#test-css-id { border-color: green; }');
	compOut = window.getComputedStyle(outer);
	assert.equal( compOut.border, '1px solid rgb(0, 128, 0)', '2 outer style border' );

	// css('.clss', { color: 'navy' }, '#id >.clss', { color: 'purple' });
	css('.test-css-class { color: navy; }',
		'#test-css-id > .test-css-class { color: purple; }');
	let compIn = window.getComputedStyle(inner);
	assert.equal( compIn.color, 'rgb(128, 0, 128)', '3 inner text color' );
});

QUnit.test('sheet', function(assert){
	const fixture = document.getElementById('qunit-fixture');
	fixture.innerHTML = `
		<div id="test-sheet-id">
			<div class="test-sheet-class">child</div>
		</div>
	`;
	const outer = fixture.querySelector('div#test-sheet-id');
	let compOut = window.getComputedStyle(outer);
	assert.equal( compOut.border, '0px none rgb(0, 0, 0)', '1 border before' );
	
	const s1 = sheet();
	s1.css('#test-sheet-id { border: 1px solid red; }');
	compOut = window.getComputedStyle(outer);
	assert.equal( compOut.border, '1px solid rgb(255, 0, 0)', '2 border 1 sheet' );
	
	const s2 = sheet();
	s2.css('#test-sheet-id { border-color: pink; }');
	compOut = window.getComputedStyle(outer);
	assert.equal( compOut.border, '1px solid rgb(255, 192, 203)', '3 border 2 sheets' );

	s2.disable();
	compOut = window.getComputedStyle(outer);
	assert.equal( compOut.border, '1px solid rgb(255, 0, 0)', '4 border disabled 1 sheet' );
});

QUnit.test('link', async function(assert){
	const fixture = document.getElementById('qunit-fixture');
	fixture.innerHTML = `
		<div id="test-link-id">
			<div class="test-link-class">child</div>
		</div>
	`;
	const outer = fixture.querySelector('div#test-link-id');
	let compOut = window.getComputedStyle(outer);
	assert.equal( compOut.border, '0px none rgb(0, 0, 0)', '1 border before' );
	
	// url based on html file
	const s1 = await link('/test/test.css');

	compOut = window.getComputedStyle(outer);
	assert.equal( compOut.border, '1px solid rgb(250, 128, 114)', '2 border 1 link' );
	
	s1.css('#test-link-id { border-color: blueviolet; }');
	compOut = window.getComputedStyle(outer);
	assert.equal( compOut.border, '1px solid rgb(138, 43, 226)', '3 border added 2 link' );

	s1.disable();
	compOut = window.getComputedStyle(outer);
	assert.equal( compOut.border, '0px none rgb(0, 0, 0)', '4 border disabled 1 link' );
});