import {User} from "../models/users"
import {collections} from "./database.service"
import logger from "../common/logger"
import bcrypt from "bcrypt"
import process from "process"
import jwt from "jsonwebtoken"
import {login_creds, verifiedUser} from "../types/authentication types"

export async function register(user: User): Promise<string> {
	const res = await collections.users?.findOne({ name: user.username })
	if(res) {
		throw new Error("There is another user with the same credentials")
	}
	
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
}

async function createJWT(id: string, username: string): Promise<string> {
	return jwt.sign({ _id: id, name: username }, process.env.TOKEN_SECRET as string, {
		expiresIn: "2 days",
	})
}

async function comparePassword(providedPassword: string, storedPassword: string): Promise<boolean> {
	return bcrypt.compareSync(providedPassword, storedPassword)
}

export async function login(user: login_creds): Promise<verifiedUser> {
	if(!user) throw new Error("No user details provided")

	if(!collections.users) throw new Error("The collection is missing from the database")

	const foundUser = await collections.users.findOne({ name: user.username })

	if(!foundUser) throw new Error("There is no such user with that username")

	const isMatch = await comparePassword(user.password, foundUser.password)
	if(!isMatch) throw new Error("Password is not correct")

	const token = await createJWT(foundUser._id?.toString() ?? "", foundUser.username)

	return { user: { username: foundUser.username, role: foundUser.role }, token }
}

export async function __createAdmin(user: User): Promise<string> {
	const res = await collections.users?.findOne({ name: user.username })
	if(res) {
		throw new Error("There is another user with the same credentials")
	}
	
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
	return "The admin was created successfully"
}
