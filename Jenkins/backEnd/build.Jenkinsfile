// 4 jobs:
//     tracking-build-branch
//     tracking-build-test
//     tracking-run-branch
//     tracking-run-test
// PR de dev a master, para dejar la evidencia en master.

// Build-test:

// Dev

// Master * ACA



// Run-test:

// Dev

// Master * ACA

// pipeline {
//     /* Using a version specifier, such as branch, tag, etc */
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
       
//     triggers {
//         //cron("H 6 * * 1-5")
//         cron( env.BRANCH_NAME.equals('dev') ? 'H 6 * * 1-5' : '')
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
//         PROJECT = 'https://git.nbch.com.ar/scm/hom/esb-topaz.git'
//         /**
//         * Image info
//         */
//         imageName = "nbch/esb-topaz"

//         DEV_TAG = 'dev'
//         CUSTOM_TAG = 'custom'
//         PROD_TAG = 'latest'
//
//         /**
//         * Registry Jira
//         */
            // JiIRA_SERVER = 'https://jira.nbch.com.ar'
            // credentialName = "aut_apit"
//         // Automatizacion chanel
//         //WEBEX_ROOM_ID = 'Y2lzY29zcGFyazovL3VzL1JPT00vYTg3MDIyMDAtN2MyNC0xMWViLTk2NDEtYzMyZjY4NGE2YWE4'

//     }

    // parameters{
    //     string(name: 'SHARE_LIBRARY_BRANCH', defaultValue: 'master', description: 'Nombre de la rama de la libreria de funciones compartidas a utilizar. \n Si se llena este campo: Se toma la rama escrita en caso de encontrarse, sino arroja error y frena ejecucion')
    //     choice(name: 'sendFeaturesToXray', choices: ['No', 'Si'], description: 'Se verificaran los escenarios en Xray, los que no esten creados apareceran en la seccion sin asignar del repositorio. Contrario se actualizara el escenario')

    // }
    
     
//     /**
//     * Use gradle Agent
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
//                 }
//                 //Load shared library on the fly 
                // library identifier: "shared-libraries@${SHARE_LIBRARY_BRANCH}",
                //     retriever: modernSCM([
                //     $class: 'GitSCMSource',
                //     credentialsId: "${registryCredential}", 
                //     remote: 'https://git.nbch.com.ar/scm/hom/shared-libraries.git'
                // ])
                // script{
                //     env.projectID = stdGit.getProjectIDToSendFeaturesToXray("${env.PROJECT}") //specify variables
                // }
                // echo stdOutput.printVariable("Job started by timer", env.startedByTimer)
                // echo stdOutput.printVariable("BRANCH_NAME", BRANCH_NAME)
                // echo stdOutput.printVariable("SHARE_LIBRARY_BRANCH", params.SHARE_LIBRARY_BRANCH)
                // echo stdOutput.printVariable("ProjectID", env.projectID)

//             }
//         }

//         /**
//         * Checkout Project
//         */
//         stage('Checkout Custom project') {
//             when {
//                 allOf{
//                     expression{ BRANCH_NAME != 'dev' }
//                     expression{ BRANCH_NAME != 'master' }
//                     expression{ env.startedByTimer == 'false' }
//                 }
//             }
//             steps {
//                  dir('checkout') {
//                     git branch: "${GIT_BRANCH}",
//                             credentialsId: "${registryCredential}",
//                             url: "${PROJECT}"
//                     script{
//                         SOURCES_HASH = sh(returnStdout: true, script: 'git log -1 --format=%h').trim()
//                         env.issueID = stdGit.getProjectCode("${BRANCH_NAME}") + stdGit.getIssueNumber("${BRANCH_NAME}")
//                      }
//                 }
//                 script{
//                     env.imageVersion = "${env.issueID}"
//                     echo stdOutput.printVariable("Image version", env.imageVersion)
//                 }
//             }
//         }

//         stage('Checkout project') {
//             when {
//                 anyOf {
//                     expression{ BRANCH_NAME == 'dev'}
//                     expression{ BRANCH_NAME == 'master'}
//                     branch 'dev'
//                     branch 'master'
//                 }
//             }
//             steps {
//                  dir('checkout') {
//                     git branch: "${GIT_BRANCH}",
//                             credentialsId: "${registryCredential}",
//                             url: "${PROJECT}"
//                     script{
//                         SOURCES_HASH = sh(returnStdout: true, script: 'git log -1 --format=%h').trim()
                        
//                         mergedBranch = sh(script: "git log -1 --pretty=format:'%b' | head -n1 | awk 'BEGIN{IGNORECASE=1;FS=\" (from)|(to) \"} /Merge in .*? from .*? to ${GIT_BRANCH}/ {print \$2}'", returnStdout: true).trim()
                        
//                         echo stdOutput.printVariable("SOURCES_HASH", SOURCES_HASH)
//                         echo stdOutput.printVariable("BRANCH_NAME", BRANCH_NAME)
//                         echo stdOutput.printVariable("mergedBranch", mergedBranch)
//                     }
//                 }
//                 script{
//                     env.imageVersion = "${SOURCES_HASH}"
//                     echo stdOutput.printVariable("Image version", env.imageVersion)
//                 }
//             }
//         }

