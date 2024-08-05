// String tareas(nombre){
//     def mapa = [
//         'UtilsTestsBDD': 'UtilsTestsBDD',
//         'AllTestBDD': 'AllTestBDD'
//     ]
//     return mapa.get(nombre)
// }

// pipeline {
//     options {
//         buildDiscarder(
//             logRotator(
//             numToKeepStr:         env.BRANCH_NAME ==~ /master/ ? '' :
//                                   env.BRANCH_NAME ==~ /dev/ ?  '120' : '30',
//             artifactNumToKeepStr: env.BRANCH_NAME ==~ /master/ ? '' :
//                                   env.BRANCH_NAME ==~ /dev/ ?  '120' : '20'
//             )
//         )
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
//         registryCredentialSlackQA = 'slack_nbch-practia'
//         registryCredentialSlackDesarrollo = 'slack_nbch-workspace_notif'
//         NEXUS_SERVER = 'https://nexus.nbch.com.ar'
//         /**
//         * Image info
//         */
//         imageName = "nbch/esb-topaz"
//         urlEncodedImageName = java.net.URLEncoder.encode("${imageName}", "UTF-8")
//         //PROJECT_HOME="/home/esb-topaz"
//         PROJECT_HOME="/home/esb-topaz"
//         containerFrameName = "esb-topaz-automation"
//         /**
//         * Credentials for Jenkins
//         */
//         USR_JENKINS = credentials('usr_jenkins')
//         //USER_BDD_ADINTAR = credentials('aut_apid')

//         DEV_TAG = 'dev'
//         CUSTOM_TAG = 'custom'
//         PROD_TAG = 'latest'
//         /**
//         * JIRA interaction
//         */
//         JIRA_SERVER = 'https://jira.nbch.com.ar'
        

//     }
//     parameters{
//         string(name: 'version', defaultValue: 'latest', description: 'Hash cortos de datos y código fuente. Ejemplo: 769d309-f80044e ')
//         choice(name: 'AMBIENTE', choices:['topazinterpretedws','qa', 'desarrollo','preprod'])
//         choice(name: 'BRANCH_RUN', choices:['custom', 'dev', 'master'])
//         string(name: 'SHARE_LIBRARY_BRANCH', defaultValue: 'master', description: 'Nombre de la rama de la libreria de funciones compartidas a utilizar. \n Si se llena este campo: Se toma la rama escrita en caso de encontrarse, sino arroja error y frena ejecucion')
//         choice(name: 'PROJECT_RUN', choices:['AllTestBDD', 'UtilsTestsBDD'] )
//         string(name: 'additionalParams', defaultValue: '', description: 'Parametros de ejecucion adicionales. Por ej: --tests *CP134* \n Filtros: Se puede usar -Dtags con las opciones funcionalok,funcionalerror y parametros. Por ej: -Dtags=funcionalok  | -Dtags=parametros.funcionalok \n Filtros para casos BDD: Se puede usar los tags de cucumber ej: -DtagsBDD="@funcional and @severity=normal" \n IMPORTANTE: Por defecto se omitiran los escenarios que tengan el tag "@skip"' )
//         //string(name: 'TEST_EXEC_KEY', defaultValue: '', description: 'Para enviar resultados a JIRA coloque ID de tarjeta TEST EXEC a la cual enviarlos. Por ej: PMH-843 \n Las tarjetas del proceso son creadas en el repositorio de Test dentro de la carpeta "CreadasAutomaticamente". ')
//         string(name: 'mergedBranch', defaultValue: '', description: 'Se pasa desde BUILDs para indicar cual es la rama desencadentante. ')
//         choice(name: 'sendResultsToXRay', choices:['false', 'true'], description: 'Enviar resultados a XRay. A las tarjetas del proceso se les asigna la etiqueta "Creadas_Automaticamente". ')
//         choice(name: 'runTestWithCost', choices:['false', 'true'])
//     }
//    /**
//     * Use automation Agent
//     */
//     agent { label 'DockerAgent1' }
//     stages {
//         stage('Parameterize execution.') {
//             steps {
//                //Load shared library on the fly 
//                 library identifier: "shared-libraries@${SHARE_LIBRARY_BRANCH}",
//                     retriever: modernSCM([
//                     $class: 'GitSCMSource',
//                     credentialsId: "${registryCredential}", 
//                     remote: 'https://git.nbch.com.ar/scm/hom/shared-libraries.git'
//                 ])
//                 script {
//                     // In order to avoid failure by null
//                     env.incluirCostos = (params.runTestWithCost != "null") ? params.runTestWithCost : "false"
//                     env.ADD_PARAMS = (additionalParams != "null") ? "${additionalParams}" : " "
//                     env.originBranch = (mergedBranch != "null") ? "${mergedBranch}" : " "
//                     echo stdOutput.printVariable("Proyect_Run", params.PROJECT_RUN)
//                     env.testRun = tareas(params.PROJECT_RUN)
//                     echo stdOutput.printVariable("Proyect_Run", params.PROJECT_RUN)
//                     env.AMBIENTE_SCOPE = (params.AMBIENTE.equals("preprod")) ? "stage" : params.AMBIENTE
//                     env.credentialName = (params.AMBIENTE.equals("desarrollo") )? "aut_apid" : "aut_apit"
                    
