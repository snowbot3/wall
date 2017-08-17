import WallDb from '../utils/database'

interface WallLink {
	text: string
	href: string
}

class WallLinks {
	private db: WallDb
	constructor(){
		this.db = new WallDb('aTestNameToSeeWhatHappens')
	}
	getLinks() : Promise<WallLink[]> {
		return this.db.find()
	}
}

export default new WallLinks()

