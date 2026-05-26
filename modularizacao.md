# Estrutura e Modelagem da Arquitetura Modular

Este documento detalha o mapeamento físico e conceitual do sistema após o processo incremental de refatoração.

## 1. Mapeamento de Arquivos por Domínio

A árvore de diretórios do diretório /src foi reestruturada para suportar o isolamento semântico de suas responsabilidades:

* **src/modules/products/ (Módulo de Produtos)**
  * entities/Produto.js (Entidade que molda as propriedades do produto).
  * services/ProdutoFactory.js (Fábrica responsável pela instanciação de objetos).
* **src/modules/orders/ (Módulo de Pedidos)**
  * controllers/PedidoController.js (Controlador magro que intercepta eventos e delega funções).
  * entities/Pedido.js e ItemPedido.js (Modelagem de regras intrínsecas do pedido).
  * repositories/PedidoRepository.js (Abstração do acesso a dados e arquivo db.json).
  * services/PedidoService.js, PedidoSingleton.js e DescontoService.js (Centralização das regras de negócio).
  * views/PedidoObserver.js e PedidoView.js (Implementação de padrões visuais e reativos).
* **src/shared/ (Módulo Compartilhado / Transversal)**
  * middlewares/authMiddleware.js (Interceptador global para validação de sessões locais).
  * services/WhatsAppService.js (Serviço utilitário reutilizável de comunicação externa).

## 2. Diagramas de Modelagem

### A. Diagrama de Módulos (Dependências e Comunicação)

```mermaid
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

    auth -->|Intercepta cliques em| Controller
    Controller -->|Delega ações para| Service
    Service -->|Consome dados de| ProdFactory
    Service -->|Envia notificações via| whats
    Service -->|Manipula regras de| PedEntity
    Service -->|Dispara atualizações para| PedObs
    PedObs -->|Atualiza o ecrã via| PedView
    Service -->|Solicita persistência ao| Repo
    Repo -->|Lê / Escreve no| DB




###  fluxo AQUITETURAL DE EXECUÇÃO

```mermaid
sequenceDiagram
    autonumber
    actor Utilizador as Utilizador (Navegador)
    participant MW as shared/authMiddleware
    participant CTRL as orders/PedidoController
    participant SRV as orders/PedidoService
    participant REPO as orders/PedidoRepository
    participant DB as config/db.json

    Utilizador->>MW: Dispara Ação (Request / Clique no Botão)
    
    alt Sem Token no localStorage
        MW-->>Utilizador: Bloqueia Execução (Erro 401: Não Autorizado)
    else Token Válido Encontrado
        MW->>CTRL: Autoriza e repassa a execução (nextAction)
        activate CTRL
        
        CTRL->>SRV: Solicita processamento do negócio
        activate SRV
        
        Note over SRV: Aplica descontos e calcula totais
        
        SRV->>REPO: Solicita persistência do Pedido concluído
        activate REPO
        
        REPO->>DB: Grava dados de forma assíncrona
        DB-->>REPO: Confirmação de escrita
        REPO-->>SRV: Retorna sucesso do salvamento
        deactivate REPO
        
        SRV-->>CTRL: Retorna o Pedido finalizado
        deactivate SRV
        
        CTRL-->>Utilizador: Atualiza a interface e exibe sucesso
        deactivate CTRL
    end
