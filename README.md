# INICIALIZANDO PROJETO

<br>
<br>

**Para inicializar o projeto, é necessário acessar a pasta raiz do projeto e instalar os módulos necessários para a criação do servidor HTTP. Para isso execute o seguinte comando de acordo com seu gerenciador de pacotes.**

<br>
<br>

> **NPM** = `npm install`

> **YARN** = `yarn install`


<br>
<br>

**Após a instalação dos módulos, será necessário executar o servidor para rodar seus serviços necessários para utilização da API. Para isso execute o seguinte comando**

<br>
<br>

> **NPM** = `npm start`

> **YARN** = `yarn start`


<br>
<br>
<br>
<br>


# DOCUMENTAÇÃO API DRIVE

<br>
<br>

**Essa documentação é feita para consulta das rotas, essa api esta em suas fases iniciais, por isso muitas das funcionalidades serão atualizadas e otimizadas para que seja o mais amigável possível para nossos usuários.**

<br>
<br>

> ## *(POST)* /auth

 <br/>
 <br/>
  Esta rota é responsável por realizar a autenticação na API onde ela devolve um token que será utilizado para as demais rotas de ação e consulta.
 <br/>
 <br/>

### HEADERS

* Method: POST
* Content-Type: application/json

 
 | Campo | Tipo | Requerido | Descrição |
| :------: | :----: | :----: | :---- |
| email | String | True | Email de acesso |
| password | String[] | True | Senha de acesso |

<br>

### EXEMPLO CORPO JSON

 ```
 {
	"email": "fulano@gmail.com",
	"password": "*******"
 }
 ```

<br>

### EXEMPLO RESPOSTA SUCESSO

 ```
 {
	"status": 200,
	"message": "OK",
	"data": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiN2NkYmQ3MzgtMjg1OC00YTQ4LWJhMmUtYTc4ZTZkYjE5M2Y3IiwiZXhwaXJlZCI6MTY2NzkxNTUwMy42NzUyOTZ9.c8uiHYy52FcqIZ0Aqytmzf97nV0mBmUz7nvYHJURKeo"
}
 ```

<br>
<br>
<br>
<br>


> ## *(PUT)* /auth

 <br/>
 <br/>
  Esta rota é responsável por recriar novamente o token para ser utilizando, também é conhecido esse termo como ***REFRESH TOKEN***
 <br/>
 <br/>

### HEADERS

* Method: PUT
* Content-Type: application/json

 
 | Campo | Tipo | Requerido | Descrição |
| :------: | :----: | :----: | :---- |
| token | String | True | Token de acesso |
<br>

### EXEMPLO CORPO JSON

 ```
 {
	"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiN2NkYmQ3MzgtMjg1OC00YTQ4LWJhMmUtYTc4ZTZkYjE5M2Y3IiwiZXhwaXJlZCI6MTY2NzkxNTUwMy42NzUyOTZ9.c8uiHYy52FcqIZ0Aqytmzf97nV0mBmUz7nvYHJURKeo"
 }
 ```

<br>

### EXEMPLO RESPOSTA SUCESSO

 ```
 {
	"status": 200,
	"message": "OK",
	"data": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiN2NkYmQ3MzgtMjg1OC00YTQ4LWJhMmUtYTc4ZTZkYjE5M2Y3IiwiZXhwaXJlZCI6MTY2NzkxNTUwMy42NzUyOTZ9.c8uiHYy52FcqIZ0Aqytmzf97nV0mBmUz7nvYHJURKeo"
}
 ```

<br>
<br>
<br>
<br>

> ## *(POST)* /user

 <br/>
 <br/>
  Esta rota é responsável por criar um novo usuário no sistema!
 <br/>
 <br/>

### HEADERS
  
* Method: POST
* Content-Type: application/json

<br>

| Campo | Tipo | Requerido | Descrição |
| :------: | :----: | :----: | :---- |
| name | String | True | Nome do usuário |
| email | String | True | Email do usuário |
| password | Object | True | Senha do usuário |

<br>

### EXEMPLO CORPO JSON

 ```
 {
	"name": "fulano",
  "email": "fulano@gmail.com",
	"password": "*******"
 }
 ```

<br>

### EXEMPLO RESPOSTA SUCESSO

 ```
 {
	"status": 200,
	"message": "OK"
}
 ```

<br>
<br>
<br>
<br>

> ## *(PUT)* /user

 <br/>
 <br/>
  Esta rota é responsável por alterar um usuário já existente na base
 <br/>
 <br/>

### HEADERS
  
* Method: PUT
* Content-Type: application/json
* Authorization: ***TOKEN***

