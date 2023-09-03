// External dependencies
import { ObjectId } from "mongodb"

export class User {
	constructor(
		public username: string,
		public role: string,
		public password: string,
		public id?: ObjectId) {

	}
}