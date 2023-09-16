import {User} from "../models/users"
import {collections} from "./database.service"
import logger from "../common/logger"
import bcrypt from "bcrypt"
import process from "process"
import jwt from "jsonwebtoken"
import {login_creds, verifiedUser} from "../types/authentication types"

export async function register(user: User): Promise<string | null> {
	try {
		const res = await collections.users?.findOne({ name: user.username })

		if(res) {
			return "There is another user with the same credentials"
		}

		try {
			const password = await bcrypt.hash(user.password, 8)

			if(!collections.users) {
				throw new Error("The collection is missing from the database")
			}

			const userRes = await collections.users.insertOne({
				username: user.username,
				role: "member",
				password: password,
			})

			logger.info(userRes)
			return "The user was created successfully"
		} catch (error) {
			logger.error(`Operation failed -> ${error}`)
			return Promise.reject(`Operation failed -> ${error}`)
		}
	} catch (err) {
		logger.error(`There was a problem creating the user ${err}`)
		return Promise.reject(`There was a problem creating the user ${err}`)
	}
}

export async function register_admin(user: User): Promise<string | null> {

	try {
		const res = await collections.users?.findOne({ name: user.username })

		if(res) {
			return "There is another user with the same credentials"
		}

		try {
			const password = await bcrypt.hash(user.password, 8)

			if(!collections.users) {
				throw new Error("The collection is missing from the database")
			}

			const userRes = await collections.users.insertOne({
				username: user.username,
				role: user.role,
				password: password,
			})

			logger.info(userRes)
			return "The user was created successfully"
		} catch (error) {
			logger.error(`Operation failed -> ${error}`)
			return Promise.reject(`Operation failed -> ${error}`)
		}
	} catch (err) {
		logger.error(`There was a problem creating the user ${err}`)
		return Promise.reject(`There was a problem creating the user ${err}`)
	}
}

export async function login(user: login_creds): Promise<string | null | verifiedUser> {
	try {
		if(!user) {
			throw new Error("No user details provided")
		}

		if(!collections.users) {
			throw new Error("The collection is missing from the database")
		}

		const foundUser = await collections.users.findOne({ username: user.username })

		logger.info(user)

		if(!foundUser) {
			throw new Error("There is no such user with that username")
		}

		const isMatch = bcrypt.compareSync(user.password, foundUser.password)

		if(isMatch) {
			const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.username },
				process.env.TOKEN_SECRET as string, {
					expiresIn: "2 days",
				})

			return { user: { username: foundUser.username, role: foundUser.role }, token: token }
		} else {
			throw new Error("Password is not correct")
		}
	} catch (error: unknown) {
		logger.error(`Login failed -> ${(error as Error).message}`)
		throw error
	}
}

export async function __createAdmin(user: User): Promise<string | null> {
	try {
		const res = await collections.users?.findOne({ username: user.username })

		if(res) {

			return Promise.reject("There is another user with the same credentials")

		} else {
			try {
				const password = await bcrypt.hash(user.password, 8)
				if(!collections.users) {
					throw new Error("The collection is missing from the database")
				}

				const userRes = await collections.users.insertOne({
					username: user.username,
					role: user.role,
					password: password,
				})

				logger.info(userRes)
				return Promise.reject("The user was created successfully")

			} catch (error: unknown) {

				logger.error(`Operation failed -> ${String(error)}`)
				return Promise.reject(`Operation failed -> ${String(error)}`)

			}
		}
	} catch (err: unknown) {
		logger.error(`There was a problem creating the user ${String(err)}`)
		return Promise.reject(`There was a problem creating the user ${String(err)}`)
	}
}
