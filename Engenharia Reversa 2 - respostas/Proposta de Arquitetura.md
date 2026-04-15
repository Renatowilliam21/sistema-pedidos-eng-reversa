# **Parte 8 e 9 – Proposta de Arquitetura e Padrões**

## **Parte 8 – Proposta de Arquitetura**

Para garantir escalabilidade e fácil manutenção, a arquitetura proposta segue o modelo **Cliente-Servidor com API REST** e separação em camadas lógicas (Clean Architecture no backend).

### **Organização em Camadas**

1. **Presentation Layer (Frontend):** Desenvolvida num framework moderno (ex: React.js ou Vue.js). Responsável unicamente pela captura de eventos do utilizador, renderização do menu e gestão do estado local do carrinho.  
2. **Application / Business Layer (Backend):** Uma API desenvolvida em Node.js ou Java/Spring. Contém os *Controllers* que recebem as requisições http, interagem com os *Services* (regras de negócio) para calcular fretes, disponibilidade de produtos e horários de funcionamento.  
3. **Data Layer (Base de Dados):** Repositórios e conexão com o banco (ex: PostgreSQL para pedidos estruturados ou MongoDB para um catálogo flexível).

### **Componentes Principais**

* **Catálogo Service:** Componente que fornece as categorias e produtos.  
* **Cart/Session Manager:** Componente de frontend que guarda os itens temporariamente no *LocalStorage*.  
* **Checkout Gateway:** Serviço de integração (que formata o texto para envio via API do WhatsApp ou WhatsApp Web).

## **Parte 9 – Aplicação de Padrões de Projeto**

### **1\. Padrão Singleton**

* **Como aplicar:** O CarrinhoDeCompras no frontend e a ConexaoBancoDeDados no backend.  
* **Explicação:** O utilizador não pode ter dois carrinhos em simultâneo na mesma aba. Implementamos o Singleton no serviço de gestão de estado (ex: uma classe CartManager em JavaScript) que tem um método getInstance(). Se já existir um carrinho instanciado, ele retorna o atual, impedindo a subscrição acidental dos dados.

### **2\. Padrão Factory (Factory Method)**

* **Como aplicar:** Na criação de objetos de Produtos com diferentes variações.  
* **Explicação:** Temos um ProdutoFactory. Quando o utilizador clica numa Pizza, a Factory cria uma classe PizzaItem (que obriga à escolha de até 2 sabores e tamanho). Quando clica num Bebida, cria um BebidaItem (que apenas pede quantidade e temperatura). Isto elimina *if/elses* complexos na UI, delegando a construção do objeto à Factory.