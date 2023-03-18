// import {collections} from "./database.service"
// import {ObjectID} from "mongodb"
//
// export async function createTechnicalArticle(tech_article: article): Promise<string | null> {
//
// 	if(!collections.technical_article)
// 		return null
//
// 	const article_matches = await collections.technical_article
// 		.find({title: tech_article.title})
// 		.toArray()
//
// 	if(article_matches.length > 0)
// 		return new Promise(reject => reject("the article already exist!"))
//
// 	return new Promise((resolve, reject) => {
//
// 		if(!collections.technical_article)
// 			return reject(null)
//
// 		try {
// 			collections.technical_article.insertOne(tech_article)
// 				.then((res) => {
// 					if(res)
// 						return resolve("The Article created successfully")
// 					else
// 						return reject("Failed to create the article")
// 				})
// 		} catch (error) {
// 			return reject(`failed to retrieve item from collection -> ${error}`)
// 		}
//
// 	})
//
// }
//
// export async function putTechnicalArticle(tech_article: article, id: string): Promise<string | null> {
//
// 	return new Promise((resolve, reject) => {
//
// 		if(!collections.technical_article)
// 			return reject(null)
//
// 		console.log(tech_article)
//
// 		try {
// 			collections.technical_article
// 				.updateOne(
// 					{_id: new ObjectID(id)},
// 					{$set: tech_article})
// 				.then((res) => {
// 					if(res)
// 						return resolve("The Article edit was successful")
// 					else
// 						return reject("Failed to edit the article")
// 				})
// 		} catch (error) {
// 			return reject(`failed to retrieve item from collection -> ${error}`)
// 		}
//
// 	})
//
// }
//
// export async function deleteTechnicalArticle(id: string): Promise<string | null> {
//
// 	return new Promise((resolve, reject) => {
// 		if(!collections.technical_article)
// 			return reject(null)
//
// 		const query = {_id: new ObjectID(id)}
//
// 		try {
// 			collections.technical_article
// 				.deleteOne(query)
// 				.then((res) => {
// 					console.log(res)
// 					if(res && res.deletedCount) {
// 						return resolve(`Successfully removed article with id ${id}`)
// 					} else if(!res) {
// 						return reject(`failed to remove article with id ${id}`)
// 					} else if(!res.deletedCount) {
// 						return reject(`Article with ${id} does not exists`)
// 					}
// 				})
// 		} catch (error) {
// 			return reject(`failed to retrieve item from collection -> ${error}`)
// 		}
//
// 	})
//
// }