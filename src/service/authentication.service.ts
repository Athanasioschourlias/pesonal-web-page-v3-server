import {User} from "../models/users"
import {collections} from "./database.service"
import logger from "../common/logger"
import bcrypt from "bcrypt"
import process from "process"
import jwt from "jsonwebtoken"
import {login_creds, verifiedUser} from "../types/authentication types"

export async function register(user: User): Promise<string | null> {

	collections.users?.findOne({
		name: user.username
	}).then((res) => {
		if(res)
			return new Promise<string | null>(resolve => resolve("There is an other user with the same credentials"))
		else
			return new Promise<string | null>((resolve, reject) => {

				//hashing the password and storing it to the users object
				bcrypt.hash(user.password, 8).then((password) => {

					if(!collections.users)
						return reject("The collection is missing from the database")

					collections.users.insertOne({
						name: user.username,
						role: user.role,
						password: password
					}).then((user) => {
						logger.info(user)
						if(user)
							return resolve("The user was created successfully")
						else
							return reject("The user could not be created")
					}).catch((error: Error) => {
						logger.error(`Adding user to database failed -> ${error}`)
						return reject(`Adding user to database failed -> ${error}`)
					})
				}).catch((error: Error) => {
					logger.error(`Password hashing failed -> ${error}`)
					return reject(`Password hashing failed -> ${error}`)
				})

			})
	}).catch((err) => {
		return new Promise<string | null>(reject => reject(`There was a problem creating the user ${err}`))
	})

	logger.error("This is a promise that should never be returned fro registering the admin")
	return new Promise<string | null>(
		reject => reject("This is a promise that should never be returned fro registering the admin")
	)
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

	collections.users?.findOne({
		name: user.username
	}).then((res) => {
		if(res)
			return new Promise<string | null>(resolve => resolve("There is an other user with the same credentials"))
		else
			return new Promise<string | null>((resolve, reject) => {

				//hashing the password and storing it to the users object
				bcrypt.hash(user.password, 8).then((password) => {

					if(!collections.users)
						return reject("The collection is missing from the database")

					collections.users.insertOne({
						name: user.username,
						role: user.role,
						password: password
					}).then((user) => {
						logger.info(user)
						if(user)
							return resolve("The user was created successfully")
						else
							return reject("The user could not be created")
					}).catch((error: Error) => {
						logger.error(`Adding user to database failed -> ${error}`)
						return reject(`Adding user to database failed -> ${error}`)
					})
				}).catch((error: Error) => {
					logger.error(`Password hashing failed -> ${error}`)
					return reject(`Password hashing failed -> ${error}`)
				})

			})
	}).catch((err) => {
		return new Promise<string | null>(reject => reject(`There was a problem creating the user ${err}`))
	})

	logger.error("This is a promise that should never be returned fro registering the admin")
	return new Promise<string | null>(
		reject => reject("This is a promise that should never be returned fro registering the admin")
	)
}