# Tropykaly - Sistema de Pedidos

Projeto desenvolvido para a disciplina de Arquitetura de Sistemas (IFCE - Campus Boa Viagem).

---

## Objetivo

O sistema tem como objetivo gerenciar pedidos da pizzaria Tropykaly, permitindo a navegação por categorias de produtos (Pizzas, Lanches, Bebidas), cálculo automático de valores com taxa de entrega e finalização do pedido.

O projeto foi evoluído a partir de uma implementação simples em JavaScript para uma arquitetura em camadas com backend em PHP, aplicando padrões de projeto e separação de responsabilidades.

---

## Tecnologias Utilizadas

- HTML, CSS, JavaScript (Frontend)
- PHP (Backend / API)
- Sessão PHP (persistência de dados)
- Render (deploy)

---

## Arquitetura do Sistema

O sistema foi reorganizado seguindo uma arquitetura em camadas:

- **Models** → Entidades do sistema (Produto, Pedido, ItemPedido)
- **Controllers** → Controle da API e fluxo da aplicação
- **Services** → Regras de negócio e padrões de projeto
- **Repositories** → Persistência dos dados
- **Frontend** → Interface web consumindo a API via fetch

O frontend se comunica com o backend por meio de requisições HTTP (API PHP centralizada).

---

## Evolução do Sistema (Engenharia Reversa)

### Versão inicial (legado)
- Lógica concentrada em JavaScript
- Manipulação direta do DOM
- Uso de estruturas globais
- Ausência de backend

### Versão atual (refatorada)
- Backend em PHP estruturado em camadas
- Separação entre frontend e backend
- Uso de padrões de projeto
- Persistência de dados via sessão PHP
- Comunicação via API
- Taxa de entrega calculada automaticamente

---

## Padrões de Projeto Aplicados

### Factory
Responsável pela criação centralizada de objetos Produto (Pizza, Lanche, Bebida).

### Singleton
Garante uma única instância do Pedido durante a execução da aplicação, persistida via sessão PHP.

### Strategy
Define a lógica de aplicação de descontos progressivos no pedido.

### Observer
Implementado com Subject e LoggerObserver para registrar eventos ao finalizar pedidos.

### Repository
Responsável pela persistência e manipulação dos dados armazenados.

---

## Funcionalidades

- Adicionar produtos ao pedido (Pizza, Lanche, Bebida)
- Listar itens adicionados
- Calcular subtotal automaticamente
- Calcular taxa de entrega (R$ 5,00)
- Aplicar desconto progressivo na finalização
- Finalizar pedido
- Enviar resumo do pedido via WhatsApp
- Persistência de dados via sessão PHP

---

## API (Backend PHP)

O backend utiliza um endpoint único controlado por parâmetro `action`:

- `GET ?action=listar` → retorna itens do pedido
- `POST ?action=adicionar` → adiciona item ao pedido
- `GET ?action=finalizar` → finaliza o pedido

---

## Estrutura do Projeto

backend/
  controllers/
  models/
  services/
  repositories/

index.html
script.js
style.css

---

## Observações Técnicas

- O sistema foi adaptado para funcionar em ambiente de deploy (Render)
- Comunicação frontend/backend via fetch API
- Estrutura modular para facilitar manutenção e expansão
- Aplicação de conceitos de engenharia de software (coesão e baixo acoplamento)

---

## Autor

Projeto acadêmico – IFCE Boa Viagem

---

## Conclusão

O sistema evoluiu de uma aplicação monolítica em JavaScript para uma arquitetura em camadas baseada em PHP, aplicando padrões de projeto e boas práticas de engenharia de software, melhorando significativamente a organização, escalabilidade e manutenção do código.
