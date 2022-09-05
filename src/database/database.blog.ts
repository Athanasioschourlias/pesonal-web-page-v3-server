import {article} from "../types/db models/blog"
import db from "./adapter/database.postgress.adapter"


export function fetchAllArticlesDb(): Promise<article[] | null>{

	let query = `
					SELECT * 
					FROM blog
				`
	const params: string[] = []

	query += ";"


	//TODO - Move that to a helper function for doing the queries
	return new Promise(function(resolve, reject) {
		db.query(query, params)
			.then((result) => {
				if(result.rowCount > 0)
					return resolve(result.rows as article[])
				resolve(null)
			})
			.catch((error) => {
				reject(error)
			})
	})


}