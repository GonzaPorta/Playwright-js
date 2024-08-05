// pipeline {
//     // Run scheduled task at 5 am Monday through Friday
//     triggers {
//         //cron("H 5 * * 1-5")
//         cron( env.BRANCH_NAME.equals('dev') ? 'H 5 * * 1-5' : '')
//     }
//     // Set retention options according to the branch
//     options {
//         buildDiscarder(
//             logRotator(
//             // number of builds to keep
//             numToKeepStr:         env.BRANCH_NAME ==~ /master/ ? '' :
//                                   env.BRANCH_NAME ==~ /dev/ ?  '40' : '30',
//             // number of builds to keep the artifacts from
//             artifactNumToKeepStr: env.BRANCH_NAME ==~ /master/ ? '' :
//                                   env.BRANCH_NAME ==~ /dev/ ?  '40' : '20',
//             // number of days to keep the builds
//             daysToKeepStr: env.BRANCH_NAME ==~ /master/ ? '' :
//                                   env.BRANCH_NAME ==~ /dev/ ?  '30' : '20',
//             // number of days to keep the artifacts                      
//             artifactDaysToKeepStr: env.BRANCH_NAME ==~ /master/ ? '' :
//                                   env.BRANCH_NAME ==~ /dev/ ?  '30' : '20'
//             )
//         )
//     }

//     parameters{
//         //string(name: 'jql', defaultValue: 'project = TOPAUT AND issuetype = Test AND labels = topaz', description: 'Filtro para identificar las issues cucumber en XRay')
//         string(name: 'SHARE_LIBRARY_BRANCH', defaultValue: 'master', description: 'Nombre de la rama de la libreria de funciones compartidas a utilizar. \n Si se llena este campo: Se toma la rama escrita en caso de encontrarse, sino arroja error y frena ejecucion')
//     }
        

//     /**
//     * Environmental variables
//     */
//     environment {
//         /**
//         * Registry info
//         */
//         registry = "registry.nbch.com.ar"
//         registryURL = "https://${registry}"
//         registryCredential = 'usr_jenkins'
//         PROJECT = 'https://git.nbch.com.ar/scm/hom/topaz-automation-web.git'
//         NEXUS_SERVER = 'https://nexus.nbch.com.ar'
//         JIRA_SERVER = 'https://jira.nbch.com.ar'

//         credentialName = "aut_apit"
//         //testAPI = 'https://jira.nbch.com.ar/rest/raven/1.0/api/test?jql='
//         //filter = java.net.URLEncoder.encode("${jql}", "UTF-8")

//         featureAPI = 'https://jira.nbch.com.ar/rest/raven/1.0/export/test?keys='
//         pathFeatures = 'topaz/src/test/resources/features/test'

//         /**
//         * Image info
//         */
//         imageName = "nbch/topaz-automation-web"

//         CUSTOM_TAG = 'custom'
//         DEV_TAG = 'dev'
//         PROD_TAG = 'latest'
//     }

//     /**
//     * Use Backend Agent
//     */
//     agent { label 'gradle' }
//     stages {
//         /**
//         * Set Parameters
//         */
//         stage('Set parameters'){
//             steps{
//                 script{
//                     env.startedByTimer = currentBuild.getBuildCauses().collect{cause -> cause.shortDescription.equals('Started by timer')}[0]

//                     //Load shared library on the fly
//                     library identifier: "shared-libraries@${SHARE_LIBRARY_BRANCH}",
//                         retriever: modernSCM([
//                         $class: 'GitSCMSource',
//                         credentialsId: "${registryCredential}",
//                         remote: 'https://git.nbch.com.ar/scm/hom/shared-libraries.git'
//                     ])

//                     echo stdOutput.printVariable("Job started by timer", env.startedByTimer)
//                     echo stdOutput.printVariable("Actual BRANCH_NAME", BRANCH_NAME)
//                     env.issueID = ""
//                     if( !BRANCH_NAME.equals('dev') && !BRANCH_NAME.equals('master') ){
//                         env.issueID = stdGit.getProjectCode(BRANCH_NAME) + stdGit.getIssueNumber(BRANCH_NAME)
//                     }
//                     env.projectID = stdGit.getProjectIDToSendFeaturesToXray("${env.PROJECT}")
//                     echo stdOutput.printVariable("issueID", env.issueID)
//                     echo stdOutput.printVariable("SHARE_LIBRARY_BRANCH", params.SHARE_LIBRARY_BRANCH)
//                     echo stdOutput.printVariable("projectID", env.projectID)
//                 }
//             }
//         }
//         /**
//         * Checkout Project
//         */
//         stage('Checkout project') {
//             steps {
//                 git branch: "${GIT_BRANCH}",
//                         credentialsId: "${registryCredential}",
//                          url: "${PROJECT}"
//                 script{
//                     SOURCES_HASH = sh(returnStdout: true, script: 'git log -1 --format=%h').trim()
//                     env.imageVersion = "${SOURCES_HASH}"
//                     env.mergedBranch = sh(script: "git log -1 --pretty=format:'%b' | head -n1 | awk 'BEGIN{IGNORECASE=1;FS=\" (from)|(to) \"} /Merge in .*? from .*? to ${GIT_BRANCH}/ {print \$2}'", returnStdout: true).trim()
//                     echo stdOutput.printVariable("mergedBranch", env.mergedBranch)
//                     if( !BRANCH_NAME.equals('dev') && !BRANCH_NAME.equals('master') ){
//                         env.PROJECT_RUN = stdGit.getProjectCode("${BRANCH_NAME}")
//                     } else {
//                         env.PROJECT_RUN = stdGit.getProjectCode("${env.mergedBranch}")
//                     }
//                     echo stdOutput.printVariable("PROJECT_RUN", env.PROJECT_RUN)
//                 }
//             }
//         }

