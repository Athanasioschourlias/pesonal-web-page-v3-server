import {Request, Response} from "express"
import {handleServerError} from "../common/responseHelper"
import {wrapPromise} from "../common/utils"
import {getArticles} from "../service/blog.service"

export async function getAllArticles(_req: Request, res: Response): Promise<void> {

	//TODO - token logic here

	const [err, result] = await wrapPromise(getArticles())
	if(err || !result) {
		return handleServerError(res, 500)
	}
	res.statusCode = result.statusCode
	res.send(result)


}

export async function deleteArticles(_req: Request, res: Response): Promise<void> {

	res.statusCode = 200
	res.send("Oupsss We dont have that functionality yet try again an other time")

}

export async function editArticles(_req: Request, res: Response): Promise<void> {

	res.statusCode = 200
	res.send("Oupsss We dont have that functionality yet try again an other time")

}