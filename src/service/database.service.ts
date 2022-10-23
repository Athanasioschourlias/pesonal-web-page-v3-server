// External Dependencies
import * as mongoDB from "mongodb"
import * as dotenv from "dotenv"
import logger from "../common/logger"

// Global Variables
export const collections: {
	technical_article?: mongoDB.Collection,
	hardware_article?: mongoDB.Collection,
	forms?: mongoDB.Collection
} = {}

// Initialize Connection
export async function connectToDatabase () {
	dotenv.config()

	const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING)

	await client.connect()

	const db: mongoDB.Db = client.db(process.env.DB_NAME)

	//Initializing collections
	const technical_article_Collection: mongoDB.Collection =
		db.collection(process.env.TECHNICAL_ARTICLES_COLLECTION_NAME)
	const hardware_article_Collection: mongoDB.Collection =
		db.collection(process.env.HARDWARE_ARTICLES_COLLECTION_NAME)
	const froms_collection: mongoDB.Collection =
		db.collection(process.env.FORMS_COLLECTION_NAME)

	collections.technical_article = technical_article_Collection
	collections.hardware_article = hardware_article_Collection
	collections.forms = froms_collection

	logger.info(`Successfully connected to database: ${db.databaseName} and collection: ${technical_article_Collection.collectionName}`)
}