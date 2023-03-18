// import { Request, Response } from "express"
// import {wrapPromise} from "../common/utils"
// import {article} from "../models/technical_article"
// import {handleServerError} from "../common/responseHelper"
//
// export async function addNewArticle(req: Request, res: Response): Promise<void> {
//
// 	//TODO - fix
// 	if(!req.body) {
// 		res.status(500).send("No body for the new article provided")
// 	}
//
// 	const [err, result] = await wrapPromise(
// 		createArticle(req.body as article)
// 	)
//
// 	if(err || !result) {
// 		return handleServerError(res, 500, String(err))
// 	}
//
// 	res.statusCode = 201
// 	res.send(result)
//
// }
//
// export async function deleteArticleByid(req: Request, res: Response): Promise<void> {
//
// 	if(!req.query.id) {
// 		res.status(500).send("Missing Id value")
// 	}
//
// 	const [err, result] = await wrapPromise(
// 		deleteAlrticleId(String(req.query.id))
// 	)
//
// 	if(err || !result) {
// 		return handleServerError(res, 500, String(err))
// 	}
//
// 	res.statusCode = 202
// 	res.send(result)
//
// }
//
//
// export async function editArticleById(req: Request, res: Response): Promise<void> {
//
// 	if(!req.body) {
// 		res.status(500).send("No body for the new article provided")
// 	}
//
// 	if(!req.query.id) {
// 		res.status(500).send("Missing Id value")
// 	}
//
//
// 	const [err, result] = await wrapPromise(
// 		editArticleId(req.body as article, String(req.query.id))
// 	)
//
// 	if(err || !result) {
// 		return handleServerError(res, 500, String(err))
// 	}
//
// 	res.statusCode = 200
// 	res.send(result)
//
// }
