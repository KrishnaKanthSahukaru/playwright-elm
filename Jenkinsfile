pipeline {
    agent any

    environment {
        // CI/CD Environment Variable Injection (Bypasses the missing local .env file)
        BASE_URL        = 'https://reqres.in'
        API_URL         = 'https://reqres.in'
        ADMIN_USERNAME  = 'eve.holt@reqres.in'
        ADMIN_PASSWORD  = 'cityslicka'
        HEADLESS        = 'true'
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
            echo '📊 Post-Execution Pipeline: Harvesting Allure Reports & Fail Artifacts...'
            
            // 7. ARTIFACTS: Archive videos, traces, and screenshots natively
            archiveArtifacts artifacts: 'playwright-report/**/*, test-results/**/*', allowEmptyArchive: true
            
            // 7. REPORTING: Fallback native compilation command (Bypasses custom plugin dependencies)
            // This reads your allure-results folder and bundles it into an HTML page cleanly
            bat 'bat 'npx allure generate allure-results --output allure-report'
            
            // Archive the generated interactive visual dashboard folder straight to your build artifacts panel
            archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
        }
    }
}
