// External dependencies
import { ObjectId } from "mongodb"

export class articles {
	constructor(
		public category: string,
		public title: string,
		public image: string,
		public article_text: string,
		public date?: Date,
		public id?: ObjectId) {

	}
}