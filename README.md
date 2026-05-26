# Sistema de Pedidos - Arquitetura Modular por Domínio

Este repositório documenta o processo de migração arquitetural de um sistema legado estruturado sob o padrão MVC tradicional para um ecossistema modular baseado em contextos delimitados. O objetivo principal desta evolução é garantir que o software suporte o crescimento do projeto, o aumento da equipe, a manutenção contínua e a escalabilidade estrutural, reduzindo o acoplamento entre os componentes.

---

##🎯 Objetivo do Projeto

Aplicar na prática os conceitos de refatoração arquitetural, migração de sistemas para design orientado a domínios de negócio e segregação estrita de responsabilidades através de padrões de projeto consolidados.

---

## 📁 Estrutura de Diretórios Esperada (Parte 12)

O projeto foi reorganizado para respeitar a árvore de pastas exigida para a entrega final:

/arquitetura-modular
├── README.md           # Manual do projeto, padrões e simulação ágil
├── analise.md          # Análise de engenharia reversa e problemas do MVC
├── comparacao.md       # Tabela comparativa entre MVC e Modular
├── modularizacao.md    # Mapeamento de arquivos e diagramas de fluxo (Mermaid)
├── diagramas/          # Pasta contendo os arquivos de imagem (.png) dos diagramas
└── codigo/             # Pasta contendo o código-fonte estruturado (/src)

---

## 🛠️ Padrões de Projeto Implementados (Parte 5)

A nova estrutura do sistema foi refatorada para garantir a aderência aos seguintes padrões de design obrigatórios:

* Service Pattern: Centraliza todas as regras de negócio e lógicas de cálculo (como taxas e descontos) dentro da camada de serviços (PedidoService.js), deixando os controladores limpos e focados apenas em delegar ações.
* Repository Pattern: Abstrai e isola completamente o mecanismo de leitura e gravação no banco de dados local (db.json), garantindo que as regras de domínio não tenham conhecimento da infraestrutura física de dados.
* Factory Pattern: Implementado no módulo de produtos (ProdutoFactory.js) para encapsular, isolar e padronizar a criação e instanciação parametrizada de objetos da classe Produto.
* Singleton Pattern: Utilizado através do PedidoSingleton.js para garantir uma única instância global compartilhada de dados vivos do carrinho, mantendo a consistência do estado em toda a aplicação.
* Middleware Pattern: Componentizado na pasta compartilhada (authMiddleware.js) para interceptar as ações do usuário antes que cheguem aos controladores, validando o estado de autenticação fake via localStorage.
* Observer Pattern (Opcional/Desafio Extra): Acoplado entre a camada de serviço e visão (PedidoObserver.js) para notificar e atualizar a interface automaticamente sempre que houver modificações no estado do pedido.

---

## 📋 Organização Ágil da Equipe (Simulação Jira - Parte 11)

Para simular o ambiente de desenvolvimento de uma equipe profissional utilizando metodologias ágeis, o processo de migração arquitetural foi planejado em um backlog de sprint com 5 tarefas (Issues) estruturadas:

### 1. [SPRINT-01] [TASK-101] Isolamento e Migração do Domínio de Produtos
* Responsável: Desenvolvedor Frontend 1
* Descrição: Criar a estrutura física e o escopo isolado do módulo /products. Mover os arquivos correlatos (Produto.js para a pasta de entidades e ProdutoFactory.js para a pasta de serviços). Ajustar caminhos de escopo e importação de módulos nativos.
* Status: Concluído (Done).

### 2. [SPRINT-01] [TASK-102] Refatoração de Controladores e Encapsulamento de Serviços
* Responsável: Engenheiro de Software Legado
* Descrição: Extrair todos os cálculos complexos, acumulações de estado e regras de negócio que habitavam no controlador antigo. Portar essas responsabilidades para o arquivo PedidoService.js no módulo /orders seguindo o Service Pattern.
* Status: Concluído (Done).

### 3. [SPRINT-01] [TASK-103] Abstração de Dados com Repository Pattern
* Responsável: Desenvolvedor Fullstack
* Descrição: Criar a camada de repositório (PedidoRepository.js) dentro do módulo de pedidos. Isolar os métodos assíncronos de persistência locais associados ao banco de dados em arquivo JSON, impedindo o acesso direto por outras camadas.
* Status: Concluído (Done).

### 4. [SPRINT-01] [TASK-104] Implementação de Middleware e Interceptação de Segurança
* Responsável: Engenheiro de Segurança / Infra
* Descrição: Construir o interceptador transversal fake (authMiddleware.js) dentro da pasta compartilhada src/shared/middlewares/. O componente deve ler as credenciais locais do navegador e envelopar as ações de clique dos controladores para bloquear acessos ilegítimos (Erro 401).
* Status: Concluído (Done).

### 5. [SPRINT-01] [TASK-105] Code Review Técnico e Validação do Pull Request
* Responsável: Arquiteto de Software (Tech Lead)
* Descrição: Conduzir a validação final cruzada de código através de um Pull Request na branch arquitetura-modular. Garantir a estabilidade retroativa de todas as funcionalidades do front-end, checar se os controladores ficaram magros e validar
 o histórico de commits no Git.
* Status: Em Revisão (In Review).# Estrutura e Modelagem da Arquitetura Modular

