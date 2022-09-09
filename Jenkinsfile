pipeline {
   agent any

   tools {
        "Web-page-Node" '17.0.0'
   }
   stages {
       stage('Example Build') {
           steps {
               sh ' npm --version '
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