<br>

| Campo | Tipo | Requerido | Descrição |
| :------: | :----: | :----: | :---- |
| name | String | True | Novo Nome do usuário |
| email | String | True | Novo Email do usuário |
| password | Object | False | Nova Senha do usuário |

<br>

### EXEMPLO CORPO JSON

 ```
 {
	"name": "fulano",
  "email": "fulano@gmail.com"
 }
 ```

<br>

### EXEMPLO RESPOSTA SUCESSO

 ```
 {
	"status": 200,
	"message": "OK"
}
 ```

<br>
<br>
<br>
<br>

> ## *(DELETE)* /user

 <br/>
 <br/>
  Esta rota é responsável por excluir um usuário existente na base.
 <br/>
 <br/>

### HEADERS
  
* Method: DELETE
* Authorization: ***TOKEN***

<br>

### EXEMPLO RESPOSTA SUCESSO

 ```
 {
	"status": 200,
	"message": "OK"
}
 ```

<br>
<br>
<br>
<br>

> ## *(PUT)* /user

 <br/>
 <br/>
  Esta rota é responsável por alterar um usuário já existente na base
 <br/>
 <br/>

### HEADERS
  
* Method: PUT
* Content-Type: application/json
* Authorization: ***TOKEN***

<br>

| Campo | Tipo | Requerido | Descrição |
| :------: | :----: | :----: | :---- |
| name | String | True | Novo Nome do usuário |
| email | String | True | Novo Email do usuário |
| password | Object | False | Nova Senha do usuário |

<br>

### EXEMPLO CORPO JSON

 ```
 {
	"name": "fulano",
  "email": "fulano@gmail.com"
 }
 ```

<br>

### EXEMPLO RESPOSTA SUCESSO

 ```
 {
	"status": 200,
	"message": "OK"
}
 ```

<br>
<br>
<br>
<br>

> ## *(POST)* /drive

 <br/>
 <br/>
  Esta rota é responsável por realizar o upload de um arquivo para dentro do sistema.
 <br/>
 <br/>

### HEADERS
  
* Method: POST
* Authorization: ***TOKEN***

<br>

<br>

| Campo | Tipo | Requerido | Descrição |
| :------: | :----: | :----: | :---- |
| content | String | True | Conteudo do arquivo em BASE64 |
| filename | String | True | Nome que será dado ao arquivo, precisa conter sua extensão |

<br>

### EXEMPLO CORPO JSON

 ```
 {
	"content": "T2zhLCBpc3NvIOkgYXBlbmFzIHVtIHRlc3Rl",
  "filename": "arquivo.txt"
 }
 ```

<br>

### EXEMPLO RESPOSTA SUCESSO

 ```
 {
	"status": 200,
	"message": "OK"
}
 ```

<br>
<br>
<br>
<br>


> ## *(GET)* /drive/:driveUUID

 <br/>
 <br/>
  Esta rota é responsável por realizar o download de um arquivo, onde será devolvido o arquivo que está sendo solicitado
 <br/>
 <br/>

### HEADERS
  
* Method: GET
* Authorization: ***TOKEN***

<br>
<br>
<br>
<br>


> ## *(GET)* /drive

 <br/>
 <br/>
  Esta rota é responsável por listar todos os arquivos que foram carregados no sistema.
 <br/>
 <br/>

### HEADERS
  
* Method: GET
* Authorization: ***TOKEN***

<br>

<br>

### EXEMPLO RESPOSTA SUCESSO

 ```
 {
	"status": 200,
	"message": "OK"
  "data": [
      {
        "filename": "arquivo.txt",
        "uuid": "3d0ca315-aff9–4fc2-be61–3b76b9a2d798"
      }
  ]
}
 ```

<br>
<br>
<br>
<br>


> ## *(PUT)* /drive/:driveUUID

 <br/>
 <br/>
  Esta rota é responsável por realizar por atualizar um arquivo, será inicialmente apenas alterado seu nome
 <br/>
 <br/>

### HEADERS
  
* Method: PUT
* Authorization: ***TOKEN***

<br>

<br>

| Campo | Tipo | Requerido | Descrição |
| :------: | :----: | :----: | :---- |
| filename | String | True | Nome que será dado ao arquivo, precisa conter sua extensão |

<br>

### EXEMPLO CORPO JSON

 ```
 {
  "filename": "arquivo.txt"
 }
 ```

<br>

### EXEMPLO RESPOSTA SUCESSO

 ```
 {
	"status": 200,
	"message": "OK"
}
 ```

<br>
<br>
<br>
<br>




