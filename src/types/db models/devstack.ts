//Article types
type  devstack_article = {
	title: string,
	//The images attributes will be just the name of the image that is already
	// uploaded or will be sanctimoniously uploaded with a standar prefix that
	// points to the clients articles folder with all the photos.
	dev_stack: JSON,
	article_text: string,
	ref_citing: JSON,
	date: Date
}

type devstack_articleData = {
	articles: devstack_article[] | null,
	statusCode: number,
	errmessage?: string
}

export {
	devstack_article,
	devstack_articleData
}