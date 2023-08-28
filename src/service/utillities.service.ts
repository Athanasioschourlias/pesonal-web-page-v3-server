import {collections} from "./database.service"
import {form} from "../types/serviceGenericTypes"

export async function storFormToDb(user_form: form): Promise<string | null> {

	if(!collections.forms)
		return new Promise(rej => rej("The collection does not exist"))

	// //searching if an entry with the same mail exists
	// const form_matches = await collections.forms
	// 	.find({email: user_form.mail})
	// 	.toArray()

	// if(form_matches.length > 0)
	// 	return new Promise(reject => reject("the article already exist!"))

	return new Promise((resolve, reject) => {
		if(!collections.forms)
			return reject(null)

		try {
			collections.forms.insertOne(user_form)
				.then((res) => {
					if(res)
						return resolve("The form stored successfully")
					else
						return reject("Failed to store the form")
				})
		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}
	})

}

export async function fetchForms(): Promise<form[] | null> {

	return new Promise((resolve, reject) => {
		if(!collections.forms)
			return reject(null)

		try {
			//When we pass an empty object to find mongo will return all the results
			return resolve(collections.forms
				.find({})
				.toArray() as unknown as form[])

		} catch (error) {
			return reject(`failed to retrieve item from collection -> ${error}`)
		}
	})

}