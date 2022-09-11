pipeline {
   agent any

   stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                git branch: 'master', url: 'https://github.com/Athanasioschourlias/pesonal-web-page-v3-server.git'

            }
        }
        stage('Test') {
                   steps {
                       sh '''
                            pwd
                            ls
                            npm ci
                           '''
                   }
               }
       stage('Example Deploy') {
           when {
               branch 'master'
               environment name: 'DEPLOY_TO', value: 'production'
           }
           steps {
               echo 'Deploying'
           }
       }
   }
}