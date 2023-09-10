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

type LoginResult = { message: string; status: number } | verifiedUser;

export {
	verifiedUser,
	login_creds,
	LoginResult
}