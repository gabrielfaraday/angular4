### PRÉ-REQUISITOS

1- Para utilização do Angular você vai precisar primeiramente ter instalado em sua máquina o NODE.JS e o NPM (https://nodejs.org).

	- Acesse o site, baixe e instale a ultima versão do node, o npm também já será instalado.
	- Para verificar a versão instalada no node.js execute no prompt: "node -v"
	- Para verificar a versão instalada no npm execute no prompt: "npm -v"
	
2- Também será necessário instalar o Angular CLI (https://cli.angular.io/)
	
	- No prompt execute: "npm install -g @angular/cli"
	
3- Outra ferramenta util é o NPM CHECK UPDATES
	
	- No prompt execute: "npm install -g npm-check-updates"
	
4- E nossa IDE será o Visual Code (https://code.visualstudio.com/)
	
	- Acesse o site, baixe e instale a versão estavel do Visual Code.
	
5- Abra o Visual Code e instale a extensão DEBUGGER FOR CHROME.

6- Para buscar referências e documentação para o Angular recomendo o site oficial: https://angular.io/


### CRIANDO SUA APP

1- Clone a ultima versão da aplicação deste repositório para sua máquina. 

2- Clone o repositório vazio da nova aplicação que você deseja criar.

3- Copie o conteúdo clonado no passo 1 para a pasta vazia do passo 2, EXCETO O ARQUIVO README.MD e AS PASTAS NODE_MODULES E .GIT. Estes são especificos por projeto.

4- Abra o Notepad++ (https://notepad-plus-plus.org/download/)

	a- Pressione Ctrl+Shift+F e selecione a aba "Find in Files".
	
	b- No campo "Find what:" informe o texto que queremos buscar para substituir, que é "angular-example" (sempre sem as aspas).
	
	c- No campo "Replace with:" informe o texto para utilizar na substituição, que é o nome da sua aplicação.
	
	d- No campos "Filters:" informe *.*
	
	e- No campo directory informe o caminho da pasta clonada do seu novo projeto, clonada no passo 2 acima.
	
	f- Certifique-se de que os checkboxes "Match whole word only" e "Match case" NÃO ESTEJAM selecionados.
	
	g- Certifique-se de que os checkboxes "In all sub-folders" e "In hidden fields" ESTEJAM selecionados.
	
	h- Clique no botão "Replace in Files".
	
	i- O Notepad++ exibirá um alerta questionando se deseja realmente prosseguir. Clique em OK.
	
	j- Aguarde ele fazer as substituições.

5- No prompt acesse a pasta da sua aplicação clonado no passo 2 e execute: "code ." - isso irá abrir seu projeto já no Visual Code.

6- No prompt execute: "npm install" - isso irá baixar via npm todas as dependências de pacotes da sua aplicação.

7- No prompt execute: "ng serve" - isso irá transpilar sua aplicação e subir ela localmente. Acesse a url indicada no prompt para acessar a aplicação. O site deve subir sem nenhum erro/problema.

OBS: para funcionar a integração com o banco/api, verifique o repositório https://github.com/gabrielfbarros/dotnet-core-full-example

#### PARABÉNS! AGORA É SÓ CODAR! :)


### OUTRAS INFORMAÇÕES

Existem diversos arquivos de configuração na aplicação, especificos do Angular:

	- packages.json -> configuração de pacotes
	- polyfills.ts -> configuração para browsers antigos
	- angular-cli.json -> configuração das dependencias
	- .editorconfig -> configuração do editor
	- tsconfig.json -> configuração do typescript
	- tslint.json -> configuração de linter - analisa o codigo, sintaxe, formatação
	- environment.[prod.]ts -> configuração para ambientes, permite fazer ações sob um ambiente: 'ng build -dev' ou 'ng build -prod'. Permite também no codigo fazer a verificação.
	
Para este projeto base estamos utilizando algumas bibliotecas/componentes de terceiros. Segue a referência destes para consulta:

	- Bootstrap CSS - https://github.com/valor-software/ngx-bootstrap //// http://valor-software.com/ngx-bootstrap/#/
	- Validações - https://github.com/yuyang041060120/ng2-validation
	- Toaster - https://www.npmjs.com/package/ng2-toastr
	- Datepicker - https://www.npmjs.com/package/mydatepicker
	
Para verificar se há atualizações para os pacotes da aplicação utilize o comando: "ncu".
	
	-OBS: tenha muita atenção/cuidado ao atualizar a versão dos pacotes, certifique-se de que nada será "quebrado" após isso.