//                     echo stdOutput.printVariable("additionalParams", params.additionalParams)

//                     //env.RESULT_EXEC_KEY = (TEST_EXEC_KEY != "null") ? "${TEST_EXEC_KEY}" : " "
                    
//                     echo stdOutput.printVariable("BRANCH_RUN", params.BRANCH_RUN)
//                     echo stdOutput.printVariable("BRANCH_NAME", BRANCH_NAME)
//                     echo stdOutput.printVariable("Origin Branch ", env.originBranch)
//                     echo stdOutput.printVariable("SHARE_LIBRARY_BRANCH ", params.SHARE_LIBRARY_BRANCH)
                    
//                     env.issueID = " "
//                     switch (BRANCH_NAME) {
//                         case "master":
//                             issueID = ""
//                             break
//                         case "dev":
//                             if( env.originBranch.trim() != "" ){
//                                 env.issueID = sh(returnStdout: true, script: 'git log -1 --format=%h').trim()
//                             }
//                             break
//                         default:
//                             env.issueID = stdGit.getProjectCode("${BRANCH_NAME}") + stdGit.getIssueNumber("${BRANCH_NAME}")
//                             break
//                     }
//                     echo stdOutput.printVariable("issueID", env.issueID)
//                 }
//             }
//         }
//         /**
//         * Run Custom Image
//         */
//         stage('Run custom image.') {
//             options { skipDefaultCheckout() }
//             when{
//                 allOf{ 
//                     expression{ BRANCH_NAME != 'master' && BRANCH_NAME != 'dev' }
//                 }
//             }
//             steps {
//                 script {
//                    // use the value of param 'version' to set the value of the tag that will be pulled.
//                     env.TAG = (version.equals('latest')) ? "${CUSTOM_TAG}-${issueID}" : "${version}"
//                     echo stdOutput.printVariable("TAG", env.TAG)
//                     docker.withRegistry(registryURL, registryCredential) {
//                         def image = docker.image("${imageName}:${env.TAG}")
//                         image.pull()
//                         env.imageId = sh(script: "docker image ls -q ${registry}/${imageName}:${env.TAG}", returnStdout: true, label: "Obtener id de imagen").trim()
//                         docker.image("${imageName}:${env.TAG}").inside("--name ${containerFrameName}-${BUILD_NUMBER}"){
//                             sh "mkdir -p ${WORKSPACE}/allure-results; cp ${PROJECT_HOME}/src/test/resources/categories.json ${WORKSPACE}/allure-results/categories.json"
//                             withCredentials([usernamePassword(credentialsId: "${credentialName}", passwordVariable: 'USR_BDD_PSW', usernameVariable: 'USR_BDD_USR')]) {
//                                 timeout(time: 90, unit: 'MINUTES'){
//                                     sh "${PROJECT_HOME}/gradlew clean ${testRun} ${ADD_PARAMS} -Dusuario_adintar=${USR_BDD_USR} -Dcontrasenia_adintar=${USR_BDD_PSW} -Dusuario_BD=${USR_BDD_USR} -Dcontrasenia_BD=${USR_BDD_PSW} -Dusuario_metadatos=${USR_BDD_USR} -Dcontrasenia_metadatos=${USR_BDD_PSW} -DresultsDir=${WORKSPACE} -p ${PROJECT_HOME} -Dconfiguracion=\"${PROJECT_HOME}/settings.yml#${AMBIENTE}\" --no-daemon --info -DincluirCostos=${env.incluirCostos}"
//                                 }
//                             }
//                         }
//                     }

//                 }
//             }
//         }

