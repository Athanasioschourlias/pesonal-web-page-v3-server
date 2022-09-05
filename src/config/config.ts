import path from "path"
import * as dotenv from "dotenv"
import logger from "../common/logger"

// Parsing the env file.
dotenv.config({ path: path.join(__dirname, "../", ".env") })

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all
interface ENV {
	NODE_ENV: string | undefined;
	PORT: number | undefined;
	TOKEN_SECRET: string | undefined;
}

interface Config {
	NODE_ENV: string;
	PORT: number;
	TOKEN_SECRET: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
	return {
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
		TOKEN_SECRET: process.env.TOKEN_SECRET
	}
}

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
	for(const [key, value] of Object.entries(config)) {
		if(key == "PORT" && value === undefined){
			//Setting a default variable for the server if the user has not set a port number
			process.env.PORT = "3000"
			continue
		}
		if(value === undefined) {
			logger.info(`Missing key ${key} in config.env`)
		}
	}
	return config as Config
}

const config = getConfig()

const sanitizedConfig = getSanitzedConfig(config)

export default sanitizedConfig