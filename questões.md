ATIVIDADE 2 - ARQUITETURA DE SISTEMAS - ENGENHARIA REVERSA


Parte 1 – Compreensão do Sistema 

1. O objetivo do sistema é permitir o registro e cálculo de pedidos de produtos de uma lanchonete. 

Ele funciona como um sistema simples de controle de pedidos, permitindo que o usuário: 

selecione produtos  

informe a quantidade  

visualize os itens adicionados  

calcule o valor total do pedido  

aplique descontos e taxas  

finalize o pedido 

 

2. As principais funcionalidades do sistema são: 

Adicionar produtos ao pedido  

o usuário escolhe um produto e a quantidade.  

Exibir a lista de itens  

os produtos adicionados aparecem em uma lista.  

Calcular o valor total  

o sistema soma os subtotais dos itens.  

Aplicar desconto  

pedidos acima de R$50 recebem 10% de desconto  

pedidos acima de R$100 recebem 20%.  

Aplicar taxa  

o sistema adiciona uma taxa de 5%.  

Remover o último item  

o usuário pode remover o último produto adicionado.  

Finalizar o pedido  

o sistema calcula o valor final e limpa o pedido.  

Salvar dados no navegador  

o total e o último pedido são salvos usando localStorage. 

 

 

3. O usuário interage por meio da interface HTML no navegador. 

A interação ocorre da seguinte forma: 

O usuário seleciona um produto em um campo (select).  

Digita a quantidade.  

Clica em um botão para adicionar o item.  

Os itens aparecem em uma lista na tela.  

O sistema mostra o valor total atualizado.  

O usuário pode:  

remover itens  

finalizar o pedido.  

Essa interação acontece através de eventos do JavaScript ligados aos botões da interface. 

 

 

Parte 2 – Identificação de Elementos 

1. As principais funções identificadas no código são: 

adicionar() 
Adiciona um produto ao pedido.  

atualizarLista() 
Atualiza o sistema após alterações no pedido.  

calcularTotal() 
Soma o valor de todos os itens.  

renderizarLista() 
Mostra os itens na interface HTML.  

salvarTotal() 
Salva o total no localStorage.  

finalizar() 
Calcula o valor final do pedido e aplica desconto e taxa.  

calcularDesconto() 
Calcula o desconto baseado no valor total.  

removerUltimo() 
Remove o último item adicionado.  

limparTudo() 
Reinicia o sistema e limpa a lista de itens.  

 

2. Quais dados são manipulados? 

O sistema manipula principalmente os seguintes dados: 

Produtos 

pastel  

caldo  

refrigerante  

suco  

Preço dos produtos 

Armazenados no objeto: 

precos 

Itens do pedido 

Armazenados no array: 

itens 

Cada item possui: 

produto 
quantidade 
subtotal 

Total do pedido 

Armazenado na variável: 

total 

Dados salvos no navegador 

total do pedido  

último pedido  

Salvos usando: 

LocalStorage 

 

3. Se o sistema fosse transformado em programação orientada a objetos, poderíamos extrair as seguintes entidades: 

Produto 

nome  

preço  

ItemPedido 

produto  

quantidade  

subtotal  

Pedido 

lista de itens  

total  

cálculo de desconto  

cálculo de taxa  

SistemaPedidos 

adicionar item  

remover item  

finalizar pedido  

atualizar interface  

Essas entidades poderiam virar classes em um sistema maior. 

 

Parte 3 – Arquitetura 

1. O sistema não possui uma arquitetura formal bem definida. 

Ele é um sistema simples onde: 

a lógica de negócio  

a manipulação da interface  

e o armazenamento de dados  

estão misturados no mesmo arquivo JavaScript. 

Isso é comum em aplicações pequenas ou didáticas. 

 

2. Ele segue algum padrão (MVC, camadas, etc.)? 

O sistema não segue completamente um padrão arquitetural como MVC, mas possui uma separação básica de responsabilidades: 

View 

index.html  

style.css  

Responsáveis pela interface visual. 

Controller / Lógica 

script.js  

Responsável por: 

manipular eventos  

calcular valores  

atualizar a interface.  