//         stage('Run dev image.') {
//             options { skipDefaultCheckout() }
//             when{
//                 anyOf{
//                     expression{ params.BRANCH_RUN == 'dev' }
//                     branch 'dev'
//                 }
//             }
//             steps {
//                 script {
//                    // use the value of param 'version' to set the value of the tag that will be pulled.
//                     env.TAG = (version.equals('latest')) ? "${DEV_TAG}" : "${version}"
//                     docker.withRegistry(registryURL, registryCredential) {
//                         def image = docker.image("${imageName}:${env.TAG}")
//                         image.pull()
//                         env.imageId = sh(script: "docker image ls -q ${registry}/${imageName}:${env.TAG}", returnStdout: true, label: "Obtener id de imagen").trim()
//                         docker.image("${imageName}:${env.TAG}").inside("--name ${containerFrameName}-${BUILD_NUMBER}"){
//                             sh "mkdir -p ${WORKSPACE}/allure-results; cp ${PROJECT_HOME}/src/test/resources/categories.json ${WORKSPACE}/allure-results/categories.json"
//                             withCredentials([usernamePassword(credentialsId: "${credentialName}", passwordVariable: 'USR_BDD_PSW', usernameVariable: 'USR_BDD_USR')]) {
//                                 timeout(time: 90, unit: 'MINUTES'){
//                                     sh "${PROJECT_HOME}/gradlew clean ${testRun} ${ADD_PARAMS} -Dusuario_adintar=${USR_BDD_USR} -Dcontrasenia_adintar=${USR_BDD_PSW} -Dusuario_BD=${USR_BDD_USR} -Dcontrasenia_BD=${USR_BDD_PSW} -Dusuario_metadatos=${USR_BDD_USR} -Dcontrasenia_metadatos=${USR_BDD_PSW} -DresultsDir=${WORKSPACE} -p ${PROJECT_HOME} -Dconfiguracion=\"${PROJECT_HOME}/settings.yml#${AMBIENTE}\" --no-daemon --info -DincluirCostos=${env.incluirCostos}"
//                                 }
//                             }
//                         }
//                     }

//                 }
//             }
//         }
//         /**
//         * Run PROD Image
//         */
//         stage('Run prod Image') {
//             when{
//                 anyOf{
//                     expression{ params.BRANCH_RUN == 'master' }
//                     branch 'master'
//                 }
//             }
//             steps {
//                 script {
//                     // use the value of param 'version' to set the value of the tag that will be pulled.
//                     env.TAG = (version.equals('latest')) ? "${PROD_TAG}" : "${version}"
//                     docker.withRegistry(registryURL, registryCredential) {
//                         def image = docker.image("${imageName}:${env.TAG}")
//                         image.pull()
//                         env.imageId = sh(script: "docker image ls -q ${registry}/${imageName}:${env.TAG}", returnStdout: true, label: "Obtener id de imagen").trim()
//                         docker.image("${imageName}:${env.TAG}").inside("--name ${containerFrameName}-${BUILD_NUMBER}"){
//                             sh "mkdir -p ${WORKSPACE}/allure-results; cp ${PROJECT_HOME}/src/test/resources/categories.json ${WORKSPACE}/allure-results/categories.json"
//                             withCredentials([usernamePassword(credentialsId: "${credentialName}", passwordVariable: 'USR_BDD_PSW', usernameVariable: 'USR_BDD_USR')]) {
//                                 timeout(time: 90, unit: 'MINUTES'){
//                                     sh "${PROJECT_HOME}/gradlew ${testRun} ${ADD_PARAMS} -Dusuario_adintar=${USR_BDD_USR} -Dcontrasenia_adintar=${USR_BDD_PSW} -Dusuario_BD=${USR_BDD_USR} -Dcontrasenia_BD=${USR_BDD_PSW} -Dusuario_metadatos=${USR_BDD_USR} -Dcontrasenia_metadatos=${USR_BDD_PSW} -DresultsDir=${WORKSPACE} -p ${PROJECT_HOME} -Dconfiguracion=\"${PROJECT_HOME}/settings.yml#${AMBIENTE}\" --no-daemon --info -DincluirCostos=${env.incluirCostos}"
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
    
//     post {
//         always {

