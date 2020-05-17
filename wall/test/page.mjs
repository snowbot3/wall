/**
 * ...
 */

import * as wall_page from '../js/page.mjs';

QUnit.module('page');

QUnit.skip('pager', function(assert) {
	// not sure how to handle this.
	const fnPath = key=>false;
	const p = pager(fnPath);
});
