import express from "express"
import routes from "./routes"
import logger from "./common/logger"
import packageJson from "../package.json"
import config from "./config/config"
import {connectToDatabase} from "./service/database.service"
import cors from "cors"
import {__createAdmin} from "./service/authentication.service"



const environment = config.NODE_ENV || "development"
logger.info(`Initializing thanos webpage Server version: ${packageJson.version}. Enviroment: ${environment}, Secrets: ${config.TOKEN_SECRET}`)


const app: express.Application = express()

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.

const options: cors.CorsOptions = {
	origin: "*",
	maxAge: 84600
}

app.use(express.json())
	.use((_req, _res, next) => { next() }, cors(options))
	// .use(historyApiFallback())// Middleware in order to fix the issue when a user refreshes the page and is not in the landing page


connectToDatabase()
	.then(() => {
		app.use("/", routes)

		app.listen(config.PORT, function() {
			logger.info(`Web page server is listening on port -> ${config.PORT}`)
		})

		__createAdmin({
			"username": "admin",
			"role": "admin",
			"password": "1234"
		}).then((message) => {
			logger.info(message)
		}).catch( (err) => {
			logger.error(`There was a problem while creating a user ${err}`)
		})
	})
	.catch((error: Error) => {
		logger.error(`Database connection failed -> ${error}`)
	})

