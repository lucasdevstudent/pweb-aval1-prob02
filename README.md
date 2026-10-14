# Consulta de Livros

**Integrantes:**
- Lucas Matheus de Siqueira Ribeiro da Silva
- Larissa Alves da Cunha

## Descrição

Aplicação web para consulta de livros. O usuário pesquisa por título ou autor, vê a lista de resultados e consulta os detalhes de um livro selecionado.

Trabalho da 1ª Avaliação da disciplina de Programação Web (UESPI) — Problema 2.

## Funcionalidades

- Pesquisa de livros por título ou autor
- Listagem dos resultados com título, autores, ano da primeira publicação e capa
- Detalhamento do livro: título, autores, capa, ano da primeira publicação, editoras, ISBN e quantidade de edições
- Tratamento de carregamento, pesquisa sem resultados, campo vazio e erros de comunicação
- Tratamento de livros sem capa ou com dados ausentes

## API utilizada

[Open Library Search API](https://openlibrary.org/dev/docs/api/search)
Documentação geral: https://openlibrary.org/developers/api

## Tecnologias

- HTML5
- CSS3
- JavaScript (puro, com `fetch` e `async/await`)

## Como executar

1. Clone o repositório:
   ```
   git clone <link-do-repositorio>
   ```
2. Abra o arquivo `index.html` no navegador (é necessário acesso à internet).
