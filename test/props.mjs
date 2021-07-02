/** wall-props **/

import tmpl_props from '../js/props.mjs';

/** props tag template function */
QUnit.module('props');

QUnit.test('props', function(assert) {
	assert.deepEqual(tmpl_props`class=cats`, {
		'class': 'cats'
	}, 'simple');
	assert.deepEqual(tmpl_props`ab=cd ef=gh ij=kl`, {
		'ab':'cd',
		'ef':'gh',
		'ij':'kl'
	}, '3 short');
	assert.deepEqual(tmpl_props`a=b c='dog "ss' e=f`, {
		'a':'b',
		'c':'dog "ss',
		'e':'f'
	}, 'quote')
	assert.deepEqual(tmpl_props`a=b c="dog 'ss" e=f`, {
		'a':'b',
		'c':'dog \'ss',
		'e':'f'
	}, 'dbl quote')
	assert.deepEqual(tmpl_props`a=b c=${0} e=f`, {
		'a':'b',
		'c':0, // number not string
		'e':'f'
	}, 'dbl quote')
	assert.deepEqual(tmpl_props`
		ab=cd
		ef=gh
		ij=kl
	`, {
		'ab':'cd',
		'ef':'gh',
		'ij':'kl'
	}, 'multilined');
	assert.deepEqual(tmpl_props`checked class=cats selected`, {
		'checked': true,
		'class': 'cats',
		'selected': true
	}, 'true value');
});
