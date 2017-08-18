import WallLinks from './links'
import WallDb from '../utils/database'
import { expect } from 'chai'
import sinon = require('sinon')

describe('WallLinks',()=>{
	var dbFind, dbInsert;
	beforeEach(()=>{
		// need mocking...
		dbFind = sinon.stub(WallDb.prototype,'find');
		dbInsert = sinon.stub(WallDb.prototype,'insert');
	});
	afterEach(()=>{
		sinon.restore(dbFind);
		sinon.restore(dbInsert);
	});
	it('get all links',async ()=>{
		const links = new WallLinks();
		expect(await links.getLinks()).deep.equal([]);
	});
});
