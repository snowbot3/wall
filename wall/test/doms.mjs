/** wall-doms **/

import { doms, camel2dash } from '../js/doms.mjs';

/** doms template utilities */
QUnit.module('doms');

/*
undefined doms([...String tagNames], [callFunction])
undefined doms(function(...args){}) // use arg names as String Array
undefined doms(str1, str2, function(arg1, arg2){}) // use str1 and str2 as tagnames for arg1 and arg2
*/

QUnit.test('camel2dash', function(assert) {
	function check(from, to) {
		assert.equal(camel2dash(from), to, `${from} => ${to}`);
	}
	check('abc', 'abc');
	check('aBc', 'a-bc');
	check('aBC', 'a-b-c');
	check('ABC', 'a-b-c'); // no first dash
});

QUnit.test('doms function', function(assert) {
	const div = doms(function(div, span) {
		return div(
			div({className: 'test-doms-class'}, 'div 1'),
			div(
				'div 2',
				span('span 1')
			)
		);
	});
	assert.equal( div.textContent, 'div 1div 2span 1', 'div full' );
	assert.equal( div.querySelector('span').textContent, 'span 1', 'inside span' );

	const custom = doms(function(testDomsCustom) {
		return testDomsCustom('test');
	});
	assert.equal( custom.tagName, 'TEST-DOMS-CUSTOM', 'custom tag name' );
	assert.equal( custom.textContent, 'test', 'custom text' );

	const lamb = doms((div,span)=>div(span('cat'),span('pants')));
	assert.equal( lamb.textContent, 'catpants', 'lambda' );
});

QUnit.test('doms string', function(assert) {
	const div = doms('div');
	assert.equal(typeof div, 'function', 'div is a function');
	const d1 = div`class=sample`('text content');
	assert.equal(d1['class'], undefined, 'd1 class is not real');
	assert.equal(d1.className, 'sample', 'd1 className');
	assert.equal(d1.textContent, 'text content', 'd1 text');

	const [span, a] = doms('span','a');
	assert.equal(typeof span, 'function', 'span is a function');
	assert.equal(typeof a, 'function', 'a is a function');
	const d2 = div(
		div('div1'),
		span`style=font-weight:bold`(
			'span1 ',
			a`class=link href=#`('link')
		)
	);
	assert.equal(d2.textContent, 'div1span1 link', 'd2 text');

	const custom = doms('testDomsCustom'); // camel still works?
	const c1 = custom('test');
	assert.equal( c1.tagName, 'TEST-DOMS-CUSTOM', 'custom tag name' );
	assert.equal( c1.textContent, 'test', 'custom text' );
});

// desired concept
QUnit.skip('doms string with props', function(assert) {
	const div = doms('div class=cat');
	const d1 = div`id=topcat`('cat');
	assert.equal(d1['class'], undefined, 'd1 class is not real');
	assert.equal(d1.className, 'sample', 'd1 className');
	assert.equal(d1.textContent, 'text content', 'd1 text');
});
