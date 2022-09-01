export default interface dbConnectionConfig {

	host: string
	port: number
	database: string
	user: string
	password: string

}

export interface dbConnectionConfigInitializer {
	host: string
	port: number
	database: string
	user: string
	password: string
}