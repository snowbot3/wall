/** wall-dom **/

import { dom } from '../js/dom.mjs';

/** dom template utilities */
QUnit.module('dom');

QUnit.test('dom', function(assert) {
	const div = dom(function(div, span) {
		return div(
			div({className: 'test-dom-class'}, 'div 1'),
			div(
				'div 2',
				span('span 1')
			)
		);
	});
	assert.equal( div.text, 'div 1div 2span 1', 'div full' );
	assert.equal( div.query('span').get(0).text, 'span 1', 'inside span' );

	const custom = dom(function(testDomCustom) {
		return testDomCustom('test');
	});
	assert.equal( custom.elem.tagName, 'TEST-DOM-CUSTOM', 'custom tag name' );
	assert.equal( custom.text, 'test', 'custom text' );

	const lamb = dom((div,span)=>div(span('cat'),span('pants')));
	assert.equal( lamb.text, 'catpants', 'lambda' );
});
