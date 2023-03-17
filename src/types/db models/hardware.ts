//Article types
type  hardware_article = {
	title: string,
	//The images attributes will be just the name of the image that is already
	// uploaded or will be sanctimoniously uploaded with a standar prefix that
	// points to the clients articles folder with all the photos.
	first_img: string,
	second_img: string,
	article_text: string,
	technical_spec: JSON


}

type hardware_articleData = {
	articles: hardware_article[] | null,
	statusCode: number,
	errmessage?: string
}

export {
	hardware_article,
	hardware_articleData
}