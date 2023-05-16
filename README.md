# Teste Fullstack Shopper

## Descrição do Projeto

O projeto é uma aplicação web que permite a atualização de produtos por meio de um arquivo CSV. Ele fornece uma interface simples onde você pode arrastar e soltar um arquivo CSV, ou carregar utilizando o botão, contendo informações de produtos e, em seguida, validar e atualizar os produtos no backend.


## Entidades (Typescript)

### Product 

Representa os produtos de nossa aplicação.
 private code: number,
    private name: string,
    private cost_price: number,
    private sales_price: number

- `code (number)`

- `name (string)`

- `cost_price: (number) `

- `sales_price: (number)`


## Tabelas (MySQL)

### Product

code bigint PRIMARY KEY, # CODIGO DO PRODUTO 
	name varchar(100) NOT NULL, # NOME DO PRODUTO
	cost_price decimal(9,2) NOT NULL, # CUSTO DO PRODUTO
	sales_price decimal(9,2) NOT NULL # PREÇO DE VENDA DO PRODUTO

- `code bigint PRIMARY KEY # CODIGO DO PRODUTO`
- `name varchar(100) NOT NULL # NOME DO PRODUTO`
- `cost_price decimal(9,2) NOT NULL # CUSTO DO PRODUTO`
- `sales_price decimal(9,2) NOT NULL # PREÇO DE VENDA DO PRODUTO`


### Pack

- `id bigint AUTO_INCREMENT PRIMARY KEY # id primario da tabela`
- `product_id bigint NOT NULL, # id do produto componente`
- `qty bigint NOT NULL, # quantidade do produto componente no pack`
- `CONSTRAINT FOREIGN KEY (pack_id) REFERENCES product(code)`
- ` CONSTRAINT FOREIGN KEY (product_id) REFERENCES product(code)`


## Instruções

Ps. utilizar a branch backend

### Frontend

1. Clone o projeto
- `git clone <URL_DO_REPOSITÓRIO>`
 
2. Navegue até o diretório do projeto:
- `cd frontend`

3. Instale as dependências do projeto::
- `npm install`

4. Inicie a aplicação:
- `npm start`

5. Acesse a aplicação no navegador:
- `http://localhost:3000`

6. Carregue o arquivo CSV do seu computador (depois de executar as migrations do backend)

### Backend

### Instalando as dependências

- `npm install:`
  Instala todas as dependências listadas no `package.json`.

### Populando as tabelas

- `npm run migrations`
  Cria e popula as tabelas com dados mockados de usuários e shows.
  - Esse script deve ser executado apenas uma única vez
  - Se executado uma segunda vez, ele dropa as tabelas e reseta os dados mockados

### Criando o arquivo .env:

Criar o arquivo `.env` e configurar com as informações de seu banco de dados.

```
PORT: 3003
DB_HOST = host
DB_USER = usuario
DB_PASSWORD = senha
DB_NAME = nome-do-banco-de-dados
JWT_KEY = "minha-senha-segura"
JWT_EXPIRES_IN = "24h"
BCRYPT_SALT_ROUNDS = 12
```

### Executar o projeto:

- `npm run dev`:
  Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor `localhost` toda a vez que o projeto for alterado e salvo.
  

## Funcionalidades

### PUT /product

Este endpoint é responsável por atualizar os produtos com base no arquivo CSV e nas informações enviadas. O arquivo CSV deve ser carregado na página do frontend.

#### Parâmetros de Requisição

- `file`: Arquivo CSV contendo as informações dos produtos a serem atualizados.
- `products`: Array de objetos contendo os produtos a serem atualizados.

#### Respostas

- 200 OK: A requisição foi processada com sucesso. Retorna um objeto contendo a mensagem de sucesso e os detalhes dos produtos atualizados.
- 400 Bad Request: A requisição foi mal formada ou contém dados inválidos.
- 500 Internal Server Error: Ocorreu um erro no servidor ao processar a requisição.

## Tecnologias Utilizadas

- NodeJS
- React
- TypeScript
- MySQL
- Axios
- React-dropzone
- CSV Parser
- Knex
- Express
- Cors
- JWT
- BcryptJS
- Markdown
- Jest

## Autor

- - [Gabriel Wenchenck](https://github.com/gabrielwenchenck)

