import * as express from "express"
import {addNewArticle} from "./controllers/admin.controller"
import {
	deleteArticles,
	editArticles,
	getAllArticles
} from "./controllers/blog.controller"
import {getCv} from "./service/utillities.service"

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

//TODO - Implement a token secret logic so not everyone can hit our endpoint if he finds them

// API router usage
apiRoutes.use("/admin",admin)
apiRoutes.use("/utilities",utilities)
apiRoutes.use("/blog",blog)
apiRoutes.use("/agro",agro)

//validation
//TODO - implement a login solution with JWT for admins only for start.
// admin.use()

//Sub router usage

/** Admin Routes **/
admin.put("/article", addNewArticle)
admin.delete("/article", deleteArticles)
admin.patch("/article", editArticles)

/** Utilities **/
utilities.get("/cv", getCv)
utilities.put("/form")//figure out whether the forms will be stored in the db or send by mail or both.


/** Blog **/
blog.get("/articles/hardware", getAllArticles)
blog.get("/articles/devstack", getAllArticles)

/** Agro **/
//TODO - This will be used in the future when the agro project will be on the way to display data and many more.


export = routes