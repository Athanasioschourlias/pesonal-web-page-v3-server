import {articles} from "../models/technical_article"

type ArticleType =
	"software_article" |
	"printing_article" |
	"robotics_article" |
	"computer_hardware_article"

type article = {
	article: articles | articles[],
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
	ArticleType,
	form
}