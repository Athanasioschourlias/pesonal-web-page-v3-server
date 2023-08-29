pipeline {
    agent any

    environment {
        NODE_ENV="development"
        PORT=3000
        EXPOSED_PORT=3000
        TOKEN_SECRET="2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&"
        DB_CONN_STRING="mongodb://page-db:27017"
        DB_NAME="articlesDB"
        DOCKER_IMAGE = 'chmaikos/devops_hua'
        DOCKER_TAG = "latest"
    }

    stages {

        stage('Start MongoDB') {
            steps {
                sh '''
                    docker run --name page-db -d -p 27017:27017 mongo:latest
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                nodejs(nodeJSInstallationName: '17.0.0') {
                    sh '''
                        npm --version
                        npm ci && cd client && npm ci
                    '''
                }
            }
        }

        stage('Run Lint') {
            steps {
                nodejs(nodeJSInstallationName: '17.0.0') {
                    sh '''
                        npm run lint
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: '17.0.0') {
                    sh '''
                        npm run build
                    '''
                }
            }
        }

        stage('Run Application') {
            steps {
                nodejs(nodeJSInstallationName: '17.0.0') {
                    sh '''
                        npm start &
                    '''
                }
            }
        }


        // E2E Test step should be run before doing anything with image pushing

        stage('Prepare .env') {
            steps {
                script {
                    // Write to the .env file in /src directory
                    writeFile file: 'src/.env', text: """\
                        DB_CONN_STRING=${DB_CONN_STRING}
                        DB_NAME=${DB_NAME}
                        NODE_ENV=${NODE_ENV}
                        PORT=${PORT}
                        EXPOSED_PORT=${EXPOSED_PORT}
                        TOKEN_SECRET=${TOKEN_SECRET}
                    """
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                script {
                    // Retrieve credentials from Jenkins credentials manager
                    withCredentials([usernamePassword(credentialsId: 'DockerHub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        // Login to DockerHub
                        sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"

                        // Build Docker image
                        sh "docker build -t $DOCKER_IMAGE:$DOCKER_TAG -f ./docker/dockerfiles/Dockerfile.prod ."

                        // Push to DockerHub
                        sh "docker push $DOCKER_IMAGE:$DOCKER_TAG"
                    }
                }
            }
        }
    }

    post {
        always {
            // Actions that should be taken regardless of the build status
            sh '''
                docker stop page-db || true
                docker rm page-db || true
            '''
        }
    }
}
