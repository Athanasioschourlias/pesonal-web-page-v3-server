import {User} from "../models/users"
import {collections} from "./database.service"
import logger from "../common/logger"
import bcrypt from "bcrypt"
import process from "process"
import jwt from "jsonwebtoken"
import {login_creds, LoginResult} from "../types/authentication types"

async function createJWT(id: string, username: string): Promise<string> {
	return jwt.sign({ _id: id, name: username }, process.env.TOKEN_SECRET as string, {
		expiresIn: "2 days",
	})
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

	return collections.users.findOne({ name: user.username })
		.then(res => {
			if(res) {
				return Promise.resolve({ message: "There is another user with the same credentials", status: 200 })
			}
            
			return bcrypt.hash(user.password, 8)
				.then(hash => {
					return collections.users!.insertOne({
						name: user.username,
						role: user.role,
						password: hash,
					})
				})
				.then(() =>{
					return Promise.resolve({ message: "The admin was created successfully", status: 200 })
				})
		})
		.catch(error => {
			return Promise.reject({ message: String(error), status: 500 })
		})
}
