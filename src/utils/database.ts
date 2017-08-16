import NeDB = require('nedb')

class WallDb {
	constructor(filename?:string){
		this.db = new NeDB({
			filename: filename,
			autoload: true,
			timestampData: true
		});
	}
	async find(filter?:any){
		var db = this.db;
		return await new Promise((resolve,reject)=>{
			db.find(filter,(err,docs)=>{
				if(err){
					reject(err,docs);
				}else{
					resolve(doc);
				}
			})
		})
	}
}
