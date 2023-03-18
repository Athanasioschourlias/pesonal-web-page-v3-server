import * as express from "express"
import {
	fetchAllArticles,
	fetchArticlesByCategory

} from "./controllers/blog.controller"
import {getAllForms, getCv, storeFormResults} from "./controllers/utilities.controller"



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
routes.use("/api/v1", apiRoutes, express.json())

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
// admin.post("/articles/category", addNewArticle)
//
// admin.delete("/articles/id", deleteArticleByid)
//
// admin.put("/articles/id", editArticleById)



admin.get("/forms", getAllForms)

/** Utilities **/
utilities.get("/cv", getCv)
utilities.post("/form", storeFormResults)//figure out whether the forms will be stored in the db or send by mail or both.

/** Blog **/
blog.get("/articles/all", fetchAllArticles)
blog.get("/articles/category", fetchArticlesByCategory)

/** Agro **/
//TODO - This will be used in the future when the agro project will be on the way to display data and many more.


export = routes