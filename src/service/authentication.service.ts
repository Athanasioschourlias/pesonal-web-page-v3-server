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
		if(!res) {
			return "There is another user with the same credentials"
		} 

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

	//Checking is the user provides a user or not
	if(!user)
		return new Promise(reject => reject("No user details provided"))

	return new Promise((_resolve, reject) => {

		if(!collections.users)
			return reject("The collection is missing from the database")

		//searching for the user
		collections.users.findOne({
			name: user.username
		}).then((foundUser) => {

			if(!foundUser) {
				return reject("There is no such user with username")
			}


			const isMatch = bcrypt.compareSync(user.password, foundUser.password)


			if(isMatch) {
				// eslint-disable-next-line max-len
				const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.username }, process.env.TOKEN_SECRET, {
					expiresIn: "2 days",
				})

				return _resolve(
					{ user: { username: foundUser.username, role: foundUser.role}, token: token }
				)
			} else {
				reject("Password is not correct")
			}

		}).catch((error: Error) => {
			logger.error(`There was an error while hashing -> ${error}`)
		})

	})
}

export async function __createAdmin(user: User): Promise<string | null> {
	try {
		const res = await collections.users?.findOne({ name: user.username })
		if(!res) {
			return "There is another user with the same credentials"
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
				return "The user was created successfully"
			} catch (error) {
				logger.error(`Operation failed -> ${error}`)
				return Promise.reject(`Operation failed -> ${error}`)
			}
		}
	} catch (err) {
		logger.error(`There was a problem creating the user ${err}`)
		return Promise.reject(`There was a problem creating the user ${err}`)
	}
}
