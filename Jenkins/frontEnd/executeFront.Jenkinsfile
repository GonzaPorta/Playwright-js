// pipeline {
//     // Run scheduled task at 6 am Monday through Friday
//     triggers {
//         //cron("H 6 * * 1-5")
//         cron( env.BRANCH_NAME.equals('dev') ? 'H 6 * * 1-5' : '')
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
//         USER_BDD = credentials('aut_uit')
//         USER_TOPAZ_VALIDO = credentials('homoope')
//         USER_TOPAZ_AUTORIZADOR = credentials('homosup')
//         PROJECT = 'https://git.nbch.com.ar/scm/hom/topaz-automation-web.git'
//         NEXUS_SERVER = 'https://nexus.nbch.com.ar'
//         JIRA_SERVER = 'https://jira.nbch.com.ar'
//         /**
//         * Image info
//         */
//         imageName = "nbch/topaz-automation-web"
//         CUSTOM_TAG = 'custom'
//         DEV_TAG = 'dev'
//         PROD_TAG = 'latest'
//     }

//      parameters{
//         string(name: 'version', defaultValue: 'latest', description: 'Solo en caso de builds de master. Ejemplo: v1.0.0')
//         //choice(name: 'BRANCH', choices:['custom', 'dev', 'master'])
//         choice(name: 'AMBIENTE', choices:['iota', 'pasivas', 'alpha', 'eta'])
//         choice(name: 'BASEDEDATOS', choices:['iota', 'pasivas', 'alpha', 'migracion'])
//         choice(name: 'task', choices:['AllTest', 'UtilsTest'])
//         string(name: 'threads', defaultValue: '3', description: 'Cantidad de tests en simultáneo a ejecutar')
//         choice(name: 'sendResultsToXRay', choices:['No', 'Si'], description: 'Enviar resultados a XRay. A las tarjetas del proceso se les asigna la etiqueta "Creadas_Automaticamente". ')
//         string(name: 'additionalParams', defaultValue: '', description: 'Parametros de ejecucion adicionales. Por ej: --project-prop includeTags="OP-5039"')
//         string(name: 'mergedBranch', defaultValue: '', description: 'Se pasa desde BUILDs para indicar cual es la rama desencadentante. ')
//         string(name: 'SHARE_LIBRARY_BRANCH', defaultValue: 'master', description: 'Nombre de la rama de la libreria de funciones compartidas a utilizar. \n Si se llena este campo: Se toma la rama escrita en caso de encontrarse, sino arroja error y frena ejecucion')
//     }

//     /**
//     * Use practia Agent
//     */
//     agent { label 'DockerAgent1' }
//     stages {
//         stage('Parameterize execution.'){
//             steps {
//                 script{
//                     env.startedByTimer = currentBuild.getBuildCauses().collect{cause -> cause.shortDescription.equals('Started by timer')}[0]
//                     //Load shared library on the fly
//                     library identifier: "shared-libraries@${SHARE_LIBRARY_BRANCH}",
//                         retriever: modernSCM([
//                         $class: 'GitSCMSource',
//                         credentialsId: "${registryCredential}",
//                         remote: 'https://git.nbch.com.ar/scm/hom/shared-libraries.git'
//                     ])

//                     //
//                     def date = new Date()
//                     Calendar calendar = Calendar.getInstance();
//                     calendar.setTime(date);
//                     def day = calendar.get(Calendar.DAY_OF_WEEK) - 1;
//                     echo stdOutput.printVariable("DAY_OF_WEEK", day)

//                     // In order to avoid failure by null
//                     //When running regressions by cron, only tests with the @Smoke tag are run
//                     if(env.startedByTimer.equals("true")){
//                          switch (day){
//                              case 1: env.ADD_PARAMS = '--project-prop includeTags="Token | CLIENTES"';
//                                      break;
//                              case 2: env.ADD_PARAMS = '--project-prop includeTags="Token | PASIVAS"';
//                                      break;
//                              case 3: env.ADD_PARAMS = '--project-prop includeTags="Token | login.feature"';
//                                      break;
//                              case 4: env.ADD_PARAMS = '--project-prop includeTags="Token | login.feature"';
//                                      break;
//                              case 5: env.ADD_PARAMS = '--project-prop includeTags="Token | login.feature"';
//                                      break;
//                          }
//                     } else {
//                         env.ADD_PARAMS = (additionalParams != "null") ? "${additionalParams}" : " "
//                     }

