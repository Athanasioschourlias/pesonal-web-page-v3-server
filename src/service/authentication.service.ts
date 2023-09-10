import {User} from "../models/users"
import {collections} from "./database.service"
import logger from "../common/logger"
import bcrypt from "bcrypt"
import process from "process"
import jwt from "jsonwebtoken"
import {login_creds, verifiedUser} from "../types/authentication types"

export function register(user: User): Promise<string> {
	if(!collections.users) return Promise.reject(new Error("The collection is missing from the database"))

	return collections.users.findOne({ name: user.username })
		.then(res => {
			if(res) return Promise.reject(new Error("There is another user with the same credentials"))
            
			return bcrypt.hash(user.password, 8)
		})
		.then(hash => {
			return collections.users!.insertOne({
				name: user.username,
				role: user.role,
				password: hash,
			})
		})
		.then(userRes => {
			logger.info(userRes)
			return "The user was created successfully"
		})
		.catch((error: unknown) => Promise.reject(error))
}


async function createJWT(id: string, username: string): Promise<string> {
	return jwt.sign({ _id: id, name: username }, process.env.TOKEN_SECRET as string, {
		expiresIn: "2 days",
	})
}

async function comparePassword(providedPassword: string, storedPassword: string): Promise<boolean> {
	return bcrypt.compareSync(providedPassword, storedPassword)
}

export function login(user: login_creds): Promise<verifiedUser | null> {
	if(!user) return Promise.reject(new Error("No user details provided"))
	
	if(!collections.users) return Promise.reject(new Error("The collection is missing from the database"))

	return collections.users.findOne({ name: user.username })
		.then(foundUser => {
			if(!foundUser) return Promise.reject(new Error("There is no such user with that username"))

			return comparePassword(user.password, foundUser.password)
				.then(isMatch => {
					if(!isMatch) return Promise.reject(new Error("Password is not correct"))
					
					return createJWT(foundUser._id?.toString() ?? "", foundUser.username)
						.then(token => ({
							user: { username: foundUser.username, role: foundUser.role },
							token,
						}))
				})
		})
		.catch((error: unknown) => Promise.reject(error))
}

export function __createAdmin(user: User): Promise<string> {
	if(!collections.users) return Promise.reject(new Error("The collection is missing from the database"))

	return collections.users.findOne({ name: user.username })
		.then(res => {
			if(res) return Promise.reject(new Error("There is another user with the same credentials"))

			return bcrypt.hash(user.password, 8)
		})
		.then(hash => {
			return collections.users!.insertOne({
				name: user.username,
				role: user.role,
				password: hash,
			})
		})
		.then(userRes => {
			logger.info(userRes)
			return "The admin was created successfully"
		})
		.catch((error: unknown) => Promise.reject(error))
}

