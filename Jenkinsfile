pipeline {
   agent any

   tools {
        nodejs "17.0.0"
   }
   stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                git branch: 'master', url: 'https://github.com/Athanasioschourlias/pesonal-web-page-v3-server.git'

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