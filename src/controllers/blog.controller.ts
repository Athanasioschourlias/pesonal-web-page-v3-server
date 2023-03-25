import {Request, Response} from "express"
import {handleServerError} from "../common/responseHelper"
import {wrapPromise} from "../common/utils"
import {
	fetchArticles, getArticlesByCategory,
} from "../service/blog.service"
import {ArticleType} from "../types/serviceGenericTypes"

//TODO - add schema check

export async function fetchAllArticles(_req: Request, res: Response): Promise<void> {

	const [err, result] = await wrapPromise(fetchArticles())

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.send({
		statusCode: 200,
		data: result
	})


}


const articleTypes = [
	"software_article",
	"printing_article",
	"robotics_article",
	"computer_hardware_article",
	"all"
]
export async function fetchArticlesByCategory(req: Request, res: Response): Promise<void> {

	if(!req.query.category)
		res.status(500).send("Missing category value")

	if(!articleTypes.includes(String(req.query.category)))
		res.status(500).send("this is not a valid category")

	//TODO - Refactor, there is a better way
	if( req.query.category === "all" ) {
		const [err, result] = await wrapPromise(fetchArticles())

		if(err || !result) {
			return handleServerError(res, 500, String(err))
		}

		res.send({
			statusCode: 200,
			data: result
		})
	}

	const [err, result] = await wrapPromise(
		getArticlesByCategory(req.query.category as ArticleType))


	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.send({
		statusCode: 200,
		data: result
	})

}

export async function fetchAllAnailableCategories(_req: Request, res: Response): Promise<void> {

	//TODO - make it dynamic
	// const [err, result] = await wrapPromise(fetchCollections())
	//
	// if(err || !result) {
	// 	return handleServerError(res, 500, String(err))
	// }

	res.send({
		statusCode: 200,
		data: {
			"Software": "software_article",
			"3D Printing": "printing_article",
			"Robotics": "robotics_article",
			"Computer Hardware": "computer_hardware_article",
			"All": "all"
		}
	})


}