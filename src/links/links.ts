import WallDb from '../utils/database'

interface WallLink {
	text: string
	href: string
}

class WallLinks {
	private db: WallDb
	constructor(filename?:string){
		this.db = new WallDb(filename)
	}
	getLinks(filter:string) : WallLink[] {
		return this.db.all()
	}
}

export default new WallLink()

