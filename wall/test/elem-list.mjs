/** wall-elem **/

import { WallElem } from '../js/elem.mjs';

function elem(tagName, ...kids) {
	const elem = new WallElem(tagName);
	if (kids.length > 0) {
		elem.append(...kids);
	}
	return elem;
}

/** element utilities */
QUnit.module('elem/list');

QUnit.test('query', function(assert) {
	const div = elem('div');
	div.elem.innerHTML = `<div>
		div 1
		<span>
			span 1
		</span><span>
			span 2
		</span>
	</div><span>
		span 3
	</span><div>
		div 2
		<span>span 4</span>
		<div>div 3</div>
	</div>`;
	const q1 = div.query('span');
	assert.equal(q1.length, 4, 'query span length');
	assert.equal(q1[0], div.elem.children[0].children[0], 'query span index 0');
	assert.equal(q1[2], div.elem.children[1], 'query span index 2');
});
QUnit.test('kids', function(assert) {
	const div = elem('div');
	div.elem.innerHTML = `<div>
		div 1
		<span>
			span 1
		</span><span>
			span 2
		</span>
	</div><span>
		span 3
	</span><div>
		div 2
		<span>span 4</span>
		<div>div 3</div>
	</div>`;
	assert.equal(div.kids.length, 3, 'kids length 3');
	div.elem.children[1].remove();
	assert.equal(div.kids.length, 2, 'kids length 2');
});

// should move elem list
QUnit.skip('list.get', function(){});
QUnit.skip('list[]', function(){});
QUnit.skip('list.each', function(){});
