# Estrutura e Modelagem da Arquitetura Modular

Este documento detalha o mapeamento físico e conceitual do sistema após o processo incremental de refatoração de MVC para Modular.

---

# 1. Mapeamento de Arquivos por Domínio

A árvore de diretórios do diretório `/src` foi reestruturada para suportar o isolamento semântico das responsabilidades do sistema, dividindo a aplicação por domínios de negócio.

## `src/modules/products/` (Módulo de Produtos)

- `entities/Produto.js`  
  Entidade responsável por modelar as propriedades e atributos estruturais do produto.

- `services/ProdutoFactory.js`  
  Fábrica responsável pela instanciação segura e padronizada de objetos de produto.

---

## `src/modules/orders/` (Módulo de Pedidos)

- `controllers/PedidoController.js`  
  Controlador responsável por interceptar eventos da interface e delegar as operações para a camada de serviço.

- `entities/Pedido.js` e `entities/ItemPedido.js`  
  Modelagem das regras intrínsecas e estruturas de dados relacionadas ao fluxo de vendas.

- `repositories/PedidoRepository.js`  
  Camada de abstração de acesso a dados, responsável pelo isolamento da persistência no arquivo `db.json`.

- `services/PedidoService.js`, `PedidoSingleton.js` e `DescontoService.js`  
  Camada responsável pela centralização das regras de negócio do pedido.

- `views/PedidoObserver.js` e `PedidoView.js`  
  Implementação da camada visual e dos padrões reativos de atualização da interface.

---

## `src/shared/` (Módulo Compartilhado / Transversal)

- `middlewares/authMiddleware.js`  
  Middleware responsável pela validação simulada de autenticação de usuários.

- `services/WhatsAppService.js`  
  Serviço utilitário reutilizável para comunicação externa e notificações.

---

# 2. Diagramas de Modelagem

## A. Diagrama de Módulos e Comunicação

graph TB

    subgraph Shared [Módulo Shared / Transversal]
        auth[authMiddleware.js]
        whats[WhatsAppService.js]
    end

    subgraph ProductsModule [Módulo Products]
        ProdFactory[services/ProdutoFactory.js]
        ProdEntity[entities/Produto.js]

        ProdFactory -->|Instancia| ProdEntity
    end

    subgraph OrdersModule [Módulo Orders]

        Controller[controllers/PedidoController.js]
        Service[services/PedidoService.js]
        Repo[repositories/PedidoRepository.js]

        subgraph Entities [Entities]
            PedEntity[Pedido.js]
            ItemEntity[ItemPedido.js]
        end

        subgraph Views [Views]
            PedView[PedidoView.js]
            PedObs[PedidoObserver.js]
        end
    end

    subgraph Config [Config]
        DB[(db.json)]
    end

    auth -->|Intercepta ações em| Controller

    Controller -->|Delega operações para| Service

    Service -->|Consome dados de| ProdFactory

    Service -->|Envia notificações via| whats

    Service -->|Manipula regras de| PedEntity

    Service -->|Dispara atualizações para| PedObs

    PedObs -->|Atualiza interface via| PedView

    Service -->|Solicita persistência ao| Repo

    Repo -->|Lê / Escreve em| DB
