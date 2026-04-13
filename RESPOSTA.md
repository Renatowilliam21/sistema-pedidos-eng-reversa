## Parte 1 – Compreens ̃ao do Sistema
  1. Qual  ́e o objetivo do sistema?
     Anotar pedidos de lanche e bebidas
  3. Quais são suas principais funcionalidades?
     Escolher um pedido do menuu, adicionar a quantidade do pedido, adicionar mais pedidos caso eu queria e finalizar a compra
  5. Como o usuário interage com o sistema?
     Com botões interativos, como Adicionar e Finalizar Pedido

## Parte 2 – Identifica ̧c ̃ao de Elementos
  1. Quais são as principais funcões do sistema?
     Escolher pedido, adicionar, calcular pedido e finalizar
  2. Quais dados são manipulados?
     Os dados do pedidos, Pastel, caldo e etc, cada pedido tem um preço e para calcular o total, e a quantidade dele
  3. Quais entidades podem ser extraídas (ex: classes)?
     Pedido, Carrinho e notaFiscal

## Parte 3 – Arquitetura
  1. O sistema possui arquitetura definida? Justifique.
     Não possui, os arquivos estão todos na mesma pasta
     Projeto_1/
      │
      ├── index.html               
      ├── README.md
      ├── script.js
      ├── style.css
  3. Ele segue algum padrão (MVC, camadas, etc.)?
     Não, o sistema não possui nenhuma separação entre os arquivos de tipos diferentes
  5. Como você classificaria esse sistema?
     Monolítica

## Parte 4 – Modelagem
  Elabore um Diagrama de Classes (UML) contendo:
  • Classes identificadas
  • Atributos
  • M ́etodos
  • Relacionamentos
  Classe: Pedido
  Atributos: nome, preco
  Métodos: descricao()

  Classe: Carrinho
  Atributos: listaPedidos[], valorTotal
  Métodos: adicionarPedido(), calcularTotal()
  Relacionamento: 1 Carrinho possui vários Pedidos.

## Parte 5 – Análise de Problemas
  Identifique e explique problemas relacionados a:
  Separação de responsabilidades: O erro, os cálculos e a interface estão misturadas no mesmo lugar
  Coesão: Essa função tem baixa coesão, porque ela faz muitas tarefas executarem ao mesmo tempo em uma memsma função
  Acoplamento: O sistema apresenta um alto acoplamento, já que a lógica do javascript está linkada diretamente aos elementos visuais da tela. Se o design da tela mudar, o cálculo quebra
  Duplicação de código: A estrutura do código não favorece a reutilização do código, o que acaba gerando repetições desnecessárias para processar coisas diferentes
  Organização geral: Desorganização de arquivos, funções tendo muitas tarefas que executam tudo ao mesmo tempo

## Parte 6 – Propostas de Melhoria
  Sugira melhorias para o sistema:
  Organização em camadas: pages (HTML), styles (CSS), src (JavaScript)
  Melhorias no código: Seperar funcionabilidades pelo nome, não ser apenas script.js
  Criação de classses: Pedido, Carrinho e notaFiscal
  Aplicação de padrões de projeto: Singleton, esse padrão serve para garantir que o sistema crie apenas uma única cópia de uma classe durante todo o tempo em que o programa estiver rodando

## Parte 7 - Refatora ̧c ̃ao
  Refatore parte do sistema, aplicando:
  Separei as responsabilidades. A parte dos cálculos e dados foi jogada para as classes Pedido e Carrinho, 
  e as funções da interface ficaram separadas mexendo só no HTML. Tirei as variáveis globais que estavam soltas e arrumei os cálculos que estavam repetidos

## Parte 8 – Aplica ̧c ̃ao de Padr ̃oes de Projeto
  Implemente no sistema os seguintes padr ̃oes de projeto:
  • Factory: Na criação dos produtos (itens do cardápio)
  • Singleton
  Requisitos:
  • O padr ̃ao Factory deve ser utilizado para cria ̧c ̃ao de objetos do sistema (ex: produtos
  ou pedidos)
  
  • O padr ̃ao Singleton deve ser utilizado para garantir uma  ́unica instˆancia (ex: con-
  trole de pedidos ou acesso a dados)
  
  Explique:
  • Onde cada padrão foi aplicado: No controle do Carrinho/Pedido
  • Por que ele foi utilizado: Para garantir que todos os itens escolhidos pelo cliente vão para o mesmo lugar, mantendo uma única fonte de verdade para os cálculos do pedido atual
    
