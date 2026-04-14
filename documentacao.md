# Relatório de Engenharia Reversa: Sistema de Pedidos

[cite_start]**Estudante:** GERMANO DE OLIVEIRA MORAES [cite: 3]
[cite_start]**Professor:** RENATO WILLIAM RODRIGUES DE SOUZA [cite: 4]
[cite_start]**Curso:** ADS - S4 [cite: 5]
[cite_start]**Data:** 13/04/2026 [cite: 8]

---

## Parte 1 - Compreensão do Sistema

1. **Qual é o objetivo do sistema?**
   [cite_start]Automatizar o registro de pedidos em uma pastelaria, permitindo o controlo de itens selecionados e o cálculo automatizado de valores, taxas e descontos[cite: 13].

2. **Quais são suas principais funcionalidades?**
   * [cite_start]Seleção de produtos via menu[cite: 15].
   * [cite_start]Inserção de quantidades e listagem dinâmica de itens adicionados[cite: 15].
   * [cite_start]Cálculo de subtotais por item e aplicação de lógica de descontos e taxas sobre o total[cite: 15, 16].
   * [cite_start]Persistência básica do último pedido no navegador[cite: 16].

3. **Como o usuário interage com o sistema?**
   [cite_start]Através de uma interface web onde seleciona o item, digita a quantidade e utiliza botões de ação como "Adicionar" e "Finalizar"[cite: 19, 20]. [cite_start]O feedback ocorre via manipulação direta do DOM com atualização da lista e alertas[cite: 20].

---

## Parte 2 - Identificação de Elementos

1. **Quais são as principais funções do sistema?**
   [cite_start]`adicionar()`, `atualizarLista()`, `salvarTotal()`, `finalizar()`, `limparTudo()`, `removerUltimo()` e `calcularTotal()`[cite: 23].

2. **Quais dados são manipulados?**
   [cite_start]Nomes de produtos, preços unitários fixos, quantidades, subtotal, total acumulado, percentuais de desconto (10% e 20%) e taxa de serviço (5%)[cite: 25].

3. **Quais entidades podem ser extraídas?**
   [cite_start]`Produto`, `ItemPedido`, `Pedido` (ou Carrinho) e `GerenciadorInterface`[cite: 27].

---

## Parte 3 - Arquitetura

1. **O sistema possui arquitetura definida?**
   Não. [cite_start]O sistema original é procedural (estilo "Script Espaguete"), onde as funções manipulam variáveis globais diretamente, sem separação entre lógica de negócio e interface[cite: 30, 31].

2. **Ele segue algum padrão (MVC, camadas, etc.)?**
   Não. [cite_start]Não há distinção entre as camadas de Modelo, Visão e Controle[cite: 33].

3. **Como você classificaria esse sistema?**
   [cite_start]Um monólito funcional simples de script único, sem modularização[cite: 35].

---

## Parte 4 - Modelagem (Diagrama UML)

[cite_start]A nova arquitetura utiliza os seguintes componentes[cite: 52, 53]:
1. [cite_start]**Classe GerenciadorPedidos (Singleton):** Atua como o núcleo do sistema (camada de controlo), garantindo uma única instância para evitar duplicidade de dados na memória[cite: 54, 55].
2. [cite_start]**Classe ItemPedido:** Encapsula as informações de cada produto (nome, quantidade e valor calculado)[cite: 57, 58].
3. [cite_start]**Classe ProdutoFactory (Factory):** Centraliza a definição de preços e isola a lógica de criação de objetos[cite: 59, 60].

**Relacionamentos:**
* [cite_start]**Gerenciamento:** O `GerenciadorPedidos` possui uma relação de 1 para N com `ItemPedido`[cite: 64].
* [cite_start]**Dependência:** O `GerenciadorPedidos` depende da `ProdutoFactory` para instanciar novos produtos[cite: 65].

---

## Parte 5 - Análise de Problemas

* [cite_start]**Coesão Baixa:** Funções como `atualizarLista()` realizam múltiplas tarefas simultâneas, como limpar a tela e salvar dados ao mesmo tempo[cite: 68].
* [cite_start]**Acoplamento Alto:** O JavaScript está fortemente ligado a IDs específicos do HTML, tornando o código frágil[cite: 69].
* [cite_start]**Separação de Responsabilidades Inexistente:** Regras de negócio estão misturadas com funções de interface e alertas[cite: 70].
* [cite_start]**Duplicação de Código:** A lógica de soma aparece em múltiplas funções[cite: 71].



## Parte 6 – Propostas de Melhoria
* **Organização em camadas:** Separar a Lógica de Negócio da manipulação de Visão (UI).
* **Criação de classes:** Implementar POO para encapsular atributos e comportamentos.
* **Padrões de projeto:** Utilizar Factory para centralizar a criação de produtos e Singleton para garantir estado único do carrinho.

## Parte 7 - Refatoração
A refatoração foi aplicada no arquivo `script.js`. A lógica de negócios foi separada da manipulação do DOM. Funções de cálculo duplicadas foram removidas e o estado da aplicação foi centralizado.

## Parte 8 – Aplicação de Padrões de Projeto
* **Factory (`ProdutoFactory`):** Aplicado na instanciação de produtos para centralizar a tabela de preços. Utilizado para que o gerenciador de pedidos não precise conhecer a lógica de precificação.
* **Singleton (`GerenciadorPedidos`):** Aplicado no controle geral do pedido. Utilizado para garantir que exista apenas um "carrinho" ativo na memória, prevenindo inconsistências nos dados e variáveis globais soltas.