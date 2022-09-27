pipeline {
   agent any

   stages {
        stage('Test') {
                   steps {
                       nodejs(nodeJSInstallationName: '17.0.0') {
                                           sh '''npm --version
                                                npm ci'''
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
   }
}