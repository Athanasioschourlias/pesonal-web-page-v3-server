import {hardware_article, technical_article} from "../models/technical_article"


type article = {
	article: technical_article | hardware_article | technical_article[] | hardware_article[],
	statusCode: number,
	errorMessage?: string
}

type form = {
	name: string | null,
	mail: string | null,
	phone?: string,
	text: string

}

export {
	article,
	form
}