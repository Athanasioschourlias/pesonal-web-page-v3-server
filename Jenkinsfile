pipeline {
    agent any

    environment {
        NODE_ENV="development"
        PORT=3000
        EXPOSED_PORT=3000
        TOKEN_SECRET=123
        DB_CONN_STRING="mongodb://page-db:27017"
        DB_NAME="blogDb"
        SMTP_HOST="smtp.gmail.com"
        SMTP_PORT=587
        SMTP_USERNAME="thanos.chourlias+form@gmail.com"
        SMTP_PASSWORD=env.SMTP_PASSWORD_DEVOPS_HUA
        SMTP_SENDER="thanos.chourlias+form@gmail.com"
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

        stage('Docker Build and Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'DockerHub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
                        sh "docker build -t $DOCKER_IMAGE:$DOCKER_TAG -f ./docker/dockerfiles/Dockerfile.prod ."
                        sh "docker push $DOCKER_IMAGE:$DOCKER_TAG"
                    }
                }
            }
        }

        stage('Run Ansible Playbooks') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'DevopsDockerSSH', keyFileVariable: 'SSH_KEY_PATH', usernameVariable: 'SSH_USERNAME')]) {
                        sh """
                            docker run --rm -v $(pwd):/ansible -v $SSH_KEY_PATH:/root/.ssh/id_rsa -w /ansible ansible/ansible-runner ansible-playbook ansible/deploy_docker.yml
                        """
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
