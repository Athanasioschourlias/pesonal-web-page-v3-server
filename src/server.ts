import express from "express"
import routes from "./routes"
import logger from "./common/logger"
import packageJson from "../package.json"
import config from "./config/config"
import {existsSync} from "fs"
import path from "path"

const environment = config.NODE_ENV || "development"
logger.info(`Initializing thanos webpage Server version: ${packageJson.version}. Enviroment: ${environment}`)


const app: express.Application = express()
app.use(express.json())

//Error Handler
//TODO-implement an error handler

app.use("/", routes)

/**
 * Here multiple things are happening:
 * Firstly, we are checking(synchronously) if a file exists in the given path
 * Then, we use the build in middleware of js to let express know there is a dist folder and assets of the vue build
   static files from a directory located at the root of our project and its named dist.
 * Then for the default URI(/) we are loading the index.html file.
 **/
if(existsSync(path.join(__dirname, "../client"))) {
	app.use(express.static(path.join(__dirname, "../client")))

	app.get("/", (_req, res) => {
		res.sendFile(path.join(__dirname, "../client/index.html"))
		logger.info("Serving Static Files")
	})
}

app.listen(config.PORT, function() {
	logger.info(`Thanos web page server is listening on port -> ${config.PORT}`)
})
