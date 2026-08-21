pipeline {
    agent any

        environment {
        // Secure Enterprise Architecture: Only public configurations are plain text
        BASE_URL = 'https://reqres.in'
        API_URL  = 'https://reqres.in'
        HEADLESS = 'true'
        API_MODE = 'mock'
        
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
                echo 'Running API-first contract suite and UI smoke coverage...'
                bat 'npm run typecheck'
                bat 'npm run test:smoke'
                bat 'npm run test:regression'
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