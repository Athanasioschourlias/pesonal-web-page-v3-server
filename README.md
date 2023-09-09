# Awesome Personal Web Page

## Table of Contents

- [Awesome Personal Web Page](#awesome-personal-web-page)
  - [Table of Contents](#table-of-contents)
  - [Docker](#docker)
    - [Handling images](#handling-images)
    - [Development enviroment](#development-enviroment)
    - [Testing Production](#testing-production)
  - [Migrations](#migrations)
    - [db-migrate option](#db-migrate-option)
    - [Creation of a migration script](#creation-of-a-migration-script)
    - [Migrate up](#migrate-up)
    - [Migrate down](#migrate-down)
  - [Jenkins](#jenkins)
  - [Production deployment](#production-deployment)

## Docker

---

### Handling images

- There are three different ways to name/tag local images, and build them
  - When Building an image

  ```bash
  docker build -t user/image:tag
  ```

  - Re-taging a local image
  
  ```bash
  docker tag local-image user/image:tag
  ```

  - By committing changes
  
  ```bash
  docker tag existing-container user/image:tag
  ```

- To build an image from the server
  
  ```bash
  cd docker
  ```

  and run

  ```bash
  docker build -f ./dockerfiles/dockerfile-name -t hub-user/image-name:tag ../../
  ```

  _(The "../../", is setting the docker context for the build.)_

- Pushing an image to the registry

  ```sh
  docker push user/image:tag
  ```

### Development enviroment

- To start the server in a development enviroment

  ```bash
  docker-compose -p servername --env-file .env -f docker-compose.yml up --build -d
  ```

- To Stop and remove the containers

  ```bash
  docker-compose -p servername --env-file .env -f docker-compose.yml up --build -d
  ```

### Testing Production

- #### Starting the Page

  CD to the scripts folder and run the deployment script to generate the build (JS) files

  ```bash
  cd scripts
  ./build.sh
  ```

  ```sh
  cd ../docker
  docker-compose -p project name --env-file ../src/.env -f docker-compose.prod.yml up --build -d
  ```

- #### Stoping the page

   ```bash
   docker compose -p project name down
   ```

## Migrations

---

### db-migrate option

| Option                | Description                                     | Default Value   |
|----------------------|-------------------------------------------------|-----------------|
| `--env`, `-e`         | The environment to run the migrations under.     | `"dev"`         |
| `--migrations-dir`, `-m` | The directory containing your migration files. | `"./migrations"`|
| `--count`, `-c`       | Max number of migrations to run.                 |                 |
| `--dry-run`           | Prints the SQL but doesn't run it.               | `boolean`       |
| `--verbose`, `-v`     | Verbose mode.                                    | `false`         |
| `--config`            | Location of the `database.json` file.            | `"./database.json"`|
| `--force-exit`        | Call `system.exit()` after migration run         | `false`         |
| `--sql-file`          | Create sql files for up and down.                | `false`         |
| `--coffee-file`       | Create a coffeescript migration file             | `false`         |
| `--migration-table`   | Set the name of the migration table.             | `"migrations"`  |
| `--table`, `--migration-table` |                                           | `"migrations"`  |

### Creation of a migration script

- To create a new migration script is necessary(in our project) to define the location of the config file and the environment variables(connection) on which this migration we would like it to run

  ```bash
  db-migrate create 'current date like 240922-name-of-migrations' --config './src/config/database.json' -e 'env'
  ```

### Migrate up

- If we would like for the migration to run only in one of our env's we can run

  ```bash
  db-migrate up:test
  ```

  *_This scope logic (:env) applies to all the migration commands_*

- Now to run all the available migrations specified by the env we choose we can run

  ```bash
  db-migrate up --config './src/config/database.json' -e 'env'
  ```

- We can also run a specific number of migration scripts by writing

  ```bash
  db-migrate up -c number --config './src/config/database.json' -e 'env'
  ```

### Migrate down

- If we would like to go back one migration script, but again in specific env we can write

  ```bash
  db-migrate down:test --config './src/config/database.json' -e 'env'
  ```

- Now to go back one migration we run
  
  ```bash
  db-migrate down --config './src/config/database.json' -e 'env'
  ```

- We can also run a specific number of migration scripts by writing

  ```bash
  db-migrate down -c <number> --config './src/config/database.json' -e 'env'
  ```
  
- If we want now to execute all the down migrations at once we can run

  ```bash
  db-migrate reset --config './src/config/database.json' -e 'env'
  ```

## Jenkins

---
The project includes a Jenkinsfile that contains steps for building, running testing and pushing the latest version to docker-hub.  
You can adjust the steps as needed. There is also a step that performs a rolling restart of the Kubernetes cluster when a new version is available.

## Production deployment

---

If you wan to deploy a production stack of the whole app (Front+Back+Database), you can take a look at the deployment repository for easy deployment in:

- VM
- Docker Server
- Kubernetes Cluster

[Devops Project Deployment](https://github.com/chmaikos/pesonal-web-page-deployer)
