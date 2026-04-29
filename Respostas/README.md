Parte 1 – Compreens ̃ao do Sistema
1. Qual  ́e o objetivo do sistema?
O sistema tem como objetivo permitir o registro de pedidos de uma pastelaria, calculando o valor total da compra.

2. Quais são suas principais funcionalidades?
Selecionar produtos
Informar quantidade
Adicionar itens ao pedido
Exibir lista de itens
Calcular total

3. Como o usuário interage com o sistema?
O usuário utiliza uma interface web simples, selecionando produtos, informando quantidade e clicando em botões para adicionar itens e finalizar o pedido.

Parte 2 – Identificação de Elementos
1. Quais são as principais funções do sistema?
adicionar()
atualizarLista()
salvarTotal()
finalizar()
limparTudo()
removerUltimo()
calcularTotal()

2. Quais dados são manipulados?
Lista de itens (itens)
Produto
Quantidade
Subtotal
Total geral

3. Quais entidades podem ser extraídas (ex: classes)?
Produto
ItemPedido
Pedido

Parte 3 – Arquitetura
1. O sistema possui arquitetura definida? Justifique.
Não. O sistema não possui uma arquitetura bem definida, pois toda a lógica está concentrada em um único arquivo JavaScript.

2. Ele segue algum padrão (MVC, camadas, etc.)?
Não segue nenhum padrão claramente. A lógica, interface e manipulação de dados estão misturadas.

3. Como você classificaria esse sistema?
Sistema simples, monolítico e desorganizado.

Parte 4 – Modelagem
Está na imagem!

Parte 5 – Análise de Problemas
Identifique e explique problemas relacionados a:
Coesão:
Funções fazem muitas coisas ao mesmo tempo (ex: adicionar() faz validação, cálculo e inserção).

Acoplamento:
Código depende diretamente do HTML (getElementById dentro da lógica).

Separação de responsabilidades:
Não existe separação entre lógica de negócio e interface.

Duplicação de código:
A função calcularTotal() repete lógica já existente.

Organização geral:
Tudo está em um único arquivo, dificultando manutenção.

Parte 6 – Propostas de Melhoria
Separar código em camadas:
Interface (HTML)
Lógica (JS)
Criar classes:
Produto
Pedido
Criar funções menores e mais organizadas
Evitar acesso direto ao DOM na lógica
Remover duplicações
Aplicar padrões de projeto

Parte 7 – Refatoração 

Antes:
if (produto == "pastel") preco = 5;

Depois:
const precos = {
  pastel: 5,
  caldo: 7,
  refrigerante: 4,
  suco: 6
};

let preco = precos[produto];

Parte 8 – Aplicação de Padrões de Projeto
Factory

Onde foi aplicado:
Na criação de produtos.

Exemplo:

class ProdutoFactory {
  static criar(tipo) {
    const precos = {
      pastel: 5,
      caldo: 7,
      refrigerante: 4,
      suco: 6
    };

    return {
      nome: tipo,
      preco: precos[tipo]
    };
  }
}

Por que foi utilizado?
Para centralizar a criação de objetos e facilitar manutenção.

Singleton

Onde foi aplicado:
No controle do pedido.

Exemplo:

class Pedido {
  constructor() {
    if (Pedido.instancia) {
      return Pedido.instancia;
    }

    this.itens = [];
    Pedido.instancia = this;
  }
}

Por que foi utilizado?
Para garantir que exista apenas um pedido ativo no sistema.


