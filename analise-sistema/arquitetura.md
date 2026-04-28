# Proposta de Arquitetura e Padrões de Projeto

## Parte 4 – Padrões de Projeto

**1. O sistema aparenta utilizar padrões?**

Sim. Por se tratar de um sistema de e-commerce em produção, é provável que utilize padrões consolidados para garantir estabilidade, escalabilidade e manutenibilidade.

**2. Onde poderiam existir e ser aplicados:**

- **MVC (Model-View-Controller):** Na estrutura principal do backend. O *Model* gerenciaria os dados de Pizzas, Pedidos e Clientes; a *View* entregaria a interface ou o JSON para o frontend; o *Controller* receberia e processaria as requisições de finalização de pedido.

- **Factory:** Na criação de objetos de produto. Uma `ProdutoFactory` seria responsável por instanciar os diferentes tipos de itens do cardápio (Pizza, Lanche, Bebida), centralizando a lógica de criação e facilitando a adição de novos produtos.

- **Singleton:** No gerenciamento da conexão com o banco de dados e na sessão do carrinho de compras, garantindo que exista apenas uma instância ativa por usuário durante toda a navegação.

---

## Parte 8 – Proposta de Arquitetura

- **Organização em camadas:**
  - *Camada de Apresentação*: Interface web responsiva (React ou Vue)
  - *Camada de Aplicação*: Controladores da API REST
  - *Camada de Domínio*: Regras de negócio (cálculo de frete, descontos, validações)
  - *Camada de Infraestrutura*: Banco de dados relacional e integrações externas (WhatsApp, pagamento)

- **Separação de responsabilidades:** O banco de dados nunca deve ser acessado diretamente pela camada de apresentação. Toda comunicação deve passar obrigatoriamente pela API, garantindo segurança e consistência dos dados.

- **Componentes principais:**
  - Servidor Web (Frontend)
  - API Gateway (Backend)
  - Serviço de Sessão e Autenticação
  - Banco de Dados Relacional (MySQL ou PostgreSQL)
  - Integração com WhatsApp para envio de pedidos

---

## Parte 9 – Aplicação de Padrões

**Factory:**
Aplicaríamos o padrão Factory Method para instanciar os diferentes tipos de entrega disponíveis (`EntregaDelivery` e `RetiradaLocal`), já que cada modalidade possui regras distintas de taxa, tempo de espera e validação de endereço.

**Singleton:**
Aplicaríamos no `GerenciadorDeCarrinho`, garantindo que exista apenas uma instância do carrinho por sessão de usuário. Isso evita inconsistências como itens duplicados ou perdas de dados ao navegar entre páginas.
