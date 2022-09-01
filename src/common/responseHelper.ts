import { Response } from "express"

export function handleServerError(
	res: Response,
	code: number,
	message = "Something went wrong"
): void {
	res.statusCode = code
	res.send({
		success: false,
		err: message
	})
}