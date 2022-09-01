
//Article types
type  article = {
	title: string,
	article_description: string,
	//The images attributes will be just the name of the image that is already
	// uploaded or will be sanctimoniously uploaded with a standar prefix that
	// points to the clients articles folder with all the photos.
	first_img: string,
	second_img: string,
	in_service: string,
	mcu: string,
	relative_hardware: string,
	software: string,
	libraries_used: string

}

export {
	article
}