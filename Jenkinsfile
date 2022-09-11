pipeline {
   agent any

   stages {
        stage('Test') {
                   steps {
                       nodejs(nodeJSInstallationName: 'NodeJS 17.0.0') {
                                           sh 'npm --version'
                       }
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