pipeline {
    agent any
    
    tools {
        // Tells Jenkins to load the Node configuration we saved earlier
        nodejs 'node20' 
    }
    
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Installs the exact package versions from your package-lock.json
                bat 'npm ci'
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                // Downloads the system binaries for chromium, firefox, and webkit
                bat 'npx playwright install'
            }
        }
        
        stage('Execute Playwright Test Automation Suite') {
            steps {
                // Prevents a test failure from completely breaking the Jenkins agent cleanup
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npx playwright test'
                }
            }
        }
    }
    
    post {
        always {
            // Archives test results to show directly on the build dashboard
            junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'
        }
    }
}
