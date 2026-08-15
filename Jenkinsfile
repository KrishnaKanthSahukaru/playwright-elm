pipeline {
    agent any
    
    tools {
        nodejs 'node20' 
    }
    
    environment {
        PLAYWRIGHT_BROWSERS_PATH = 'C:\\Users\\sahuk\\AppData\\Local\\ms-playwright'
    }
    
    stages {
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
        
        stage('Run Tests in Shards') {
            parallel {
                stage('Execute Shard 1') {
                    steps {
                        // Playwright will pick one test file for this shard
                        bat 'npx playwright test --shard=1/2'
                    }
                }
                stage('Execute Shard 2') {
                    steps {
                        // Playwright will pick the other test file for this shard
                        bat 'npx playwright test --shard=2/2'
                    }
                }
            }
        }
        
        stage('Consolidate Shard Reports') {
            steps {
                // Merges the raw blobs inside 'blob-report' directory into a unified HTML dashboard
                bat 'npx playwright merge-reports ./blob-report --on-merge html'
            }
        }
    }
    
    post {
        always {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Unified Playwright HTML Report'
                ])
            }
        }
    }
}