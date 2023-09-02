import path from "path"
import * as dotenv from "dotenv"
import logger from "../common/logger"
import * as process from "process"

// Parsing the env file.
dotenv.config({ path: path.join(__dirname, "../", ".env") })

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all
interface ENV {
	NODE_ENV: string | undefined;
	PORT: number | undefined;
	EXPOSED_PORT: number | undefined;
	TOKEN_SECRET: string | undefined;
	DB_CONN_STRING: string;
	DB_NAME: string;
	SMTP_HOST: string;
	SMTP_PORT: number;
	SMTP_USERNAME: string | undefined;
	SMTP_PASSWORD: string | undefined;
	SMTP_SENDER: string | undefined;
}

interface Config {
	NODE_ENV: string;
	PORT: number;
	EXPOSED_PORT: number;
	TOKEN_SECRET: string;
	DB_CONN_STRING: string;
	DB_NAME: string;
	SMTP_HOST: string;
	SMTP_PORT: number;
	SMTP_USERNAME: string;
	SMTP_PASSWORD: string;
	SMTP_SENDER: string;

}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
	return {
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
		EXPOSED_PORT: process.env.EXPOSED_PORT ? Number(process.env.PORT) : undefined,
		TOKEN_SECRET: process.env.TOKEN_SECRET,
		DB_CONN_STRING: process.env.DB_CONN_STRING,
		DB_NAME:process.env.DB_NAME,
		SMTP_HOST: process.env.SMTP_HOST ? String(process.env.SMTP_HOST) : "smtp.gmail.com",
		SMTP_PORT: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
		SMTP_USERNAME: process.env.SMTP_USERNAME,
		SMTP_PASSWORD: process.env.SMTP_PASSWORD,
		SMTP_SENDER: process.env.SMTP_SENDER
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
		if(key == "EXPOSED_PORT" && value === undefined){
			//Setting a default variable for the server if the user has not set a port number
			process.env.EXPOSED_PORT = "3000"
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