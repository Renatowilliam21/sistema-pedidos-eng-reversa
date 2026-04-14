1. QUAL É O OBJETIVO DO SISTEMA?

O objetivo do sistema é permitir que clientes visualizem o cardápio e façam pedidos online de pizzas, sanduíches, hambúrgueres, bebidas e porções.
Ele funciona como uma vitrine digital da lanchonete/pizzaria, facilitando a escolha dos produtos e o acesso ao carrinho de compras.

2. Quais funcionalidades ele oferece?

O sistema oferece várias funções, como:

Exibição do cardápio com categorias e produtos
Visualização de banners promocionais
Acesso ao carrinho de compras
Exibição do subtotal e quantidade de itens no carrinho
Listagem rápida dos itens adicionados
Acesso à página “Ver Carrinho”
Contato direto com a loja via WhatsApp e Instagram
Acesso ao painel do sistema para administração
3. Como o usuário interage com o sistema?

O usuário interage principalmente pela interface web. Ele pode:

Entrar na página inicial.
Ver os banners e o cardápio.
Escolher uma categoria, como pizza, sanduíche, hambúrguer ou bebida.
Clicar em um produto para abrir seus detalhes.
Adicionar itens ao carrinho.
Conferir o subtotal e os itens selecionados.
Ir para a página do carrinho para finalizar o pedido.
4. Como os produtos estão organizados?

Os produtos estão organizados em categorias e abas, o que facilita a navegação. No código aparecem, por exemplo:

Categorias
Pizza P, M, G e GG
Sanduíches
Hambúrgueres artesanais
Sucos
Vitaminas
Refrigerantes
Porções
Combos
Produtos agrupados com nome, imagem, descrição e preço
Promoções
Espaço reservado para ofertas, embora no trecho enviado esteja vazio

Cada produto mostra normalmente:

Imagem
Nome
Descrição
Preço
Link para detalhes ou adicionais



Parte 2 – ANÁLISE DE ARQUITETURA
1. Tipo de arquitetura

O sistema utiliza uma arquitetura web cliente-servidor.
Nesse tipo de arquitetura, o cliente (navegador do usuário) acessa a interface do sistema, enquanto o servidor processa as requisições e retorna os dados necessários.

2. Possível divisão em camadas

O sistema aparenta seguir uma arquitetura em três camadas:

Camada de apresentação (Front-end)
Responsável pela interface que o usuário visualiza e utiliza.
Tecnologias identificadas no código:

HTML
CSS
Bootstrap
JavaScript
jQuery

3. Existência de separação de responsabilidades

Sim, existe uma separação básica de responsabilidades no sistema.

HTML e CSS cuidam da estrutura e aparência da página.
JavaScript e jQuery tratam da interatividade e comunicação com o servidor.
PHP processa os dados e executa operações no servidor.

Essa divisão permite que cada parte do sistema tenha uma função específica, facilitando manutenção, organização e desenvolvimento do sistema.

Parte 3 – ANÁLISE DE DESIGN
1. Coesão

No sistema analisado, a coesão é moderada, pois cada parte do código possui uma função específica. Por exemplo:

HTML é responsável pela estrutura da página.
CSS controla a aparência visual.
JavaScript gerencia interações do usuário, como atualização do carrinho.
PHP processa dados no servidor.

Um exemplo de função específica é o script que atualiza o carrinho de compras, responsável apenas por listar os itens do carrinho.

Isso mostra que partes do sistema possuem funções relativamente bem definidas.

2. Acoplamento

No sistema analisado, o acoplamento é moderado, pois o front-end depende de arquivos específicos do back-end para funcionar, como no caso da requisição AJAX para listar os itens do carrinho.

3. Separação de responsabilidades

Existe uma separação básica de responsabilidades no sistema.

Cada tecnologia utilizada possui uma função diferente:

HTML → estrutura da página e organização dos elementos.
CSS / Bootstrap → estilização e layout visual.
JavaScript / jQuery → interações e comunicação com o servidor.
PHP → processamento de dados e lógica do sistema.

Parte 4 – PADRÕES DE PROJETO
1. O sistema aparenta utilizar padrões?

Não é possível identificar claramente a utilização explícita de padrões de projeto. O sistema parece seguir uma estrutura simples de aplicação web com HTML, CSS, JavaScript e PHP.

No entanto, existem indícios de organização que podem se aproximar de alguns padrões, como a separação entre interface (front-end) e processamento no servidor (back-end).

2. Onde poderiam existir Factory, Singleton e MVC?

Factory
O padrão Factory poderia existir na criação de objetos do sistema, como:

criação de produtos
criação de pedidos
criação de conexões com banco de dados

Singleton
O padrão Singleton poderia ser usado na conexão com o banco de dados, garantindo que apenas uma instância da conexão seja utilizada durante a execução do sistema.

Isso evita múltiplas conexões desnecessárias e melhora o desempenho.

MVC (Model–View–Controller)
O sistema aparenta ter uma estrutura que poderia se aproximar do padrão MVC, mesmo que não esteja formalmente organizado.

Possível divisão:

Model: arquivos responsáveis por acessar o banco de dados (produtos, pedidos, carrinho).
View: páginas HTML que exibem o cardápio e os produtos.
Controller: scripts PHP que processam requisições, como adicionar itens ao carrinho ou listar produtos.

3. Onde poderiam ser aplicados?

Os padrões poderiam ser aplicados da seguinte forma:

Factory: na criação de objetos de produtos ou pedidos dentro do sistema.
Singleton: na classe responsável pela conexão com o banco de dados.
MVC: reorganizando o sistema em três partes principais (Model, View e Controller) para melhorar a organização e manutenção do código.