//         /*
//         * Import features from XRAY
//         stage('Import features from XRAY'){
//             steps{
//                 dir('features') {
//                     script{
//                         //if( BRANCH_NAME.equals('dev') || BRANCH_NAME.equals('master') ){
//                             testURL = testAPI + filter
//                             withCredentials([usernamePassword(credentialsId: "${credentialName}", passwordVariable: 'USR_JIRA_PSW', usernameVariable: 'USR_JIRA_USR')]) {
//                                 testList = sh(script: "curl --user '${USR_JIRA_USR}:${USR_JIRA_PSW}' -H 'Content-Type: application/json' -X GET ${testURL} | jq '.[] | .key' | sed 's/\"//g'", returnStdout: true).split("\\r?\\n")
                                
//                                 testListLength = testList[0].trim().length()
//                                 if (testListLength > 0) {
//                                     for (int i = 0; i < testList.size(); i++) {
//                                         featureURL = featureAPI + testList[i]
//                                         sh(script: "curl --user '${USR_JIRA_USR}:${USR_JIRA_PSW}' -o test-${testList[i]}.feature ${featureURL}", returnStdout: true)
//                                     }
//                                     sh "mv --verbose * ../${pathFeatures}"
//                                 }
//                             }
//                         //}else{ 
//                             issue = stdGit.getProjectCode(BRANCH_NAME) +'-'+ stdGit.getIssueNumber(BRANCH_NAME)
//                             featureURL = featureAPI + issue
//                             withCredentials([usernamePassword(credentialsId: "${credentialName}", passwordVariable: 'USR_JIRA_PSW', usernameVariable: 'USR_JIRA_USR')]) {
//                                 sh(script: "curl --user '${USR_JIRA_USR}:${USR_JIRA_PSW}' -o ${issue}.feature ${featureURL}", returnStdout: true) 
//                             }
//                         }//
//                     }
//                 }
//             }
//         }
//         */

//         /**
//         * Build Docker image
//         * Dockerfile must be in the root of the repository
//         */
//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     docker.withRegistry(registryURl, registryCredential) {
//                         /* Build the container image */
//                         /* fail if the image already exists */
//                         def image = docker.image("${imageName}:${env.imageVersion}")
//                         try{
//                             image.pull()
//                             echo "Image ${imageName}:${env.imageVersion} already exists. No build necessary"
//                             env.imageId = sh(script: "docker image ls -q ${registry}/${imageName}:${env.imageVersion}", returnStdout: true, label: "Obtener id de imagen de una imagen ya existente").trim()
//                             env.imageExists = "true"
//                         } catch (Exception e) {
//                             // Se define de chrome a la version 114.0.5735.198-1 y la de chromedriver a 114.0.5735.90 debido a que son las ultimas estables para la configuración actual del docker
//                             //def chromeVersion = sh(script: "echo \$(curl -s https://versionhistory.googleapis.com/v1/chrome/platforms/win/channels/stable/versions | grep -o -E '[0-9]+' | head -n9 | tail -1)", returnStdout: true, label: "Obtener la ultima version de chrome estable").trim()
//                             //def chromeDriverVersion = sh(script: "echo \$(curl -s https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${chromeVersion})", returnStdout: true, label: "Obtener la ultima version de chromedriver").trim()
//                             //docker.build("${imageName}:${env.imageVersion}", ". --build-arg CHROME_VERSION=${chromeVersion} --build-arg CHROME_DRIVER_VERSION=${chromeDriverVersion}")

