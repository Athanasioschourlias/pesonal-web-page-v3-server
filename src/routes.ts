import * as express from "express"
import {
	addHardwareArticle,
	addTechnicalArticle,
	deleteHardwareArticleById,
	deleteTechnicalArticleById,
	editHardwareArticle,
	editTechnicalArticle,
	getAllHardwareArticles,
	getAllTechnicalArticles,
	getHardwareArticleById,
	getTechnicalArticleById
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
admin.post("/articles/tech_article", addTechnicalArticle)
admin.post("/articles/hardware_article", addHardwareArticle)

admin.delete("/articles/hardware_article", deleteHardwareArticleById)
admin.delete("/articles/tech_article", deleteTechnicalArticleById)

admin.put("/articles/tech_article", editTechnicalArticle)
admin.put("/articles/hardware_article", editHardwareArticle)

admin.get("/forms", getAllForms)

/** Utilities **/
utilities.get("/cv", getCv)
utilities.post("/form", storeFormResults)//figure out whether the forms will be stored in the db or send by mail or both.


/** Blog **/
blog.get("/articles/hardware_articles", getAllHardwareArticles)
blog.get("/articles/hardware_article", getHardwareArticleById)
blog.get("/articles/tech_articles", getAllTechnicalArticles)
blog.get("/articles/tech_article", getTechnicalArticleById)

/** Agro **/
//TODO - This will be used in the future when the agro project will be on the way to display data and many more.


export = routes