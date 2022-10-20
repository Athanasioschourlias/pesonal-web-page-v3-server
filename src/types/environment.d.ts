import { JwtTokenSchema } from "./Auth"
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production" | "test"
			PORT: string
			TOKEN_SECRET: string
			DB_CONN_STRING: string
			DB_NAME: string
			TECHNICAL_ARTICLES_COLLECTION_NAME: string,
			HARDWARE_ARTICLES_COLLECTION_NAME: string
		}
	}
	namespace Express {
		export interface Request {
			decodedToken?: JwtTokenSchema
			locals?: {
				pxTarget: string
				pxKey: string
			}
		}
	}
}

declare module "http" {
	export interface IncomingMessage {
		locals?: {
			pxTarget: string
			pxKey: string
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}