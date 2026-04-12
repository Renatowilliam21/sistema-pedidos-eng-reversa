Pratica Orientada - 01

Parte 1 - Compreensão do Sistema

01. O objetivo era que o cliente fizesse o pedido, podendo ver o valor, selecionar quantidade, o que queria e ver as taxas e descontos.

02. Adição de produtos ao carrinho, listagem de itens, cálculo automático de subtotal/total e persistência do último pedido no LocalStorage.

03. Da interface web onde seleciona um produto em um menu suspenso, digita a quantidade e clica em botões para adicionar ou finalizar o pedido.


Parte 2 - Identificação de Elementos


01. adicionar(), atualizarLista(), finalizar(), limparTudo() e calcularTotal().

02. Nomes de produtos (strings), quantidades (inteiros), preços e subtotais (floats), além de um array de objetos para representar o carrinho.

03. Product (Produto), OrderItem (Item do Pedido) e OrderManager (Gerenciador do Pedido).


Parte 3 - Arquitetura

01. Não. O código é procedural e monolítico, onde a lógica de negócio e a manipulação do DOM estão misturadas em um único arquivo.

02. Não segue nenhum padrão (pelo menos conhecido por mim) como o MVC ou camadas.

03. Um sistema de script simples com lógica altamente acoplada e baixa organização estrutural.


Parte 4 - Modelagem


*NO ANEXOS/DIAGRAMA*



Parte 5 - Análise de Problemas

Coesão: Baixa; a função adicionar() valida dados, define preços e mexe na tela ao mesmo tempo.

Acoplamento: Alto; o JavaScript depende de IDs específicos do HTML para funcionar.

Separação de responsabilidades: Inexistente; o cálculo de impostos está dentro da função de alerta da interface.

Duplicação de código: A lógica de somar o total aparece tanto em atualizarLista() quanto em calcularTotal().

Organização geral: Mal organizado; variáveis globais (itens, total) facilitam erros de estado.


Parte 6 - Propostas de Melhoria

Organizar o código em camadas (Lógica de Negócio vs. UI).

Substituir o processamento procedural por Classes.

Implementar Factory para criação de produtos e Singleton para o carrinho.

Adicionar validações para impedir quantidades negativas ou pedidos vazios.


Parte 7 - Refatoração

A refatoração consiste em mover a lógica para dentro das classes ProductFactory e OrderManager, deixando o script principal apenas para escutar eventos de clique e atualizar o texto na tela.


Parte 8 – Aplicação de Padrões de Projeto

Factory:

Onde: Aplicado na criação de objetos de produto.

Por que: Para centralizar a tabela de preços e evitar múltiplos if/else espalhados pelo código.

Singleton:

Onde: Aplicado no gerenciador do pedido (OrderManager).

Por que: Para garantir que exista apenas uma instância do carrinho de compras durante toda a execução, evitando inconsistência de dados.
