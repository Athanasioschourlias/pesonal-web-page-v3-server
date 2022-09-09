pipeline {
   agent any
   stages {
       stage('Example Build') {
           steps {
               sh 'npm ci'
           }
       }
       stage('Example Deploy') {
           when {
               branch 'production'
               environment name: 'DEPLOY_TO', value: 'production'
           }
           steps {
               echo 'Deploying'
           }
       }
   }
}