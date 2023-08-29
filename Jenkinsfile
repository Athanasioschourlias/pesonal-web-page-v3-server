pipeline {
    agent any

    environment {
        NODE_ENV="development"
        PORT=3000
        EXPOSED_PORT=3000
        TOKEN_SECRET="2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&"
        DB_CONN_STRING="mongodb://localhost:27017"
        DB_NAME="articlesDB"
    }

    stages {

        stage('Start MongoDB') {
            steps {
                sh '''
                    docker run --name mongodb-test -d -p 27017:27017 mongo:latest
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                nodejs(nodeJSInstallationName: '17.0.0') {
                    sh '''
                        npm --version
                        npm ci
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
                        APP_PID=$!
                    '''
                }
            }
        }

        stage('Kill Application') {
            steps {
                    sh '''
                        kill $APP_PID
                    '''
            }
    }

    post {
        always {
            // Actions that should be taken regardless of the build status
            sh '''
                docker stop mongodb-test || true
                docker rm mongodb-test || true
            '''
        }
    }
}
