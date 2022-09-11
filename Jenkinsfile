pipeline {
   agent any

   node {
       env.NODEJS_HOME = "${tool 'Node 6.x'}"
       // on linux / mac
       env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
       sh 'npm --version'
   }


   stages {
        stage('Test') {
                   steps {
                       sh 'echo Hello!!!'
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