//                     env.originBranch = (mergedBranch != "null") ? "${mergedBranch}" : " "

//                     //If the 'UtilsTest' task is executed, junit is defined for the report
//                     if(params.task.equals("UtilsTest")) env.ADD_PARAMS += ' -DallureRunnerJunit=true'

//                     // in order to determine runtime environment credentials
//                     env.credentialName = (params.AMBIENTE.equals("desarrollo") )? "aut_apid" : "aut_apit"

//                     echo stdOutput.printVariable("additionalParams", params.additionalParams)
//                     echo stdOutput.printVariable("env.ADD_PARAMS", env.ADD_PARAMS)
//                     //echo stdOutput.printVariable("BRANCH", params.BRANCH)
//                     echo stdOutput.printVariable("originBranch", env.originBranch)
//                     echo stdOutput.printVariable("task", task)
//                     // Determine the issue ID in order to add it as part of de docker image tag
//                     env.issueID = " "
//                     switch(BRANCH_NAME) {
//                         case "master":
//                             issueID= ""
//                             break
//                         case "dev":
//                             if(env.originBranch.trim() !=""){
//                                 env.issueID = stdGit.getProjectCode("${env.originBranch}") + stdGit.getIssueNumber("${env.originBranch}")
//                             }
//                             break
//                         default:
//                         env.issueID = stdGit.getProjectCode("${BRANCH_NAME}") + stdGit.getIssueNumber("${BRANCH_NAME}")
//                         break
//                     }
//                     echo stdOutput.printVariable("issueID", env.issueID)
//                 }
//             }
//         }      
//         /**
//         * Run CUSTOM Image
//         */
//         stage('Run custom image') {
//             options { skipDefaultCheckout() }
//             when {
//                 expression{ BRANCH_NAME != 'master' && BRANCH_NAME != 'dev' }
//             }
//             steps {
//                 script {
//                     env.TAG = (version.equals('latest')) ? "${CUSTOM_TAG}" : "${version}"
//                     env.imageFrameTAG = (env.TAG.equals('custom')) ? "${CUSTOM_TAG}-${issueID}" : "${env.TAG}"
//                     docker.withRegistry(registryURL, registryCredential) {
//                         def image = docker.image("${imageName}:${imageFrameTAG}")
//                         /* Pull the docker image from the custom Registry */
//                         image.pull()
//                         env.imageId = sh(script: "docker image ls -q ${registry}/${imageName}:${imageFrameTAG}", returnStdout: true, label: "Obtener id de imagen").trim()
//                         /* Execute tests in container */
//                         docker.image("${imageName}:${imageFrameTAG}").inside{
//                             env.chromeVersion = sh(script: 'echo \$CHROME_VERSION' , returnStdout: true, label: "Obtener version de chrome desde la imagen.").trim()
//                             env.chromeDriverVersion = sh(script: 'echo \$CHROME_DRIVER_VERSION' , returnStdout: true, label: "Obtener version del driver de chrome desde la imagen.").trim()
//                             sh "/topaz/gradlew ${task} ${ADD_PARAMS} -Dusuario_adintar=${USER_BDD_USR} -Dcontrasenia_adintar=${USER_BDD_PSW} -Dusuario_BD=${USER_BDD_USR} -Dcontrasenia_BD=${USER_BDD_PSW} -Dusuario_sideba=${USER_BDD_USR} -Dcontrasenia_sideba=${USER_BDD_PSW} -Dusuario_topaz_valido=${USER_TOPAZ_VALIDO_USR} -Dcontrasenia_topaz_valido=${USER_TOPAZ_VALIDO_PSW} -Dusuario_topaz_autorizador=${USER_TOPAZ_AUTORIZADOR_USR} -Dcontrasenia_topaz_autorizador=${USER_TOPAZ_AUTORIZADOR_PSW} -Dusuario_pasivas_valido='pasbo30' -Dcontrasenia_pasivas_valido='qwer1234' -Dambiente=${AMBIENTE} -Dbasededatos=${BASEDEDATOS} -Dthreads=${threads} -DresultsDir=${WORKSPACE}/allure-results -Dwebdriver.chrome.driver=/chromedriver -DdatabasePropertiesFilePath=/topaz/db.properties -DadintarPropertiesFilePath=/topaz/adintardb.properties -DchromeDownloads=/topaz -p /topaz/ --no-daemon --info"
//                         }
//                     }
//                 }
//             }
//         }
//         /**
//         * Run DEV Image
//         */
//         stage('Run dev image') {
//             options { skipDefaultCheckout() }
//             when {
//                 //anyOf {
//                 branch 'dev'
//                 //    expression{ params.BRANCH == 'dev' }
//                 //}
//             }
//             steps {
//                 script {
//                     env.TAG = (version.equals('latest')) ? "${DEV_TAG}" : "${version}"
//                     env.imageFrameTAG = "${env.TAG}"
//                     docker.withRegistry(registryURL, registryCredential) {
//                         def image = docker.image("${imageName}:${imageFrameTAG}")
//                         /* Pull the docker image from the custom Registry */
//                         image.pull()
//                         env.imageId = sh(script: "docker image ls -q ${registry}/${imageName}:${imageFrameTAG}", returnStdout: true, label: "Obtener id de imagen").trim()
//                         /* Execute tests in container */
//                         docker.image("${imageName}:${imageFrameTAG}").inside{
//                             env.chromeVersion = sh(script: 'echo \$CHROME_VERSION' , returnStdout: true, label: "Obtener version de chrome desde la imagen.").trim()
//                             env.chromeDriverVersion = sh(script: 'echo \$CHROME_DRIVER_VERSION' , returnStdout: true, label: "Obtener version del driver de chrome desde la imagen.").trim()
//                             sh "/topaz/gradlew ${task} ${ADD_PARAMS} -Dusuario_adintar=${USER_BDD_USR} -Dcontrasenia_adintar=${USER_BDD_PSW} -Dusuario_BD=${USER_BDD_USR} -Dcontrasenia_BD=${USER_BDD_PSW} -Dusuario_sideba=${USER_BDD_USR} -Dcontrasenia_sideba=${USER_BDD_PSW} -Dusuario_topaz_valido=${USER_TOPAZ_VALIDO_USR} -Dcontrasenia_topaz_valido=${USER_TOPAZ_VALIDO_PSW} -Dusuario_topaz_autorizador=${USER_TOPAZ_AUTORIZADOR_USR} -Dcontrasenia_topaz_autorizador=${USER_TOPAZ_AUTORIZADOR_PSW} -Dusuario_pasivas_valido='pasbo30' -Dcontrasenia_pasivas_valido='qwer1234' -Dambiente=${AMBIENTE} -Dbasededatos=${BASEDEDATOS} -Dthreads=${threads} -DresultsDir=${WORKSPACE}/allure-results -Dwebdriver.chrome.driver=/chromedriver -DdatabasePropertiesFilePath=/topaz/db.properties -DadintarPropertiesFilePath=/topaz/adintardb.properties -DchromeDownloads=/topaz -p /topaz/ --no-daemon --info"
//                         }
//                     }
//                 }

