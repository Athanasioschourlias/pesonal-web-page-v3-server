import {hardware_article, technical_article} from "../models/technical_article"
import {collections} from "./database.service"
import {ObjectID} from "mongodb"


export async function getHardwareArticles(): Promise<hardware_article[] | null> {

	return new Promise((resolve, reject) => {
		if(!collections.hardware_article)
			return reject(null)

		return resolve(collections.hardware_article
			.find({})
			.toArray() as unknown as hardware_article[])
	})

}
export async function getTechArticles(): Promise<technical_article[] | null> {

	return new Promise((resolve, reject) => {
		if(!collections.technical_article)
			return reject(null)

		return resolve(collections.technical_article
			.find({})
			.toArray() as unknown as technical_article[])
	})

}


export async function fetchTechnicalArticleById(id: string): Promise<technical_article | null> {

	return new Promise((resolve, reject) => {
		if(!collections.technical_article)
			return reject(null)

		const query = {_id: new ObjectID(id)}

		try {
			return resolve(collections.technical_article
				.find(query)
				.toArray() as unknown as technical_article)
		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}

	})

}
export async function fetchHardwareArticleById(id: string): Promise<hardware_article | null> {

	return new Promise((resolve, reject) => {
		if(!collections.hardware_article)
			return reject(null)

		const query = {_id: new ObjectID(id)}

		try {
			return resolve(collections.hardware_article
				.find(query)
				.toArray() as unknown as hardware_article)
		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}

	})
}


export async function createTechnicalArticle(tech_article: technical_article):
	Promise<string | null> {

	if(!collections.technical_article)
		return null

	const article_matches = await collections.technical_article
		.find({title: tech_article.title})
		.toArray()

	if(article_matches.length > 0)
		return new Promise(reject => reject("the article already exist!"))

	return new Promise((resolve, reject) => {

		if(!collections.technical_article)
			return reject(null)

		try {
			collections.technical_article.insertOne(tech_article)
				.then((res) => {
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
export async function createHardwareArticle(hardware_article: hardware_article):
	Promise<string | null> {

	if(!collections.hardware_article)
		return null

	const article_matches = await collections.hardware_article
		.find({title: hardware_article.title})
		.toArray()

	if(article_matches.length > 0)
		return new Promise(reject => reject("the article already exist!"))

	return new Promise((resolve, reject) => {

		if(!collections.hardware_article)
			return reject(null)

		collections.hardware_article.find({title: hardware_article.title})
			.toArray()
			.then((article_array) => {
				if(article_array.length > 0)
					return reject("the article already exist!")
			})

		try {
			collections.hardware_article.insertOne(hardware_article)
				.then((res) => {
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


export async function putTechnicalArticle(tech_article: technical_article, id: string):
	Promise<string | null> {

	return new Promise((resolve, reject) => {

		if(!collections.technical_article)
			return reject(null)

		try {
			collections.technical_article
				.updateOne(
					{_id: new Object(id)},
					{$set: tech_article})
				.then((res) => {
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
export async function putHardwareArticle(hardware_article: hardware_article, id: string):
	Promise<string | null> {

	return new Promise((resolve, reject) => {

		if(!collections.hardware_article)
			return reject(null)

		try {
			collections.hardware_article
				.updateOne(
					{_id: new Object(id)},
					{$set: hardware_article})
				.then((res) => {
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


export async function deleteTechnicalArticle(id: string): Promise<string | null> {

	return new Promise((resolve, reject) => {
		if(!collections.technical_article)
			return reject(null)

		const query = {_id: new ObjectID(id)}

		try {
			collections.technical_article
				.deleteOne(query)
				.then((res) => {
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
export async function deleteHardwareArticle(id: string): Promise<string | null> {

	return new Promise( (resolve, reject) => {
		if(!collections.hardware_article)
			return reject(null)

		const query = { _id: new ObjectID(id) }

		try {
			collections.hardware_article
				.deleteOne(query)
				.then( (res) => {
					if(res && res.deletedCount){
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
