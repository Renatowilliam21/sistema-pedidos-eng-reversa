# **PARTE 8 – PROPOSTA DE ARQUITETURA**

## **Organização em camadas (MVC)**

O sistema poderia ser reestruturado seguindo o padrão MVC (Model-View-Controller), com a seguinte divisão:

* **View (Apresentação):** interface do usuário (catálogo, carrinho, checkout)  
* **Controller (Controle):** gerenciamento de ações como adicionar produtos, calcular valores e avançar etapas do pedido  
* **Model (Modelo):** entidades como Produto, Pedido, Cliente, Pagamento e regras de negócio

## **Separação de responsabilidades**

Cada camada teria responsabilidades bem definidas:

* Interface apenas exibe dados e coleta entradas do usuário  
* Controller processa ações e coordena o fluxo do sistema  
* Model concentra regras de negócio e manipulação de dados

Isso evitaria que a interface realizasse cálculos diretamente, como ocorre no modelo atual do carrinho.

## **Componentes principais propostos**

* Módulo de Produtos (catálogo e personalização)  
* Módulo de Carrinho (controle de itens e subtotal)  
* Módulo de Pedidos (fluxo de checkout)  
* Módulo de Clientes (dados do usuário)  
* Módulo de Pagamentos (processamento de formas de pagamento)  
* Módulo de Entrega (endereço e tipo de entrega)

# **PARTE 9 – APLICAÇÃO DE PADRÕES**

## **Factory**

O padrão Factory poderia ser aplicado na criação de produtos.

No sistema atual, existem diferentes tipos de produtos (pizza, combo, bebida), cada um com regras próprias de configuração. A Factory centralizaria essa criação, evitando que a interface ou o carrinho instanciem diretamente cada tipo de produto.

Exemplo de aplicação no sistema:

* Ao selecionar uma pizza, a Factory cria um objeto Pizza com tamanho, borda e adicionais  
* Ao selecionar um combo, a Factory cria um objeto Combo com seus itens configurados

Isso facilita a adição de novos produtos sem modificar múltiplas partes do sistema.

## **Singleton**

O padrão Singleton pode ser aplicado em componentes que devem manter uma única instância durante a navegação do usuário.

No sistema analisado, o principal candidato é o **carrinho de compras**.

Justificativa:

* O carrinho precisa manter um estado único durante toda a sessão  
* Evita inconsistências como múltiplos carrinhos simultâneos  
* Centraliza adição, remoção e cálculo de itens

Outro possível uso seria no gerenciamento de sessão ou configuração global do sistema.

  