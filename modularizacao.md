# Modelagem da Arquitetura Modular

Este documento apresenta a estrutura conceitual e organizacional do sistema após o processo de refatoração da arquitetura MVC para Modular.

## Estrutura dos Módulos

O sistema foi dividido em módulos independentes organizados por domínio de negócio, promovendo separação de responsabilidades, reutilização de código e maior escalabilidade.

### `src/modules/products/`
Responsável pela gestão de produtos, entidades e fábricas de criação.

### `src/modules/orders/`
Responsável pelo fluxo de pedidos, regras de negócio, persistência, controle e atualização da interface.

### `src/shared/`
Contém serviços compartilhados, middlewares e funcionalidades reutilizáveis entre módulos.

---

# Diagramas de Modelagem

Os diagramas de modelagem do sistema encontram-se na pasta:

```bash
/diagramas
