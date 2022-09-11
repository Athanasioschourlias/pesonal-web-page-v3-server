pipeline {
   agent any

   stages {
       stage('Example Build') {
           steps {
               sh ' git clone https://github.com/Athanasioschourlias/pesonal-web-page-v3-server.git'
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