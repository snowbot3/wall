/** wall-conv **/

import * as wall_conv from '../js/conv.mjs';

QUnit.module('conv');

const json = obj=>JSON.stringify(obj);

QUnit.test('camel2dash', function(assert) {
	function check(from, to) {
		assert.equal(wall_conv.camel2dash(from), to, `${from} => ${to}`);
	}
	check('abc', 'abc');
	check('aBc', 'a-bc');
	check('aBC', 'a-b-c');
	check('ABC', 'a-b-c'); // no first dash
});
