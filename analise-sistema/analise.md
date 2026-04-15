# Análise do Sistema Real - Tropykaly Pizzas

## Parte 1 – Análise do Sistema
1. **Objetivo:** Facilitar a venda online de pizzas e lanches, permitindo que o cliente monte seu pedido e finalize o pagamento de forma digital, com integração via WhatsApp para notificações e logística.
2. **Funcionalidades:** Listagem de categorias, cardápio digital interativo, carrinho de compras dinâmico, checkout com formas de pagamento e integração com API de mensagens.
3. **Interação:** O usuário navega por abas de categorias, seleciona itens (com opção de adicionais), revisa o subtotal no carrinho e preenche dados de entrega.
4. **Organização:** Os produtos são agrupados por tipo (Pizza P, M, G, GG, Esfirras, Sanduíches, Bebidas) e seções especiais como "Combos" e "Promoções".

## Parte 2 – Análise de Arquitetura
* **Tipo:** Cliente-Servidor (Web-based). O cliente (navegador) consome dados do servidor que gerencia o estado dos pedidos.
* **Camadas:** Visualização (Front-end), Lógica de Negócio (Carrinho/Preços) e Integração (API WhatsApp).
* **Separação de Responsabilidades:** Existe uma clara divisão entre a interface de escolha do cliente e o sistema de recebimento de pedidos do lojista.

## Parte 3 – Análise de Design
* **Coesão:** Alta. As funções de escolha de sabor e tamanho estão bem agrupadas dentro do contexto de produto.
* **Acoplamento:** Moderado. O sistema parece depender fortemente da API do WhatsApp para a finalização real do fluxo de pedido.