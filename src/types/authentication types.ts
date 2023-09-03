type verifiedUser = {

	user: {
		username: string | null,
		role: string | null,
	},
	token: string

}

type login_creds={
	username: string,
	password: string
}


export {
	verifiedUser,
	login_creds
}