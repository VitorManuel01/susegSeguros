
## Suseg Seguros - Site para corretora de seguros

Este projeto foi criado com intenção de criar uma aplicação/site da empresa Suseg Seguros, portando a área pública para clientes e privada para administrar de maneira mais fácil cotações e apólices da empresa além de controle de funcionários.


## Tecnologias Utilizadas





- HTML
- CSS
- JavaScript
- Bootstrap
- Node.js
- Express.js
- Handlebars
- Body-parser
- Multer
- Express-Flash
- Session
- Passport
- JQuery
- InputMask


## Funcionalidades

- Login e Logout utilizando `passport`
- Encriptação de senhas utilizando `bcrypt`
- Sistema CRUD (Create, Read, Update, Delete) ` sequelize ` 
- Upload de documentos utilizando `multer`.
- Máscaras para inputs utilizando ` JQuery ` e ` InputMask` 


## Instalação

1. Clone o repositório para sua máquina local:
```bash
https://github.com/VitorManuel01/susegSeguros.git 
```
2. Utilize o comando para evitar erros:
```bash
Set-ExecutionPolicy Unrestricted -Scope Process
```

3. Execute a aplicação com o comando:
```bash
npm start
```

4. No seu navegador siga esta rota:
```bash
http://localhost:5500
```
5. Para acessar a rota privada de administração:
```bash
http://localhost:5500/adm 

```
`Atenção esta aplicação requer a configuração de banco para utiliza-la`

- Utilize o seguinte comando para obter uma lista dos comandos do sequelize:
```bash
npx sequelize-cli
```
- É recomendado verificar a documentação do mesmo.
    