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

type User_update = {
	username: string,

	role: string
}

export {
	verifiedUser,
	login_creds,
	User_update
}