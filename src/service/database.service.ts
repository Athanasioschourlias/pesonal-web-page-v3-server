// External Dependencies
import * as mongoDB from "mongodb"
import * as dotenv from "dotenv"
import logger from "../common/logger"

// Global Variables
export const collections: {
	software_article?: mongoDB.Collection,
	printing_article?: mongoDB.Collection,
	robotics_article?: mongoDB.Collection,
	computer_hardware_article?: mongoDB.Collection,
	users?: mongoDB.Collection,
	forms?: mongoDB.Collection
} = {}

// Initialize Connection
export async function connectToDatabase () {
	dotenv.config()

	const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING)

	await client.connect()

	const db: mongoDB.Db = client.db(process.env.DB_NAME)

	//Initializing collections
	const software_article_Collection: mongoDB.Collection =
		db.collection("software_articles")

	const hardware_article_Collection: mongoDB.Collection =
		db.collection("computer_hardware_articles")

	const robotics_article_Collection: mongoDB.Collection =
		db.collection("robotics_articles")

	const printing_article_Collection: mongoDB.Collection =
		db.collection("printing_articles")

	const froms_collection: mongoDB.Collection =
		db.collection("forms")

	const users: mongoDB.Collection =
		db.collection("users")

	collections.software_article = software_article_Collection
	collections.printing_article = printing_article_Collection
	collections.robotics_article = robotics_article_Collection
	collections.computer_hardware_article = hardware_article_Collection
	collections.users = users
	collections.forms = froms_collection

	logger.info(`Successfully connected to database: ${db.databaseName} 
	and collections: `
	)
}