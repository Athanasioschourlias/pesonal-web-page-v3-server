# pesonal-web-page-v3-server

## Docker

---

- ###Handling images
  - There are three different ways to name/tag local images, and build them
  
    - When Building an image -> ```docker build -t <hub-user>/<already-created-repo-name>[:<tag>]```
    - Re-taging a local image -> ```docker tag <existing-image> <hub-user>/<already-created-repo-name>[:<tag>]```
    - By committing changes -> ```docker tag <existing-container> <hub-user>/<already-created-repo-name>[:<tag>]```

  - To build an image from the server
    
    1. cd to the dockerfiles
    2. run -> `docker build -f ./<dockerfile-name> -t athanasioschourlias/webpage-server:[tag] ../../` (The "../../", is setting the docker context for the build.)
  
  - Pushing an image to the registry
    
    1. RUN -> `docker push athanasioschourlias/webpage-server:[tagname]`

- ###Development enviroment

  - To start the server in a development enviroment -> ``docker-compose -p <servername> --env-file ../env/.env -f docker-compose.yml up --build -d``
  - To Stop and remove the containers -> ``docker compose -p <servername> down ``

- ###Production


## Migrations

---

- ## db migrate option

- ```--env, -e                   The environment to run the migrations under.    [default: "dev"]```
- ```--migrations-dir, -m        The directory containing your migration files.  [default: "./migrations"]```
- ```--count, -c                 Max number of migrations to run.```
- ```--dry-run                   Prints the SQL but doesn't run it.              [boolean]```
- ```--verbose, -v               Verbose mode.                                   [default: false]```
- ```--config                    Location of the database.json file.             [default: "./database.json"]```
- ```--force-exit                Call system.exit() after migration run          [default: false]```
- ```--sql-file                  Create sql files for up and down.               [default: false]```
- ```--coffee-file               Create a coffeescript migration file            [default: false]```
- ```--migration-table           Set the name of the migration table.```
- ```--table, --migration-table                                                  [default: "migrations"]```

- ###Creation of a migration script

  - To create a new migration script is necessary(in our project) to define the location of the config file and the environment variables(connection) 
  on which this migration we would like it to run```db-migrate create 310822_create-blog-table --config './src/config/database.json' -e '<env>'```

- ###Migrate up

  1. if we would like for the migration to run only in one of our env's we can run. This scope logic(:<env>) applies to all the migration commands -> ```db-migrate up:test```

  2. Now to run all the available migrations specified by the env we choose we can run -> ```db-migrate up --config './src/config/database.json' -e '<env>'```
     1. We can also run a specific number of migration scripts by writing -> ```db-migrate up -c <number> --config './src/config/database.json' -e '<env>'```
     
- ###Migrate down

  1. If we would like to go back one migration script, but again in specific env we can write -> ```db-migrate down:test --config './src/config/database.json' -e '<env>'```

  2. Now to go back one migration we run -> ```db-migrate down --config './src/config/database.json' -e '<env>'```
     1. We can also run a specific number of migration scripts by writing -> ```db-migrate down -c <number> --config './src/config/database.json' -e '<env>'```
  
  3. If we want now to execute all the down migrations at once we can run -> ```db-migrate reset --config './src/config/database.json' -e '<env>'``` 

## Jenkins

---

- To know the status of jenkins:<br />`sudo service jenkins status`
- To start the jenkins: <br /> `sudo service jenkins start`
- To stop jenkins:<br /> `sudo service jenkins stop`
- To restart jenkins<br />`sudo service jenkins restart`

## Ansible

---


## Kubernetes

---

## Production deployment

---