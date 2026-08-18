pipeline {
    agent any

    environment {
        // CI/CD Environment Variable Injection
        HEADLESS = 'true'
    }

    stages {
        stage('Checkout Repository') {
            steps {
                // Pull down the latest code changes from your Git repository branch automatically
                checkout scm
            }
        }

        stage('Install Frame Dependencies') {
            steps {
                echo 'Installing framework packages and browser binary context modules...'
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Execute Automation Matrix') {
            steps {
                echo 'Running complete structural validation suite via Playwright Test Runner Engine...'
                // Run all tests and prevent build failures from terminating report extraction stages
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            echo 'Post-Execution Pipeline: Harvesting Allure Reports & Fail Artifacts...'
            
            // 7. ARTIFACTS: Archive videos, traces, and failure screenshots for stakeholders
            archiveArtifacts artifacts: 'playwright-report/**/*, test-results/**/*', allowEmptyArchive: true
            
            // 7. REPORTING: Publish the interactive Allure Dashboard straight to Jenkins Dashboard UI
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
    }
}
