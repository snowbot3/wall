/** wall-dom **/

import { dom } from '../js/dom.mjs';

/** dom template utilities */
QUnit.module('dom');

/*
undefined dom([...String tagNames], [callFunction])
undefined dom(function(...args){}) // use arg names as String Array
undefined dom(str1, str2, function(arg1, arg2){}) // use str1 and str2 as tagnames for arg1 and arg2
*/

QUnit.test('dom function', function(assert) {
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

QUnit.test('dom string', function(assert) {
	const div = dom('div');
	assert.equal(typeof div, 'function', 'div is a function');
	const d1 = div`class=sample`('text content');
	assert.equal(d1.prop('class'), undefined, 'd1 class is not real');
	assert.equal(d1.prop('className'), 'sample', 'd1 className');
	assert.equal(d1.text, 'text content', 'd1 text');

	const [span, a] = dom('span','a');
	assert.equal(typeof span, 'function', 'span is a function');
	assert.equal(typeof a, 'function', 'a is a function');
	const d2 = div(
		div('div1'),
		span`style=font-weight:bold`(
			'span1 ',
			a`class=link href=#`('link')
		)
	);
	assert.equal(d2.text, 'div1span1 link', 'd2 text');

	const custom = dom('testDomCustom'); // camel still works?
	const c1 = custom('test');
	assert.equal( c1.elem.tagName, 'TEST-DOM-CUSTOM', 'custom tag name' );
	assert.equal( c1.text, 'test', 'custom text' );
});
