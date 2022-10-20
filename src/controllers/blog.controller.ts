import {Request, Response} from "express"
import {handleServerError} from "../common/responseHelper"
import {wrapPromise} from "../common/utils"
import {
	fetchHardwareArticleById,
	fetchTechnicalArticleById,
	getHardwareArticles,
	getTechArticles
} from "../service/blog.service"

export async function getAllHardwareArticles(_req: Request, res: Response): Promise<void> {

	const [err, result] = await wrapPromise(getHardwareArticles())

	if(err || !result) {
		return handleServerError(res, 500)
	}

	res.statusCode = 200
	res.send(result)


}

export async function getAllTechnicalArticles(_req: Request, res: Response): Promise<void> {

	const [err, result] = await wrapPromise(getTechArticles())

	if(err || !result) {
		return handleServerError(res, 500)
	}

	res.statusCode = 200
	res.send(result)


}

export async function getHardwareArticleById(req: Request, res: Response): Promise<void> {

	if(!req.params.id) {
		res.status(500).send("Missing Id value")
	}

	const [err, result] = await wrapPromise(fetchTechnicalArticleById(req.params.id))

	if(err || !result) {
		return handleServerError(res, 500)
	}

	res.statusCode = 200
	res.send(result)

}

export async function getTechnicalArticleById(req: Request, res: Response): Promise<void> {

	if(!req.params.id) {
		res.status(500).send("Missing Id value")
	}

	const [err, result] = await wrapPromise(fetchHardwareArticleById(req.params.id))

	if(err || !result) {
		return handleServerError(res, 500)
	}

	res.statusCode = 200
	res.send(result)


}




export async function deleteArticle(_req: Request, res: Response): Promise<void> {

	res.statusCode = 200
	res.send("Oupsss We dont have that functionality yet try again an other time")

}

export async function editArticle(_req: Request, res: Response): Promise<void> {

	res.statusCode = 200
	res.send("Oupsss We dont have that functionality yet try again an other time")

}