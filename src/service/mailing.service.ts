import {form} from "../types/serviceGenericTypes"
import nodemailer from "nodemailer"
import * as process from "process"
import logger from "../common/logger"

//CREATE A CONNECTION FOR LIVE
async function createConnection() {

	return nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
		secure: false,
		auth: {
			user: process.env.SMTP_USERNAME,
			pass: process.env.SMTP_PASSWORD,
		},
	})

}

export async function mailer(user_form: form): Promise<string | null> {

	const transporter: nodemailer.Transporter = await createConnection()

	return new Promise((resolve, reject) => {


		try {

			transporter.sendMail({
				from: user_form.mail ? String(user_form.mail) : undefined,
				to: "thanos.chourlias+form@gmail.com",
				subject: `New Form Submitted from ${user_form.name}`,
				text: user_form.text,

			}).then((info) => {

				logger.info(" Mail sent successfully!!")
				logger.info(`[MailResponse]=${info.response} [MessageID]=${info.messageId}`)

				return resolve(" Mail sent successfully!!")
			}).catch(error => {
				logger.error(error)
				return reject("There was an error with the credentials or other communication error")
			})

		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}
	})

}