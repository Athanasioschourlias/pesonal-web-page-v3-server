import {Request, Response} from "express"
import {handleServerError} from "../common/responseHelper"
import {wrapPromise} from "../common/utils"
import {
	createHardwareArticle,
	createTechnicalArticle, deleteHardwareArticle, deleteTechnicalArticle,
	fetchHardwareArticleById,
	fetchTechnicalArticleById,
	getHardwareArticles,
	getTechArticles, putHardwareArticle, putTechnicalArticle
} from "../service/blog.service"
import {hardware_article, technical_article} from "../models/technical_article"

export async function getAllHardwareArticles(_req: Request, res: Response): Promise<void> {

	const [err, result] = await wrapPromise(getHardwareArticles())

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 200
	res.send(result)


}
export async function getAllTechnicalArticles(_req: Request, res: Response): Promise<void> {

	const [err, result] = await wrapPromise(getTechArticles())

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 200
	res.send(result)


}


export async function getHardwareArticleById(req: Request, res: Response): Promise<void> {

	if(!req.query.id) {
		res.status(500).send("Missing Id value")
	}

	const [err, result] = await wrapPromise(fetchTechnicalArticleById(String(req.query.id)))

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 200
	res.send(result)

}
export async function getTechnicalArticleById(req: Request, res: Response): Promise<void> {

	if(!req.query.id) {
		res.status(500).send("Missing Id value")
	}

	const [err, result] = await wrapPromise(fetchHardwareArticleById(String(req.query.id)))

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 200
	res.send(result)


}


export async function addHardwareArticle(req: Request, res: Response): Promise<void> {

	if(!req.body) {
		res.status(500).send("No body for the new article provided")
	}

	const [err, result] = await wrapPromise(
		createHardwareArticle(req.body as unknown as hardware_article)
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 201
	res.send(result)

}
export async function addTechnicalArticle(req: Request, res: Response): Promise<void> {

	if(!req.body) {
		res.status(500).send("No body for the new article provided")
	}

	const [err, result] = await wrapPromise(
		createTechnicalArticle(req.body as unknown as technical_article)
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 201
	res.send(result)

}

export async function deleteHardwareArticleById(req: Request, res: Response): Promise<void> {

	if(!req.query.id) {
		res.status(500).send("Missing Id value")
	}

	const [err, result] = await wrapPromise(
		deleteHardwareArticle(String(req.query.id))
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 202
	res.send(result)

}
export async function deleteTechnicalArticleById(req: Request, res: Response): Promise<void> {

	if(!req.query.id) {
		res.status(500).send("Missing Id value")
	}

	const [err, result] = await wrapPromise(
		deleteTechnicalArticle(String(req.query.id))
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 202
	res.send(result)

}


export async function editHardwareArticle(req: Request, res: Response): Promise<void> {

	if(!req.body) {
		res.status(500).send("No body for the new article provided")
	}

	if(!req.params.id) {
		res.status(500).send("Missing Id value")
	}


	const [err, result] = await wrapPromise(
		putHardwareArticle(req.params.body as unknown as hardware_article, req.params.id)
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 200
	res.send(result)

}
export async function editTechnicalArticle(req: Request, res: Response): Promise<void> {


	if(!req.body) {
		res.status(500).send("No body for the new article provided")
	}

	const [err, result] = await wrapPromise(
		putTechnicalArticle(req.params.body as unknown as technical_article, req.params.id)
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 200
	res.send(result)

}