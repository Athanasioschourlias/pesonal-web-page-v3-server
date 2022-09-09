pipeline {
   agent any

   stages {
       stage('Example Build') {
           steps {
               sh ' npm install '
                sh ' npm run build '
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