import {article, articleData} from "../types/db models/blog"
import {wrapPromise} from "../common/utils"
import {fetchAllArticlesDb} from "../database/database.blog"


export async function getArticles(): Promise<articleData> {

	//TODO- IN the future check for token
	const [err, rows] = await wrapPromise(fetchAllArticlesDb())

	if(err) {
		return {
			articles: [],
			statusCode: 500,
			errmessage: `There was an error while retrieving the data from the database -> ${err}`
		}
	}

	//Here with that we also cover the undefined case
	if(rows === null) {
		return {
			articles: null,
			statusCode: 200,
		}
	}

	return {
		articles: rows as article[],
		statusCode: 200,
	}


}