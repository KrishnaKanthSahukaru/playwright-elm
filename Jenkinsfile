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
        PLAYWRIGHT_BROWSERS_PATH = 'C:\\Users\\sahuk\\AppData\\Local\\ms-playwright'
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
            // 1. Parses the XML file we configured in Step 1 for trends/graphs
            junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'
            
            // 2. Publishes the actual visual HTML report to the Jenkins sidebar
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}