//         /**
//         * Build Docker image
//         * Dockerfile must be in the root of the repository 
//         */
//         stage('Build Docker Image') {
//             when{
//                 anyOf {
//                     expression { env.startedByTimer == 'true' && ( BRANCH_NAME == 'master' || BRANCH_NAME == 'dev') }
//                     expression { env.startedByTimer == 'false' && ( BRANCH_NAME != 'master' || BRANCH_NAME != 'dev') }
//                     branch 'dev'
//                     branch 'master'
//                 }
//             }

//             steps {
//                 dir('checkout/project') {
//                     script {
//                         docker.withRegistry(registryURL, registryCredential) {
//                             /* Build the container image */ 
//                             /* fail if the image already exists */
//                             def image = docker.image("${imageName}:${env.imageVersion}")
//                             try{
//                                 image.pull()
//                                 echo "Image ${imageName}:${env.imageVersion} already exists. No build necessary"
//                                 env.imageId = sh(script: "docker image ls -q ${registry}/${imageName}:${env.imageVersion}", returnStdout: true, label: "Obtener id de imagen").trim()
//                                 env.imageExists = "true"
//                             } catch (Exception e) {
//                                 docker.build("${imageName}:${env.imageVersion}")
//                                 echo "Image ${imageName}:${env.imageVersion} does not exist. Building image"
//                                 env.imageId = sh(script: "docker image ls -q ${imageName}:${env.imageVersion}", returnStdout: true, label: "Obtener id de imagen").trim()
//                                 env.imageExists = "false"
//                             }
//                             echo stdOutput.printVariable("imageId", env.imageId)
//                             echo stdOutput.printVariable("Image exists", env.imageExists)
//                         }
//                     }
//                 }
//             }
//         }

//         /**
//         * Push custom Docker image 
//         */
//         stage('Push custom Docker Image') {
//             when {
//                 allOf{
//                     expression{ BRANCH_NAME != 'dev' }
//                     expression{ BRANCH_NAME != 'master' }
//                     expression{ env.startedByTimer == 'false'}
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
//         * Push dev Docker image 
//         */
//         stage('Push Develop Docker Image') {
//             when {
//                 allOf{
//                     branch 'dev'
//                     expression{ env.imageExists == 'false' }
//                 }
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
//         * Push production Docker image 
//         */
        // stage('Push Production Docker Image') {
        //     when {
        //         branch 'master'
        //         expression{ env.imageExists == 'false' }
        //     }
        //     steps {
        //         script {
        //             docker.withRegistry(registryURL, registryCredential) {
        //                 def image = docker.image("${imageName}:${env.imageVersion}")
        //                 image.push()
        //                 image.push("${PROD_TAG}")
        //             }
        //         }
        //     }
        // }
        // stage('Export features to XRAY'){
        //     when{
        //         branch 'master'
        //         expression { env.imageExists == 'false' && sendFeaturesToXray == 'Si'}
        //     }
        //     steps{
        //         script{
        //             stdJira.sendFeaturesToXray("${env.projectID}")
        //         }
        //     }
        // }
//     }
//     post {
//         always {
//             // Clean Dir
//             deleteDir()
//             // Clean up docker images
//             sh script: "docker rmi -f ${env.imageId}", returnStatus: true
//         }
//         success{
//             // Execute job xxx-test-run with parameters.
//             script{
//                 // Control of executions by timer
//                 if(env.startedByTimer.equals("true") && GIT_BRANCH.equals("dev") ){
//                     build job: "Homologacion/esb-topaz-run-branch/job/${GIT_BRANCH}", parameters: [[$class: 'StringParameterValue', name: 'BRANCH', value: "${GIT_BRANCH}" ],[$class: 'StringParameterValue', name: 'SHARE_LIBRARY_BRANCH', value: "${GIT_BRANCH}" ] ], propagate: false, wait: true
//                 } else {
//                     switch(GIT_BRANCH) {
//                         case "master":
//                             echo "NOTA: \nPara ejecutar su rama de nombre: ${BRANCH_NAME} debe hacerlo en forma manual en..."
//                             echo "https://jenkinsmd.nbch.com.ar/job/Homologacion/job/esb-topaz-run-test/job/${GIT_BRANCH}/"
//                             break

//                         case "dev":
//                             build job: "Homologacion/esb-topaz-run-test/${GIT_BRANCH}", parameters: [[$class: 'StringParameterValue', name: 'BRANCH', value: "${GIT_BRANCH}" ],[$class: 'StringParameterValue', name: 'mergedBranch', value: "${mergedBranch}" ], [$class: 'StringParameterValue', name: 'additionalParams', value: "-DtagsBDD=@smoke" ] ], wait: false
// 							break

//                         default:
//                             echo "NOTA: \nPara ejecutar su rama de nombre: ${BRANCH_NAME} debe hacerlo en forma manual."
//                                 echo "https://jenkinsmd.nbch.com.ar/job/Homologacion/job/esb-topaz-run-branch/job/${GIT_BRANCH}/"
//                             break
//                     }

//                 }
//             }
//         }
//     }
// }

//EN CASO DE NODE
//CREAR MV(Agent/Nodo) en Jenkis NOMBRE Agent2
//NumberOfExecutors 5
//Etiquetas Agent2_1 Agent2_2 Agent2_3 Agent2_4 Agent2_5
//PROPIEDADES DEL NODO
//Localizacion de herramientas
//Nombre: (Git) Default
//Directorio: C:\Program Files\Git\bin\git.exe
//Nombre: (NodeJS) node
//Directorio: C:\Program Files\nodejs\node.exe

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