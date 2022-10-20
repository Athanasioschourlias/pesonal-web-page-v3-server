// External dependencies
import { ObjectId } from "mongodb"
// Class Implementation

export class technical_article {
	constructor(
		public title: string,
		public article_text_1: string,
		public article_text_2: string,
		public ref_citing: JSON,
		public date: Date,
		public id?: ObjectId) {

	}
}

export class hardware_article {
	constructor(
		public title: string,
		public first_image: string,
		public second_image: string,
		public article_text: string,
		public tech_spec: JSON,
		public date: Date,
		public id?: ObjectId) {

	}
}