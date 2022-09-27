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
                        echo "NODE_ENV=development\nPORT=3000\nEXPOSED_PORT=3000\nTOKEN_SECRET=1234\nPOSTGRES_USER=postgres\nPOSTGRES_PASSWORD=securepwd" >> .env
                        npm run build
                       '''
                }
            }
        }
   }
}