//             script{
// 				issueToLink = ""
//                 echo stdOutput.printVariable("sendResultsToXRay",params.sendResultsToXRay)
//                 if ( params.sendResultsToXRay == "true") {
//                     //resultList = sh(label: "List archive xUnit results", script: "ls ./reports/*.xml", returnStdout: true).trim()
//                     issueToLink = stdJira.sendResultToJira()
//                     stdJira.linkResultInJira(issueToLink,"ESB%20TOPAZ")
//                     linkTestExec = "${JIRA_SERVER}/browse/${issueToLink}"
//                     sh label: 'set TestExecution', script: echo \"TestExecution=${linkTestExec}\">>${WORKSPACE}/allure-results/environment.properties", returnStatus: true
//                 } 
//             }
//             sh label: 'delete frame image', script: "docker rmi -f ${env.imageId}", returnStatus: true
//             sh label: 'get docker image version information', script: "touch '${WORKSPACE}/allure-results/environment.properties';echo -e \$(curl -u $USR_JENKINS_USR:$USR_JENKINS_PSW -X GET \"https://nexus.nbch.com.ar/service/rest/v1/search?repository=docker&format=docker&name=${urlEncodedImageName}&version=${env.TAG}\" | jq -r \".items[0].assets[0].checksum.sha256\")\" | jq -r '{\"image\\\\ name\": .items[0].name, \"image\\\\ tags\": ([.items[].version]|join(\" / \")), \"image\\\\ sha256\": .items[0].assets[0].checksum.sha256} | to_entries | map(\"\\(.key)=\\(.value)\\\\n\") | .[]')>>${WORKSPACE}/allure-results/environment.properties", returnStatus: true
//             sh label: 'set environment Entorno', script: "echo \"Entorno=${AMBIENTE}\">>${WORKSPACE}/allure-results/environment.properties", returnStatus: true
//             sh label: 'set environment Rama', script: "echo \"Rama=${BRANCH_NAME}\">>${WORKSPACE}/allure-results/environment.properties", returnStatus: true
//             sh label: 'set environment TestExecution', script: "echo \"TestExecution=${issueToLink}\">>${WORKSPACE}/allure-results/environment.properties", returnStatus: true
//             sh label: 'archive allure results', script: 'tar -czf allure-results.tar.gz allure-results', returnStatus: true
//             sh label: 'archive xUnit results', script: 'tar -czf test-results.tar.gz reports', returnStatus: true
//             archiveArtifacts allowEmptyArchive: true, artifacts: '*-results.tar.gz'
//             allure results: [[path: 'allure-results']]

//             script{       
//                 if( originBranch.trim() != "" && BRANCH_NAME.equals("dev") ) {
//                     stdNexus.deleteCustomImage("${imageName}","${CUSTOM_TAG}-${issueID}")
//                 }
//             }
 
//             deleteDir()
//         }
//     }
// }

// pipeline{
//     agent any aca podria declarar el Agente para c/stage

//     tools {nodejs "node"}

//     stages{
//         stage('Slave 1') {
//             agent {
//                 label "Agent1_1"
//             }
//             steps {
//                 git url: 'https://github.com'
//                 bat 'npm install'
//                 bat 'npm update'
//                 bat 'npx playwright run test --record --key a13413rncic1ni1'
//             }
//         }
//     }
// }
//     parameters{
//         string(name: 'version', defaultValue: 'latest', description: 'Hash cortos de datos y código fuente. Ejemplo: 769d309-f80044e ')
//         choice(name: 'AMBIENTE', choices:['topazinterpretedws','qa', 'desarrollo','preprod'])
//         choice(name: 'BRANCH_RUN', choices:['custom', 'dev', 'master'])
//         string(name: 'SHARE_LIBRARY_BRANCH', defaultValue: 'master', description: 'Nombre de la rama de la libreria de funciones compartidas a utilizar. \n Si se llena este campo: Se toma la rama escrita en caso de encontrarse, sino arroja error y frena ejecucion')
//         choice(name: 'PROJECT_RUN', choices:['AllTestBDD', 'UtilsTestsBDD'] )
//         string(name: 'additionalParams', defaultValue: '', description: 'Parametros de ejecucion adicionales. Por ej: --tests *CP134* \n Filtros: Se puede usar -Dtags con las opciones funcionalok,funcionalerror y parametros. Por ej: -Dtags=funcionalok  | -Dtags=parametros.funcionalok \n Filtros para casos BDD: Se puede usar los tags de cucumber ej: -DtagsBDD="@funcional and @severity=normal" \n IMPORTANTE: Por defecto se omitiran los escenarios que tengan el tag "@skip"' )
//         //string(name: 'TEST_EXEC_KEY', defaultValue: '', description: 'Para enviar resultados a JIRA coloque ID de tarjeta TEST EXEC a la cual enviarlos. Por ej: PMH-843 \n Las tarjetas del proceso son creadas en el repositorio de Test dentro de la carpeta "CreadasAutomaticamente". ')
//         string(name: 'mergedBranch', defaultValue: '', description: 'Se pasa desde BUILDs para indicar cual es la rama desencadentante. ')
//         choice(name: 'sendResultsToXRay', choices:['false', 'true'], description: 'Enviar resultados a XRay. A las tarjetas del proceso se les asigna la etiqueta "Creadas_Automaticamente". ')
//         choice(name: 'runTestWithCost', choices:['false', 'true'])
//     }