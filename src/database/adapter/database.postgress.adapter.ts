import { Pool, QueryResult } from "pg"
import logger from "../../common/logger"
import { wrapPromise } from "../../common/utils"
import dbConfigFile from "../../config/database.json"
import configuration from "../../config/config"


interface dbConfig {
	host: string
	port: number
	database: string
	user: string
	password: string
}

class PostgresSQLAdapter {

	private pool: Pool

	constructor({ host, port, database, user, password }: dbConfig) {
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

const environment = configuration.NODE_ENV || "development"
const config: dbConfig = {
	host: dbConfigFile[environment].host || "localhost",
	port: dbConfigFile[environment].port as number || 5432,
	database: dbConfigFile[environment].database || "",
	user:dbConfigFile[environment].user || "",
	password: dbConfigFile[environment].password || ""
}

const db = new PostgresSQLAdapter(config)
export = db