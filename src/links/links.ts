import * as Nedb from 'nedb'

interface WallLink {
	text: string
	href: string
}
interface DataStoreOptions {
	filename?: string
	autoload?: boolean
	timestampData?: boolean
}
Nedb.DataStoeOptions = DataStoreOptions;

class WallLinks {
	private db: Nedb
	constructor(filename?:string){
		this.db = new Nedb({
			filename: filename,
			autoload: true,
			timestampData: true
		})
	}
	getLinks(filter:string,start:number) : WallLink[] {
		return this.db.find()
	}
}

export default new WallLink()
