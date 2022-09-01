"use strict"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require("../build/src/common/logger")
var dbm
var type
var seed

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
	dbm = options.dbmigrate
	type = dbm.dataType
	seed = seedLink
}

exports.up = function(db) {
	return db.runSql(`
						CREATE TABLE blog (
							title VARCHAR(50) NOT NULL NOT NULL,
							article_description VARCHAR(600) NOT NULL,
							first_img VARCHAR(100) NOT NULL,
							second_img VARCHAR(100) NOT NULL,
                            in_service VARCHAR(25) NOT NULL,
                            MCU VARCHAR(100),
                            relative_hardware VARCHAR(150),
                            libraries_used VARCHAR(200)
						);`
	)
		.catch((err) =>
			logger.error(`Something went wrong wile creating the users table, error: ${err}`)
		)
}

exports.down = function(db) {
	return db.dropTable("users")
		.catch((err) =>
			logger.error(`Something went wrong wile droping the users table, error: ${err}`)
		)
}

exports._meta = {
	"version": 1
}
