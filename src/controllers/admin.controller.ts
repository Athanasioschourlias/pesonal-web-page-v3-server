import { Request, Response } from "express"

export async function addNewArticle(_req: Request, res: Response): Promise<void> {

	res.statusCode = 404
	res.send("Oupsss We dont have that functionality yet try again an other time")

}