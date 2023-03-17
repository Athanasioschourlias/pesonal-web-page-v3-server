import {Request, Response} from "express"
import path from "path"
import {wrapPromise} from "../common/utils"
import {handleServerError} from "../common/responseHelper"
import {fetchForms, storFormToDb} from "../service/utillities.service"
import {form} from "../types/serviceGenericTypes"


export async function getCv(_req: Request, res: Response): Promise<void> {

	res.statusCode = 200
	res.download(path.join(__dirname,"../.." ,"assets/pdf/23-10-22_google_inter_application.pdf"))
}

export async function storeFormResults(req: Request, res: Response): Promise<void> {

	if(!req.body) {
		res.status(500).send("No body for the new article provided")
	}

	const [err, result] = await wrapPromise(storFormToDb(req.body as form))

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 200
	res.send(result)
	res.statusCode = 200
	res.download(path.join(__dirname,"../.." ,"assets/pdf/23-10-22_google_inter_application.pdf"))
}

export async function getAllForms(req: Request, res: Response): Promise<void> {

	if(!req.body) {
		res.status(500).send("No body for the new article provided")
	}

	const [err, result] = await wrapPromise(fetchForms())

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.statusCode = 200
	res.send(result)
	res.statusCode = 200
	res.download(path.join(__dirname,"../.." ,"assets/pdf/23-10-22_google_inter_application.pdf"))
}


