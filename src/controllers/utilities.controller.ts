import {Request, Response} from "express"
import path from "path"
import {wrapPromise} from "../common/utils"
import {handleServerError} from "../common/responseHelper"
import {fetchForms} from "../service/utillities.service"
import {mailer} from "../service/mailing.service"
import {form} from "../types/serviceGenericTypes"

export async function health(_req: Request, res: Response): Promise<void> {

	res.send({
		satusCode: 200,
		health: "Up and running",
		route: "Responding a GET call in the route of api/v1/health_check/"
	})

}

export async function getCv(_req: Request, res: Response): Promise<void> {

	res.statusCode = 200
	res.download(path.join(__dirname,"../.." ,"assets/pdf/23-10-22_google_inter_application.pdf"))
}

export async function storeFormResults(req: Request, res: Response): Promise<void> {

	if(!req.body) {
		res.status(500).send("No body for the new form provided")
	}

	//Here we have the functionality in order to store the form, although this is not very GDPR-compliant and creates a vulnerability
	// const [err, result] = await wrapPromise(storFormToDb(req.body.data as form))

	// if(err || !result) {
	// 	return handleServerError(res, 500, String(err))
	// }


	const [err, result] = await wrapPromise(mailer(req.body.data as form))

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}



	res.send({
		satusCode: 200,
		data: result
	})
}

export async function getAllForms(req: Request, res: Response): Promise<void> {

	if(!req.body) {
		res.status(500).send("No body for the new article provided")
	}

	const [err, result] = await wrapPromise(fetchForms())

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.send({
		satusCode: 200,
		data: result
	})
}


