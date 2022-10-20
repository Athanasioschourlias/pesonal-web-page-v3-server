import {hardware_article, technical_article} from "../models/technical_article"
import {collections} from "./database.service"


export async function getHardwareArticles(): Promise<hardware_article[] | null> {

	if(!collections.hardware_article)
		return null

	return new Promise( (resolve, reject) => {
		if(!collections.hardware_article)
			return reject(null)

		return resolve(collections.hardware_article
			.find({})
			.toArray() as unknown as hardware_article[])
	})

}

export async function getTechArticles(): Promise<technical_article[] | null> {

	if(!collections.technical_article)
		return null

	return new Promise( (resolve, reject) => {
		if(!collections.technical_article)
			return reject(null)

		return resolve(collections.technical_article
			.find({})
			.toArray() as unknown as technical_article[])
	})

}

export async function fetchTechnicalArticleById(id: string): Promise<technical_article | null> {

	if(!collections.hardware_article)
		return null

	return new Promise( (resolve, reject) => {
		if(!collections.hardware_article)
			return reject(null)

		const query = { _id: new Object(id) }

		try {
			return resolve(collections.hardware_article
				.find(query)
				.toArray() as unknown as technical_article)
		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}

	})

}

export async function fetchHardwareArticleById(id: string): Promise<technical_article | null> {

	if(!collections.technical_article)
		return null

	return new Promise( (resolve, reject) => {
		if(!collections.technical_article)
			return reject(null)

		const query = { _id: new Object(id) }

		try {
			return resolve(collections.technical_article
				.find(query)
				.toArray() as unknown as technical_article)
		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}

	})
}