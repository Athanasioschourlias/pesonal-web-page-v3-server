import { Request, Response } from "express"
import {wrapPromise} from "../common/utils"
import {articles} from "../models/technical_article"
import {handleServerError} from "../common/responseHelper"
import {
	createTechnicalArticle,
	deleteTechnicalArticle,
	putTechnicalArticle
} from "../service/admin.service"

export async function addNewArticle(req: Request, res: Response): Promise<void> {


	if(!req.body) {
		res.status(500).send("No body for the new article provided")
	}

	const [err, result] = await wrapPromise(
		createTechnicalArticle(req.body as articles)
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 201
	res.send(result)

}

export async function deleteArticleByid(req: Request, res: Response): Promise<void> {

	if(!req.query.id || !req.query.category ) {
		res.status(500).send("Missing Id or category value")
	}

	const [err, result] = await wrapPromise(
		deleteTechnicalArticle(String(req.query.id), String(req.query.category))
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.send({
		statusCode: 202,
		data: result
	})

}


export async function editArticleById(req: Request, res: Response): Promise<void> {

	if(!req.body) {
		res.status(500).send("No body for the new article provided")
	}

	if(!req.query.id) {
		res.status(500).send("Missing Id value")
	}


	const [err, result] = await wrapPromise(
		putTechnicalArticle(req.body as articles, String(req.query.id))
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.send({
		satusCode: 200,
		data:result
	})

}
