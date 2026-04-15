# Proposta de Arquitetura e Padrões

## Parte 8 – Proposta de Arquitetura
Propõe-se o uso do padrão **MVC (Model-View-Controller)**:
* **Model:** Gerencia os dados (Produtos, Preços, Regras de Frete).
* **View:** Interface em React ou Vue.js para o cardápio.
* **Controller:** Lógica para validar o carrinho antes de enviar para o WhatsApp.

## Parte 9 – Aplicação de Padrões
* **Factory Method:** Utilizado para criar diferentes tipos de produtos. Uma `PizzaFactory` pode instanciar objetos `Pizza` ou `Esfirra` dependendo da escolha, já que possuem atributos diferentes (ex: borda recheada vs sabor da massa).
* **Singleton:** Aplicado na classe de `CarrinhoDeCompras`. Deve haver apenas uma instância do carrinho ativa por sessão de usuário para evitar duplicidade de pedidos.