//             }
//         }
//         /**
//         * Run PROD Image
//         */
//         stage('Run prod Image') {
//             options { skipDefaultCheckout() }
//             when {
//                 //anyOf {
//                 branch 'master'
//                 //    expression{ params.BRANCH == 'master' }
//                 //}
//             }
//             steps {
//                 script {
//                     env.TAG = (version.equals('latest')) ? "${PROD_TAG}" : "${version}"
//                     env.imageFrameTAG = "${env.TAG}"
//                     docker.withRegistry(registryURL, registryCredential) {
//                         def image = docker.image("${imageName}:${imageFrameTAG}")
//                         /* Pull the image from the custom Registry */
//                         image.pull()
//                         env.imageId = sh(script: "docker image ls -q ${registry}/${imageName}:${imageFrameTAG}", returnStdout: true, label: "Obtener id de imagen").trim()
//                         docker.image("${imageName}:${imageFrameTAG}").inside{
//                             env.chromeVersion = sh(script: 'echo \$CHROME_VERSION' , returnStdout: true, label: "Obtener version de chrome desde la imagen.").trim()
//                             env.chromeDriverVersion = sh(script: 'echo \$CHROME_DRIVER_VERSION' , returnStdout: true, label: "Obtener version del driver de chrome desde la imagen.").trim()
//                             sh "/topaz/gradlew ${task} ${ADD_PARAMS} -Dusuario_adintar=${USER_BDD_USR} -Dcontrasenia_adintar=${USER_BDD_PSW} -Dusuario_BD=${USER_BDD_USR} -Dcontrasenia_BD=${USER_BDD_PSW} -Dusuario_sideba=${USER_BDD_USR} -Dcontrasenia_sideba=${USER_BDD_PSW} -Dusuario_topaz_valido=${USER_TOPAZ_VALIDO_USR} -Dcontrasenia_topaz_valido=${USER_TOPAZ_VALIDO_PSW} -Dusuario_topaz_autorizador=${USER_TOPAZ_AUTORIZADOR_USR} -Dcontrasenia_topaz_autorizador=${USER_TOPAZ_AUTORIZADOR_PSW} -Dusuario_pasivas_valido='pasbo30' -Dcontrasenia_pasivas_valido='qwer1234' -Dambiente=${AMBIENTE} -Dbasededatos=${BASEDEDATOS} -Dthreads=${threads} -DresultsDir=${WORKSPACE}/allure-results -Dwebdriver.chrome.driver=/chromedriver -DdatabasePropertiesFilePath=/topaz/db.properties -DadintarPropertiesFilePath=/topaz/adintardb.properties -DchromeDownloads=/topaz -p /topaz/ --no-daemon --info"
//                         }
//                     }
//                 }
//             }
//         }

