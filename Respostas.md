# Relatório de Engenharia Reversa - Sistema de Pedidos

## Parte 1, 2 e 3: Compreensão e Arquitetura
1. **Objetivo:** Gerenciar pedidos de uma pastelaria, permitindo adicionar itens, calcular totais com descontos/taxas e persistir o valor final.
2. **Funcionalidades:** Seleção de produtos, definição de quantidade, listagem de itens em tempo real, cálculo de total acumulado, aplicação de descontos progressivos e salvamento em localStorage.
3. **Entidades Identificadas:** `Produto` (nome, preço), `ItemPedido` (produto, quantidade, subtotal) e `Pedido` (lista de itens, total).
4. **Análise de Arquitetura:** Atualmente o sistema é **Procedural/Monolítico**. Não há separação entre a lógica de negócio (cálculos) e a lógica de interface (manipulação do DOM). Tudo reside no `script.js`.

## Parte 4: Modelagem (UML Conceitual)
- **Classe Produto:** `nome`, `preco`.
- **Classe Pedido:** `itens[]`, `total`. Métodos: `adicionarItem()`, `calcularTotal()`, `limpar()`.
- **PedidoFactory:** Método `criarProduto(tipo)`.
- **CarrinhoManager (Singleton):** Gerencia a instância única do pedido.

## Parte 5 e 6: Problemas e Melhorias
- **Baixa Coesão:** A função `atualizarLista()` faz muita coisa: limpa a UI, calcula o total, cria elementos HTML e chama o salvamento.
- **Alto Acoplamento:** O código depende diretamente de IDs do HTML (`document.getElementById`). Se o HTML mudar, o JS quebra.
- **Duplicação de Código:** As funções `atualizarLista` e `calcularTotal` recalculam a mesma coisa.
- **Sugestão:** Implementar Padrões de Projeto (Factory e Singleton) e separar a lógica de UI da lógica de dados.