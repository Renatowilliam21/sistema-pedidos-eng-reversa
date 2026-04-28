# 🏗️ Proposta de Arquitetura: Sistema Tropykaly Pizza

Este documento formaliza a proposta de reestruturação arquitetural e modelagem de dados para o sistema da **Tropykaly Pizza**. O objetivo é estabelecer um guia técnico sólido baseado em padrões de mercado e boas práticas de Engenharia de Software.

---

##  1. Estilo Arquitetural
A aplicação segue o padrão de **Arquitetura em Camadas (Layered Architecture)**. Esta escolha visa a separação de preocupações (*Separation of Concerns*), facilitando a manutenção e a testabilidade de cada módulo de forma isolada.

* **Camada de Apresentação (Frontend):** Interface responsiva para o cliente (Catálogo, Busca, Carrinho).
* **Camada de Aplicação/Negócio (API Services):** Centraliza as regras de negócio, validações e o controle do estado operacional.
* **Camada de Persistência (Data Access):** Gerenciamento da comunicação com o banco de dados (Clientes, Produtos, Pedidos).



---

##  2. Padrões de Projeto (Design Patterns)

Para solucionar problemas de fluxo e criação de objetos, propõe-se a adoção dos seguintes padrões GoF:

| Padrão | Aplicação Técnica | Objetivo |
| :--- | :--- | :--- |
| **Singleton** | `StatusOperacional` | Garante uma instância única global para validar se a loja está aberta/fechada. |
| **State** | Entidade `Pedido` | Gerencia as transições de status (Pendente, Preparo, Entrega, Finalizado). |
| **Factory** | `Produto` / `Pagamento` | Desacopla a lógica de criação de diferentes tipos de produtos e métodos de pagamento. |

---

##  3. Modelagem de Domínio

### 3.1 Entidades e Atributos Principais

* **Pedido:** `id`, `tipo` (entrega/balcão), `status` (State), `valor_total`.
* **StatusOperacional:** `is_aberto` (bool), `mensagem_status`, `horario_funcionamento`.
* **Produto/Categoria:** Identificação técnica e agrupamento de itens do cardápio.

### 3.2 Relacionamentos e Cardinalidade
Abaixo, a definição dos vínculos entre os objetos de negócio:

* **Categoria** (1) ─── (*) **Produto**
* **Cliente** (1) ─── (*) **Pedido**
* **Cliente** (1) ─── (*) **Endereco**
* **Pedido** (1) ─── (*) **ItemPedido**
* **ItemPedido** (*) ─── (1) **Produto**
* **Pedido** (1) ─── (0..1) **Pagamento**
* **StatusOperacional** ─── (Controla) ─── **Pedido**



---

##  4. Representação Visual (UML)

```mermaid
classDiagram
    direction TB
    class Cliente { +id, +nome, +telefone }
    class Pedido { +id, +status, +valorTotal, +validarFluxo() }
    class StatusOperacional { +bool isAberto, +verificarHorario() }
    class ItemPedido { +quantidade, +subtotal }

    Cliente "1" -- "*" Pedido
    Pedido "1" -- "*" ItemPedido
    ItemPedido "*" -- "1" Produto
    Categoria "1" -- "*" Produto
    StatusOperacional ..> Pedido : controla