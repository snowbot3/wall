import Nedb = require('nedb')

// most of Nedb callbacks use the same format.
function wrapPromise(fn):Promise<any> {
	return new Promise((res,rej)=>{
		fn((err,data)=>{
			if(err){
				rej(err)
			}else{
				res(data)
			}
		})
	})
}

class WallDb {
	private db:Nedb;
	constructor(filename?:string){
		this.db = new Nedb({
			filename: filename,
			autoload: true,
			timestampData: true
		})
	}
	find():Promise<any[]> {
		var db = this.db
		return wrapPromise(cb=>{
			db.find({},cb)
		})
	}
	insert(doc:any):Promise<any> {
		var db = this.db
		return wrapPromise(cb=>{
			db.insert(doc,cb)
		})
	}
}

export default WallDb
