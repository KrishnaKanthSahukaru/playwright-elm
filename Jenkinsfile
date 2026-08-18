pipeline {
    agent any

        environment {
        // Secure Enterprise Architecture: Only public configurations are plain text
        BASE_URL = 'https://reqres.in'
        API_URL  = 'https://reqres.in'
        HEADLESS = 'true'
        
        // DYNAMIC INJECTION: Pulling sensitive secrets uniquely from Jenkins Vault at runtime
        ADMIN_USERNAME = credentials('PLAYWRIGHT_TEST_USER')
        ADMIN_PASSWORD = credentials('PLAYWRIGHT_TEST_PASS')
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
            
            // 7. REPORTING: Keep this command exactly on ONE single continuous processing line!
            bat 'npx allure generate allure-results --output allure-report'
            
            // Archive the generated interactive visual dashboard folder straight to your build artifacts panel
            archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
        }
    }
}