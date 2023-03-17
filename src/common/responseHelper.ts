import { Response } from "express"

export function handleServerError(
	res: Response,
	code: number,
	message?: string
): void {
	if(message) {
		res.statusCode = code
		res.send({
			success: false,
			err: message
		})
	} else {
		res.statusCode = code
		res.send({
			success: false,
			err: "Something went wrong"
		})
	}


}