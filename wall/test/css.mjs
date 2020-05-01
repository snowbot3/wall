/** wall-css **/

import { css } from '../js/css.mjs';

QUnit.module('css');

const wait = ms => new Promise(r => setTimeout(r, ms));

QUnit.test('css', async function(assert) {
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
