### Parte 4 – Padrões de Projeto

4.1 - Sim, o sistema demonstra utilizar o padrão MVC (Model-View-Controller) como sua arquitetura base. A separação entre a interface do usuário, a lógica de controle e a manipulação de dados é perceptível durante a navegação. No entanto, em uma análise externa, não foram identificados indícios claros da implementação imediata de outros padrões, como Factory ou Singleton, embora sua aplicação seja perfeitamente cabível na estrutura do projeto.

4.2 - Estes padrões se localizam (ou se localizariam) em diferentes camadas da aplicação:
    
    **MVC:** Já está presente na estrutura global. A View reside nas páginas web (HTML/CSS), o Controller gerencia as rotas e requisições, e o Model lida com as regras de negócio e o banco de dados.

    **Factory:** Poderia existir no submódulo de gestão de produtos. Em vez de instanciar cada item manualmente, uma "fábrica" seria responsável por criar objetos de diferentes categorias (pizzas, bebidas, hambúrgueres) de forma padronizada.

    **Singleton** Poderia ser encontrado na gestão da sessão de compra. Ele garantiria que o sistema utilize uma única instância do "Carrinho de Compras" ou da "Conexão com o Banco de Dados" durante toda a execução, evitando redundâncias.

4.3 - A aplicação prática traria os seguintes benefícios ao sistema:

    **MVC:** É aplicado na interação do usuário; quando um item é adicionado ao carrinho, o Controller processa a ação, atualiza o Model (o estado do pedido) e a View reflete essa mudança instantaneamente para o usuário.

    **Factory:** Seria aplicado na customização dos pedidos. Ao selecionar diferentes sabores de pizza ou ingredientes de um sanduíche, o padrão Factory facilitaria a criação desses objetos complexos sem expor a lógica de criação ao restante do código.

    **Singleton:** Seria aplicado na segurança e integridade dos dados do pedido. Ao garantir uma instância única da lista de compras, previnem-se bugs onde o cliente poderia gerar, acidentalmente, múltiplos pedidos simultâneos ou perder a sincronia dos itens selecionados.

