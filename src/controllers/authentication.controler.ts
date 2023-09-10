import { Request, Response } from "express"
import {wrapPromise} from "../common/utils"
import {handleServerError} from "../common/responseHelper"
import {login, register} from "../service/authentication.service"
import {User} from "../models/users"
import {login_creds} from "../types/authentication types"

export async function loginOne(req: Request, res: Response): Promise<void> {

	const [err, result] = await wrapPromise(login(req.body as login_creds))

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.send({
		statusCode: 200,
		data: result
	})


}


export async function registerOne(req: Request, res: Response): Promise<void> {

	const [err, result] = await wrapPromise(register(req.body as User))

	if(err || !result) {
		return handleServerError(res, 500, String(err))
	}

	res.send({
		statusCode: 200,
		data: result
	})

}