//                             def chromeVersion = "114.0.5735.198-1"
//                             def chromeDriverVersion = "114.0.5735.90"
//                             docker.build("${imageName}:${env.imageVersion}", ". --build-arg CHROME_VERSION=${chromeVersion} --build-arg CHROME_DRIVER_VERSION=${chromeDriverVersion}")
//                             env.imageId = sh(script: "docker image ls -q ${imageName}:${env.imageVersion}", returnStdout: true, label: "Obtener id de imagen recien construida").trim()
//                             env.imageExists = "false"
//                             echo stdOutput.printVariable("chrome version", chromeVersion)
//                             echo stdOutput.printVariable("chrome driver version", chromeDriverVersion)
//                         }
//                         echo stdOutput.printVariable("imageId", env.imageId)
//                         echo stdOutput.printVariable("Image exists", env.imageExists)
//                     }
//                 }
//             }
//         }

//         /**
//         * Push CUSTOM Docker image
//         */
//         stage('Push Custom Docker Image') {
//             when {
//                 allOf{
//                     expression{ BRANCH_NAME != 'dev' }
//                     expression{ BRANCH_NAME != 'master' }
//                     expression{ env.startedByTimer == 'false'}
//                     expression{ env.imageExists == 'false' }
//                 }    
//             }
//             steps {
//                 script {
//                     docker.withRegistry(registryURL, registryCredential) {
//                         def image = docker.image("${imageName}:${env.imageVersion}")
//                         /* Tag and Push the container to the custom Registry */
//                         image.push("${CUSTOM_TAG}-${env.issueID}")
//                     }
//                 }
//             }
//         }
//         /**
//         * Push DEV Docker image
//         */
//         stage('Push Develop Docker Image') {
//             when {
//                 branch 'dev'
//                 expression{ env.imageExists == "false" }
//             }
//             steps {
//                 script {
//                     docker.withRegistry(registryURL, registryCredential) {
//                         def image = docker.image("${imageName}:${env.imageVersion}")
//                         /* Tag and Push the container to the custom Registry */
//                         image.push("${DEV_TAG}")
//                     }
//                 }
//             }
//         }
//         /**
//         * Push PROD Docker image
//         */
//         stage('Push Production Docker Image') {
//             when {
//                 branch 'master'
//                 expression{ env.imageExists == "false" }
//             }
//             steps {
//                 script {
//                     docker.withRegistry(registryURL, registryCredential) {
//                         def image = docker.image("${imageName}:${env.imageVersion}")
//                         image.push()
//                         image.push("${PROD_TAG}")
//                     }
//                 }
//             }
//         }
//         /**
//         * Export features to XRAY
//         */
//         stage('Export features to XRAY') {
//             when {
//                 branch 'master'
//                 expression{ env.imageExists == "false" }
//             }
//             steps {
//                 script {
//                     stdJira.sendFeaturesToXray("${env.projectID}")
//                 }
//             }
//         }
//     }
//     post {
//         always {
//             /* Clean Dir */
//             deleteDir()
//             // Clean up docker images
//             sh "docker rmi -f ${env.imageId}"
//         }
//          // Execute job topaz-web-run-test with parameters.
//         success{
//            script{
//               // Control of executions by timer
//                 switch(BRANCH_NAME) {
//                     case "master":
//                     echo "NOTA: \nPara ejecutar su rama de nombre: ${BRANCH_NAME} debe hacerlo en forma manual en..."
//                     echo "\n https://jenkinsmd.nbch.com.ar/job/Homologacion/job/TOPAZ-web-run-test/job/${BRANCH_NAME}/"
//                     break
//                     case "dev":
//                     //env.additionalParams = '-Dtags=@Smoke'
//                     //build job: "Homologacion/TOPAZ-web-run-test/${BRANCH_NAME}",
//                     //    parameters: [
//                     //        [$class: 'StringParameterValue', name: 'additionalParams', value: "${env.additionalParams}" ],
//                     //        [$class: 'StringParameterValue', name: 'mergedBranch', value: "${env.mergedBranch}" ],
//                     //        [$class: 'StringParameterValue', name: 'SHARE_LIBRARY_BRANCH', value: "${BRANCH_NAME}" ]
//                     //    ],
//                     //    propagate: false, wait: false
//                     echo "NOTA: \nPara ejecutar su rama de nombre: ${BRANCH_NAME} debe hacerlo en forma manual en..."
//                     echo "\n https://jenkinsmd.nbch.com.ar/job/Homologacion/job/TOPAZ-web-run-test/job/${BRANCH_NAME}/"
//                     break
//                     default:
//                     echo "NOTA: \n Para ejecutar su rama customizada de nombre: ${BRANCH_NAME} deberá hacerlo en forma manual."
//                     echo "\n https://jenkinsmd.nbch.com.ar/job/Homologacion/job/TOPAZ-web-run-branch/job/${BRANCH_NAME}/"
//                     break
//                 }
//            }
//         }
//     }
// }