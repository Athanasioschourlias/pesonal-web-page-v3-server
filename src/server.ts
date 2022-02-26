import express from "express"
import routes from "./routes"
import logger from "./common/logger"
import packageJson from "../package.json"
import config from "./config/config"

const environment = config.NODE_ENV || "development"
logger.info(`Initializing thanos webpage Server version: ${packageJson.version}. Enviroment: ${environment}`)


const app: express.Application = express()
app.use(express.json())

//Error Handler
//TODO-implement an error handler

app.use("/", routes)

app.listen(config.PORT, function() {
	logger.info(`Webchat server listening on port ${config.PORT}`)
})