//     }

//     post {
//         always {
//             script{
//                 if ( sendResultsToXRay == "Si" ) {
//                     issueToLink = stdJira.sendResultToJira()
//                     stdJira.linkResultInJira(issueToLink,"TOPAZ-Web")
//                     linkTestExec = "${JIRA_SERVER}/browse/${issueToLink}"
//                 }
//             }
//             // Clean up docker images
//             sh label: 'Remove framework image', script: "docker rmi -f ${env.imageId}", returnStatus: true
//             sh label: 'Creating environment.properties file', script: "touch '${WORKSPACE}/allure-results/environment.properties'"
//             script{
//                 if ( sendResultsToXRay == "Si" ) {
//                     sh label: 'set TestExecution', script: "echo \"TestExecution=${linkTestExec}\">>${WORKSPACE}/allure-results/environment.properties", returnStatus: true
//                 }
//             }
//             sh label: 'set chromeVersion', script: "echo \"chromeVersion=${env.chromeVersion}\">>${WORKSPACE}/allure-results/environment.properties", returnStatus: true
//             sh label: 'set chromeDriverVersion', script: "echo \"chromeDriverVersion=${env.chromeDriverVersion}\">>${WORKSPACE}/allure-results/environment.properties", returnStatus: true
//             sh label: 'archive allure results', script: 'tar -czf allure-results.tar.gz allure-results', returnStatus: true
//             archiveArtifacts allowEmptyArchive: true, artifacts: '*-results.tar.gz'
//             allure results: [[path: 'allure-results']]
//             //Remueve el imagen del Frame
//             deleteDir()
//             script{
//                 if( originBranch.trim() != "" && BRANCH_NAME.equals("dev") ) {
//                     //Remueve imagen customizada del Frame de Nexus
//                     stdNexus.deleteCustomImage("${imageName}","${CUSTOM_TAG}-${issueID}")
//                 }
//             }
//         }
//     }
// }