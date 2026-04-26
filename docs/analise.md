PRÁTICA ORIENTADA 01

Arquitetura de Sistemas – IFCE Campus Boa Viagem
Tema: Engenharia Reversa e Análise de Design de Software

Parte 1 – Compreensão do Sistema
O sistema tem como objetivo gerenciar pedidos de uma pastelaria, permitindo ao usuário selecionar produtos, informar a quantidade e visualizar o total da compra.
As principais funcionalidades do sistema são:
Adicionar produtos ao pedido
Listar os itens adicionados
Calcular o valor total
Aplicar desconto e taxa ao finalizar o pedido
Armazenar informações no navegador utilizando localStorage
A interação do usuário ocorre por meio de:
Um seletor de produtos
Um campo de entrada para quantidade
Botões para adicionar itens e finalizar o pedido
Visualização dinâmica da lista de itens e do total

Parte 2 – Identificação de Elementos
Funções principais
adicionar(): adiciona um item ao pedido
atualizarLista(): atualiza a interface e recalcula o total
salvarTotal(): salva o total no localStorage
finalizar(): calcula o total final com desconto e taxa
limparTudo(): reseta o sistema
removerUltimo(): remove o último item
calcularTotal(): calcula o total (função duplicada)
Dados manipulados
itens: array de objetos representando os itens do pedido
total: valor numérico do total
Cada item possui:
produto
quantidade
subtotal
Entidades identificadas
Mesmo sem orientação a objetos, é possível identificar:
Produto
ItemPedido
Pedido

Parte 3 – Arquitetura
O sistema não possui uma arquitetura bem definida.
Justificativa:
Toda a lógica está concentrada em um único arquivo JavaScript
Não há separação entre interface, lógica de negócio e dados
O HTML está diretamente acoplado às funções JavaScript por meio de eventos inline
Padrão arquitetural: O sistema não segue padrões como MVC ou arquitetura em camadas.
Classificação:
Pequeno porte
Monolítico
Estrutura procedural

Parte 4 – Modelagem (Diagrama de Classes)
Classes identificadas:
Produto
Atributos:
nome
preco
ItemPedido
Atributos:
produto
quantidade
subtotal
Pedido
Atributos:
lista de itens
total
Métodos:
adicionarItem()
calcularTotal()
finalizarPedido()
Relacionamentos:
Um Pedido possui vários ItemPedido
Um ItemPedido possui um Produto
(O diagrama UML deve ser inserido como imagem ou link)

Parte 5 – Análise de Problemas
Coesão:
As funções apresentam baixa coesão, pois executam múltiplas responsabilidades. Exemplo: atualizarLista() manipula o DOM, calcula o total e salva dados.
Acoplamento:
O sistema possui alto acoplamento, com dependência direta do DOM dentro das funções.
Separação de responsabilidades:
Não há separação clara entre:
Interface
Lógica de negócio
Persistência de dados
Duplicação de código:
Existe duplicação na lógica de cálculo do total:
A função calcularTotal() não é utilizada corretamente
O cálculo também é realizado dentro de atualizarLista()
Organização geral:
Código concentrado em um único arquivo
Ausência de modularização
Baixa legibilidade e manutenção dificultada

Parte 6 – Propostas de Melhoria
Separar o sistema em camadas (interface, lógica de negócio e dados)
Criar classes para estruturar o sistema (Produto, ItemPedido e Pedido)
Criar funções menores e mais específicas
Remover acesso direto ao DOM da lógica de negócio
Centralizar o cálculo do total em uma única função
Organizar o código em múltiplos arquivos
Melhorar nomes de funções e variáveis
Preparar o sistema para aplicação de padrões de projeto

Parte 7 – Refatoração
Durante a refatoração do sistema foram realizadas melhorias estruturais com o objetivo de aumentar a organização, reduzir o acoplamento e melhorar a manutenção do código.
As principais alterações foram:
Criação de estrutura modular:
O sistema foi reorganizado em múltiplos arquivos dentro da pasta src, separando responsabilidades em models, services, factories e app.js.
Criação de classes:
Foram criadas as classes Produto, ItemPedido e Pedido, representando as principais entidades do sistema.
Remoção de variáveis globais:
As variáveis globais itens e total foram eliminadas, sendo substituídas por um controle centralizado na classe Pedido.
Separação de responsabilidades:
A lógica de negócio foi separada da manipulação do DOM, ficando cada parte responsável por sua função.
Melhoria das funções:
As funções foram reorganizadas para serem mais coesas e específicas.
Organização do código:
O sistema passou a ser dividido em múltiplos arquivos, facilitando a leitura e manutenção.
Manutenção do sistema funcional:
O sistema permaneceu funcionando após as alterações, conforme exigido.

Parte 8 – Aplicação de Padrões de Projeto
Factory:
O padrão Factory foi aplicado na criação de produtos por meio da classe ProdutoFactory.
Onde foi aplicado:
Na criação de objetos do tipo Produto.
Por que foi utilizado:
Antes, a definição de preços era feita por meio de estruturas condicionais espalhadas no código. Após a aplicação do padrão, a criação dos produtos passou a ser centralizada, facilitando a manutenção e a adição de novos produtos.
Singleton:
O padrão Singleton foi aplicado na classe PedidoService.
Onde foi aplicado:
No controle do pedido do sistema.
Por que foi utilizado:
Para garantir que exista apenas uma instância do pedido durante toda a execução, evitando inconsistências e centralizando o controle dos dados.

Conclusão
Com a refatoração e a aplicação dos padrões de projeto, o sistema passou a apresentar melhor organização, menor acoplamento, maior coesão e maior facilidade de manutenção, aproximando-se de boas práticas de desenvolvimento de software.
