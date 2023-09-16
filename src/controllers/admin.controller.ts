import { Request, Response } from "express"
import {wrapPromise} from "../common/utils"
import {articles} from "../models/technical_article"
import {handleServerError} from "../common/responseHelper"
import {
	createTechnicalArticle,
	deleteTechnicalArticle, fetrchAllUsers,
	putTechnicalArticle, putUserById, removeUserById
} from "../service/admin.service"
import logger from "../common/logger"
import {User_update} from "../types/authentication types"

export async function addNewArticle(req: Request, res: Response): Promise<void> {

	logger.info(req.body)

	if(!req.body) {
		res.status(500).send("No body for the new article provided")
	}

	const [err, result] = await wrapPromise(
		createTechnicalArticle(req.body.data as articles)
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 201
	res.send(result)

}

export async function deleteArticleByid(req: Request, res: Response): Promise<void> {

	if(!req.query.id || !req.query.category ) {
		res.send({
			status: 422,
			message: "Missing Id or category value"
		})
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


export async function getAllUsers(_req: Request, res: Response): Promise<void> {


	const [err, result] = await wrapPromise(
		fetrchAllUsers()
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.send(result)

}

export async function deleteUserById(req: Request, res: Response): Promise<void> {

	if(!req.query.id || req.query.id === "") {
		res.send({
			status: 422,
			message: "The id if the user is missing or is empty!"
		})
	}


	const [err, result] = await wrapPromise(
		removeUserById(String(req.query.id))
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.send(result)

}

export async function editUserById(req: Request, res: Response): Promise<void> {

	if(!req.body) {
		res.send({
			status: 422,
			message: "No body for the new user provided"
		})
	}

	if(!req.query.id) {
		res.send({
			status: 422,
			message: "Missing Id value"
		})
	}

	const [err, result] = await wrapPromise(
		putUserById(String(req.query.id), req.body.data as User_update)
	)

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.send(result)

}