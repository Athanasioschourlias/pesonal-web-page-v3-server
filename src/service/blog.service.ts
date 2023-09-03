import {articles} from "../models/technical_article"
import {collections} from "./database.service"
import {ArticleType} from "../types/serviceGenericTypes"

export async function fetchArticles(): Promise<articles[] | null> {


	if( !collections.software_article ||
		!collections.computer_hardware_article ||
		!collections.robotics_article ||
		!collections.printing_article)

		return Promise.reject("collection/s undefined")

	const softwareArticles = await collections.software_article.find().toArray()
	const hardwareArticles = await collections.computer_hardware_article.find().toArray()
	const roboticsArticles = await collections.robotics_article.find().toArray()
	const printingArticles = await collections.printing_article.find().toArray()


	return new Promise((resolve) => {

		const allArticles = [
			...softwareArticles,
			...hardwareArticles,
			...roboticsArticles,
			...printingArticles] as any as articles[]

		return resolve(allArticles as articles[])
	})

}

export async function getArticlesByCategory(category: ArticleType): Promise<articles[] | null> {

	return new Promise((resolve, reject) => {

		if(!collections)
			return reject(null)

		try {
			//TODO- maybe fix this type sometime
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return resolve(collections[category].find().toArray() as articles[])
		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}

	})

}


