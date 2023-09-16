import {collections} from "./database.service"
import {articles} from "../models/technical_article"
import {ObjectID} from "mongodb"
import {User_update} from "../types/authentication types"

type resolve_type = {
	status: number,
	data?: any[]
	message?: string
}

function isAnArticle(obj: any): obj is articles {
	return "category" in obj && "title" in obj && "image" in obj && "article_text" in obj
}
export async function createTechnicalArticle(tech_article: articles): Promise<string | null> {

	//User input check, if it is actualy an article
	if(!isAnArticle(tech_article))
		return new Promise(reject => reject("this is not the right format of an article"))

	//TODO- maybe fix this type sometime
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if(!collections[tech_article.category])
		return new Promise(reject => reject("There is no suchj category......For the moment! Sorry!!!"))

	//TODO- maybe fix this type sometime
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const article_matches = await collections[tech_article.category]
		.find({title: tech_article.title})
		.toArray()

	if(article_matches.length > 0)
		return new Promise(reject => reject("An article with the same title exists"))

	return new Promise((resolve, reject) => {

		try {
			//TODO- maybe fix this type sometime
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			collections[tech_article.category].insertOne(tech_article)
				.then((res: articles) => {
					if(res)
						return resolve("The Article created successfully")
					else
						return reject("Failed to create the article")
				})
		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}

	})

}

export async function
putTechnicalArticle(tech_article: articles, id: string): Promise<string | null> {

	//User input check, if it is actualy an article
	if(!isAnArticle(tech_article))
		return new Promise(reject => reject("this is not the right format of an article"))

	return new Promise((resolve, reject) => {

		//TODO- maybe fix this type sometime
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if(!collections[tech_article.category])
			return reject("There is no such category......For the moment! Sorry!!!")

		try {
			//TODO- maybe fix this type sometime
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			collections[tech_article.category]
				.updateOne(
					{_id: new ObjectID(id)},
					{$set: tech_article})
				.then((res: any) => {
					if(res)
						return resolve("The Article edit was successful")
					else
						return reject("Failed to edit the article")
				})
		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}

	})

}

export async function deleteTechnicalArticle(id: string, category: string): Promise<string | null> {

	return new Promise((resolve, reject) => {

		if(id==="")
			return reject("You need to provide an ID")


		//TODO- maybe fix this type sometime
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if(!collections[category])
			return reject("There is no such category......For the moment! Sorry!!!")

		const query = {_id: new ObjectID(id)}

		try {
			//TODO- maybe fix this type sometime
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			collections[category]
				.deleteOne(query)
				.then((res: any) => {
					console.log(res)
					if(res && res.deletedCount) {
						return resolve(`Successfully removed article with id ${id}`)
					} else if(!res) {
						return reject(`failed to remove article with id ${id}`)
					} else if(!res.deletedCount) {
						return reject(`Article with ${id} does not exists`)
					}
				})
		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}

	})

}

export async function fetrchAllUsers(): Promise<resolve_type | string> {

	if( !collections.users)
		return Promise.reject("collection/s undefined")

	try {
		const users = await collections.users.find().toArray()

		return new Promise((resolve) => {
			return resolve({
				status: 200,
				data: users
			})
		})
	} catch (err) {

		return Promise.reject(`There was an error while fetching the users ${err}`)
	}


}

export async function removeUserById(user_id: string): Promise<resolve_type | string> {

	if( !collections.users)
		return Promise.reject("collection/s undefined")

	try {
		const query = {_id: new ObjectID(user_id)}

		const res  = await collections.users.deleteOne(query)

		if(!res)
			return Promise.reject(`failed to remove user with id ${user_id}`)

		if(!res.deletedCount)
			return Promise.reject(`User with ${user_id} does not exists`)

		if(!res.acknowledged)
			return Promise.reject(`User with ${user_id} could not be deleted after database rejecting the request`)

		return Promise.resolve({
			status: 200,
			message: `Successfully removed user with id ${user_id}`
		})

	} catch (err) {
		return Promise.reject(`There was an error while fetching the users ${err}`)
	}


}

export async function putUserById(user_id: string, new_user: User_update):
	Promise<resolve_type | string> {

	if( !collections.users)
		return Promise.reject("collection/s undefined")

	try {


		const res  = await collections.users.updateOne(
			{_id: new ObjectID(user_id)},
			{$set:
					{
						username: new_user.username,
						role: new_user.role
					}
			}
		)

		if(!res)
			return Promise.reject(`failed to update user with id ${user_id}`)

		return Promise.resolve({
			status: 200,
			message: `Successfully updated the user with id ${user_id}`
		})

	} catch (err) {
		return Promise.reject(`There was an error while fetching the users ${err}`)
	}


}