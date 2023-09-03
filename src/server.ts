import express from "express"
import routes from "./routes"
import logger from "./common/logger"
import packageJson from "../package.json"
import config from "./config/config"
import {existsSync} from "fs"
import path from "path"
import {connectToDatabase} from "./service/database.service"
import cors from "cors"
// import historyApiFallback from "connect-history-api-fallback"


const environment = config.NODE_ENV || "development"
logger.info(`Initializing thanos webpage Server version: ${packageJson.version}. Enviroment: ${environment}`)


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
			logger.info(`Thanos web page server is listening on port -> ${config.PORT}`)
		})
	})
	.catch((error: Error) => {
		logger.error(`Databae connection failed -> ${error}`)
	})

//Error Handler
//TODO-implement an error handler
