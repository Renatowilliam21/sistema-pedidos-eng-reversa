# Análise do Sistema Real - Tropykaly Pizzas e Lanches

## Parte 1 – Análise do Sistema

**1. Qual é o objetivo do sistema?**

O sistema tem como objetivo digitalizar o processo de pedidos da pizzaria Tropykaly, permitindo que clientes visualizem o cardápio, escolham produtos e finalizem pedidos de delivery ou retirada diretamente pelo navegador, sem necessidade de contato telefônico.

**2. Quais funcionalidades ele oferece?**

- Navegação por categorias de produtos (Pizzas, Lanches, Bebidas)
- Exibição de detalhes, ingredientes e preços dos itens
- Carrinho de compras virtual com controle de quantidade
- Cálculo automático de taxa de entrega
- Formulário de dados para entrega (endereço, contato)
- Fechamento de pedido com envio via WhatsApp

**3. Como o usuário interage com o sistema?**

A interação ocorre por meio de uma interface web responsiva, acessível tanto em dispositivos móveis quanto em desktops. O usuário navega pelas categorias, adiciona itens ao carrinho com um clique, preenche seus dados de entrega em um formulário e finaliza o pedido, que é enviado diretamente ao estabelecimento via WhatsApp.

**4. Como os produtos estão organizados?**

Os produtos estão organizados em categorias hierárquicas (Pizzas, Lanches e Bebidas), facilitando a navegação e melhorando a experiência do usuário. Dentro de cada categoria, os itens são exibidos com foto, nome, descrição e preço.

---

## Parte 2 – Análise de Arquitetura

- **Tipo de arquitetura:** Cliente-Servidor, modelo padrão para aplicações web. O navegador do cliente consome os dados e exibe a interface, enquanto o servidor processa as requisições e gerencia os dados.

- **Possível divisão em camadas:**
  - *Apresentação*: Interface web renderizada no navegador do cliente
  - *Lógica de Negócio*: Backend responsável pelo gerenciamento do carrinho, cálculo de taxas e regras de pedido
  - *Dados*: Banco de dados contendo o cardápio, histórico de pedidos e informações do estabelecimento

- **Separação de responsabilidades:** Aparentemente existe separação entre frontend e backend. A interface exibe os dados e captura as ações do usuário, enquanto o servidor processa as regras de negócio, impedindo que o cliente manipule preços ou dados sensíveis diretamente.

---

## Parte 3 – Análise de Design

- **Coesão:** Alta. Cada componente visual do sistema parece ter uma responsabilidade bem definida — o modal do carrinho gerencia apenas os itens selecionados, o formulário cuida apenas dos dados de entrega, e o catálogo é responsável apenas pela exibição dos produtos.

- **Acoplamento:** Aparentemente baixo. A interface web funciona de forma independente, consumindo dados do backend provavelmente via API REST, o que permite que ambos evoluam separadamente sem grandes impactos.

- **Separação de responsabilidades:** O sistema demonstra boa separação entre a exibição estática do cardápio e o gerenciamento dinâmico do carrinho, sugerindo que essas responsabilidades estão isoladas em módulos distintos.
