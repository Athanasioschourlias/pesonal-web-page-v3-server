import {Pool, QueryResult} from "pg"
import database from "../../config/database.json"
import dbConnectionConfig from "../../types/db models/connections"
import logger from "../../common/logger"
import {wrapPromise} from "../../common/utils"

class PgPoolConnector {
	//fields
	private pool: Pool


	//constractor
	constructor({ host, port, database, user, password }: dbConnectionConfig) {
		this.pool = new Pool({
			host,
			port,
			database,
			user,
			password
		})
		this.testConnection()
			.catch(function(error) {
				logger.error(`Failed to connect to database. Shutting down. Err: ${error}`)
				// TODO: Hande this better
				process.exit(-1)
			})

	}


	//function
	public async query<T>(
		query: string,
		params: unknown[] = []
	): Promise<QueryResult<T>> {
		return this.pool.query(query, params)
	}

	public async close(): Promise<void> {
		await this.pool.end()
	}

	private async testConnection() {
		const [err] = await wrapPromise(this.query("SELECT NOW();"))
		if(err)
			throw new Error(
				`PostgreSQL could not execute dummy query. Error: ${JSON.stringify(err)}`
			)
	}

}

const environment = process.env.NODE_ENV || "development"

const dbConnConfig: dbConnectionConfig = {
	host: database[environment].host || "localhost",
	port: database[environment].port as number || 5432,
	database: database[environment].database || "",
	user:database[environment].user || "",
	password: database[environment].password || ""
}

const db = new PgPoolConnector(dbConnConfig)
export = db