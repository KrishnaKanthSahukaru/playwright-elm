pipeline {
    agent any
    
    options {
        // This cleans the workspace safely BEFORE the code is checked out from Git
        skipDefaultCheckout(false)
        disableConcurrentBuilds()
    }
    
    tools {
        nodejs 'node20' 
    }
    
    // 1. ADD THE ENVIRONMENT BLOCK HERE
    environment {
        // This forces Jenkins to use a permanent shared folder for your browsers
        PLAYWRIGHT_BROWSERS_PATH = 'C:\\PlaywrightCache'
    }
    stages {
        // REMOVED: The destructive Clean Workspace stage from here
        
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }
        
        stage('Execute Playwright Test Automation Suite') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npx playwright test'
                }
            }
        }
    }
    
    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'
        }
    }
}
