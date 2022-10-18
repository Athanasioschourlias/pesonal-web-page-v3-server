import {wrapPromise} from "../common/utils"


export async function getArticles(): Promise<hardware_articleData> {

	const [err, rows] = await wrapPromise()

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
		articles: rows as hardware_article[],
		statusCode: 200,
	}


}