Portanto ele se aproxima de um modelo simples semelhante ao MVC, mas não está completamente estruturado nesse padrão. 

 

3. Como você classificaria esse sistema? 

Esse sistema pode ser classificado como: 

Aplicação Web simples  

Sistema de gerenciamento de pedidos básico  

Aplicação front-end baseada em JavaScript  

Sistema monolítico pequeno  

Ele é um sistema voltado para aprendizado de lógica de programação e manipulação do DOM. 


Parte 5 – Análise de Problemas
• Coesão

Algumas funções do sistema têm responsabilidades bem definidas, como calcularTotal() e calcularDesconto(). Porém outras funções, como finalizar(), realizam várias tarefas ao mesmo tempo, como calcular valores, mostrar mensagem, salvar dados e limpar o sistema. Isso reduz a coesão e pode dificultar a manutenção do código.

• Acoplamento

O sistema possui um certo nível de acoplamento, pois as funções dependem diretamente de elementos da interface HTML usando document.getElementById() e também utilizam variáveis globais como itens e total. Isso faz com que as partes do sistema fiquem muito dependentes entre si.

• Separação de responsabilidades

A separação de responsabilidades não é muito clara, pois a lógica do sistema, a manipulação da interface e o armazenamento de dados estão todos no mesmo arquivo JavaScript. Em sistemas maiores, o ideal seria separar essas responsabilidades em diferentes módulos.

• Duplicação de código

Na versão inicial do sistema havia duplicação no cálculo do total. Isso poderia causar inconsistências no futuro. Esse problema foi corrigido centralizando o cálculo na função calcularTotal().

• Organização geral

O sistema é simples e funciona corretamente, porém poderia ter uma organização melhor. O uso de variáveis globais e a falta de divisão do código em módulos ou classes pode dificultar a manutenção caso o sistema cresça.

Parte 6 – Propostas de Melhoria
Organização em camadas

Uma melhoria seria dividir o sistema em camadas, separando a interface (HTML e CSS), a lógica do sistema (JavaScript) e os dados. Isso tornaria o código mais organizado.

Criação de classes

O sistema poderia utilizar programação orientada a objetos. Por exemplo, poderiam ser criadas classes como Produto, ItemPedido e Pedido, responsáveis por organizar melhor os dados e as operações do sistema.

Aplicação de padrões de projeto

O sistema poderia seguir um padrão como MVC (Model–View–Controller), separando a lógica do sistema, os dados e a interface. Isso facilita manutenção e evolução do software.

Melhorias no código

Algumas melhorias possíveis seriam reduzir o uso de variáveis globais, dividir o código em arquivos menores e organizar melhor as funções para que cada uma tenha uma única responsabilidade.

 

FACTORY
O padrão Factory foi aplicado na criação dos objetos de produto dentro do sistema.
 
O Factory foi utilizado para centralizar a criação dos objetos, evitando que diferentes partes do código precisem saber como construir esses objetos.


APLICAÇÃO DE PADRÕES DE PROJETO

SINGLETON
O padrão Singleton foi aplicado na classe PedidoManager, que é responsável por gerenciar o pedido do usuário.

O Singleton foi utilizado para garantir que exista apenas uma instância responsável pelo controle do pedido durante a execução do sistema.


PERGUNTAS NORTEADORAS

O sistema está bem organizado?

O sistema tem uma organização simples e funciona, mas a maior parte da lógica está concentrada em um único arquivo JavaScript, o que pode dificultar a manutenção.

Existe separação de responsabilidades?

Existe parcialmente. Algumas funções têm tarefas específicas, mas a lógica do sistema e a manipulação da interface ainda estão misturadas.

O código é reutilizável?

Em parte. Algumas funções podem ser reutilizadas, mas o uso de variáveis globais e a dependência do HTML limitam essa reutilização.

Onde estão os principais problemas?

Os principais problemas são o uso de variáveis globais, pouca separação de responsabilidades e falta de uma arquitetura mais estruturada.

Como melhorar a arquitetura?

Separar melhor as responsabilidades, organizar o código em camadas e utilizar classes ou padrões de projeto para tornar o sistema mais organizado e fácil de manter.
 
