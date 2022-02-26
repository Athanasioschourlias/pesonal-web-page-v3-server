import * as express from "express"

// Main router object
const routes = express.Router()

/**
 * API router
 * Contains all routers expect client static files
 */
const apiRoutes = express.Router()

/**
 * API V1
 */
const admin = express.Router() //Admin stuff
const utilities = express.Router() //For submitting a form or geting CV in a pdf format.
const blog = express.Router() //For managing all the blog articles, in the blog page and/or the dev page
const agro = express.Router() //For the connected apps like weather on fields and other feature apps.


// Main router object usage
routes.use("/api/v1", apiRoutes)

// API router usage
apiRoutes.use("/utilities",utilities)
apiRoutes.use("/admin",admin)
apiRoutes.use("/blog",blog)
apiRoutes.use("/agro",agro)

//validation
//TODO - implement a login solution with JWT for admins only for start.
// admin.use()

//Sub router usage



export = routes