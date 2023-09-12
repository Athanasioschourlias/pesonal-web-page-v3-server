import {User} from "../models/users"
import {collections} from "./database.service"
import logger from "../common/logger"
import bcrypt from "bcrypt"
import process from "process"
import jwt from "jsonwebtoken"
import {login_creds, LoginResult} from "../types/authentication types"

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
				name: user.username,
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

async function comparePassword(providedPassword: string, storedPassword: string): Promise<boolean> {
	return bcrypt.compareSync(providedPassword, storedPassword)
}

export function register(user: User): Promise<{ message: string; status: number }> {
	if(!collections.users) {
		return Promise.resolve({ message: "The collection is missing from the database", status: 500 })
	}

	return collections.users.findOne({ name: user.username })
		.then(res => {
			if(res) {
				return { message: "There is another user with the same credentials", status: 200 }
			}

			return bcrypt.hash(user.password, 8)
				.then((hash) => {
					return collections.users!.insertOne({
						name: user.username,
						role: user.role,
						password: hash,
					})
				})
				.then(userRes => {
					logger.info(userRes)
					return { message: "The user was created successfully", status: 200 }
				})
		})
		.catch((error: unknown) => {
			return { message: `Server error -> ${error}`, status: 500 }
		})
}

export function login(user: login_creds): Promise<LoginResult> {
	if(!user) {
		return Promise.resolve({ message: "No user details provided", status: 200 })
	}

	if(!collections.users) {
		return Promise.reject({ message: "The collection is missing from the database", status: 500 })
	}

	return collections.users.findOne({ name: user.username })
		.then((foundUser): Promise<LoginResult> => {
			if(!foundUser) {
				return Promise.resolve({ message: "There is no such user with that username", status: 200 })
			}

			return comparePassword(user.password, foundUser.password)
				.then((isMatch): Promise<LoginResult> => {
					if(!isMatch) {
						return Promise.resolve({ message: "Password is not correct", status: 200 })
					}
                    
					return createJWT(foundUser._id?.toString() ?? "", foundUser.username)
						.then((token): LoginResult => {
							return {
								user: { username: foundUser.username, role: foundUser.role },
								token,
							}
						})
						.catch((error): Promise<LoginResult> => {
							return Promise.reject({ message: String(error), status: 500 })
						})
				})
		})
		.catch((error): Promise<LoginResult> => {
			return Promise.reject({ message: String(error), status: 500 })
		})
}

export function __createAdmin(user: User): Promise<{ message: string; status: number; }> {
	if(!collections.users) {
		return Promise.resolve({ message: "The collection is missing from the database", status: 500 })
	}

export async function __createAdmin(user: User): Promise<string | null> {
	try {
		const res = await collections.users?.findOne({ name: user.username })

		if(res) {

			return Promise.reject("There is another user with the same credentials")

		} else {
			try {
				const password = await bcrypt.hash(user.password, 8)
				if(!collections.users) {
					throw new Error("The collection is missing from the database")
				}

				const userRes = await collections.users.insertOne({
					name: user.username,
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
