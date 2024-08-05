# Playwright-JS

First of all when starting a project:
``` 
npm init playwright
npm install
```
## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/Gonzalo.p/playwright-js/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

## Description

## Badges

## Visuals
Tools like Asciinema for a more sophisticated method

## Installation

## Usage
Use examples liberally, and show the expected output if you can.
git config --global alias.lg "log --oneline --decorate --all --graph"
<!-- el log en 1 sola line con la decoracion todo de manera grafica -->
git config --global alias.s "status -sb"
git reflog ---> todos los movimientos realizados
<!-- estado de manera ordenada -->
git config --global -e
<!-- Ver configuracion -->
git branch -a
<!-- Ver todas las ramas remotas  -->

## Support

## Contributing
You can also document commands to lint the code or run tests

## Authors and acknowledgment
Thank you for being yourself :)

## License
For open source projects, say how it is licensed.

## Project status
Active status


## Notes

Para el DockerFile
1-docker build -t (NAME_IMAGE)pw-pageobject-test .
2-docker images
3-docker run -it pw-pageobject-test
4-INSIDE: npm run Allapi

Udemy
licencias-it@mailamericas.com
83B4.%43#"5FD3

Screenshot en archivo test please, o de un locator nb-card(/screenshots/inline.png)
<!-- Cursos_operations@itrsa.com.ar
ITR2023 -->

Lo que sirve para ejecutar masivamente todos los test de apis es tener un archivo
de terxto plano (package.json) donde tenga el comando AllApi ejecuta todos los test de api tomando el archivo de configuracion que ejecuta todos los test

Para la ejecucion por filtros:

npx playwright test --grep servicioMX --grep bueno
<!-- (Ejecuta servicoMX y los test que tengan el tag @bueno) 2 filtros -->

npx playwright test --grep "@tag1|@tag2
<!-- proceso batch ejecuta 2 test 2 tags 

npx playwright test--grep servicioMX ejecuta todo lo que contenga ese tag
<!-- test.describe.parallel('API Testing @servicioMX', () => { -->

Dentro de Jenkis en configuracion de un job, utilizamos el "package.json" parametrizar y elegir un comando
"Advanced"
"This project is parameterized"
"Add Parameter"
"Choice Parameter"{Name:'Comandos',Choices:'test', 'testChrome'}
"Build"
"Add Build Step"
"Execute shell"{Command: 'npm run "$Comandos"'}

Inside the 'package.json' file in the script section, place a name that calls a commands example:
``` 
  "scripts": {
    "test": "playwright test"
  }
```

## Creando... un proyecto en Gitlab/GitHub desde 0

1-armar un projecto en blanco en Gitlab
2-Configurar SSH o clonar via HTTPS
3-Configurar en local:
  git init 
  git add .
  git commit -m "initial commit"
  git remote add origin git@gitlab.com:
  git remote -v
  git branch
  git push -u origin master

## Subiendo... un repo local a GitHub/Gitlab

1-armar un proyecto en blanco
2-Configurar SSH o clonar via HTTPS
3-Configurar en local:
  git init
  git commit -m "firts commit"
  git add .
  git commit -m "firts commit"
  git branh -M main
  git remote add origin git@github.com:guyws2
  git push --set-upstream origin main