import jwt, { Secret, JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import process from "process"
import logger from "../common/logger"

export const SECRET_KEY: Secret = process.env.TOKEN_SECRET

export interface CustomRequest extends Request {
	token: string | JwtPayload
}

export async function authToken(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "")

		if(!token) {
			logger.error("The token is missing while trying to authenticate.")
			return res.status(401).send({
				statusCode: 401,
				message: "Try adding a token header"
			})
		}

		const decoded = jwt.verify(token, SECRET_KEY);
		(req as CustomRequest).token = decoded

		next()
		return Promise.resolve()
	} catch (err) {
		logger.error("Authentication failed: ", err);
		return res.status(401).send({
			statusCode: 401,
			message: "Authenticate again please."
		})
	}
}
