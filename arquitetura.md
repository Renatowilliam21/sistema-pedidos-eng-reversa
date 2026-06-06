# Padrões Arquiteturais e Design Patterns

## Estruturação Baseada em MVC
Para assegurar que o sistema mantenha sua integridade à medida que novas funcionalidades sejam adicionadas, a arquitetura deve seguir firmemente o modelo MVC:
- **Camada Model:** Abriga as entidades centrais do domínio (ex: `Pedido`, `ItemPedido`, `Produto`). Aqui devem residir as validações, regras de negócio e a gestão do estado.
- **Camada View:** O front-end da aplicação, com a única responsabilidade de apresentar as informações de maneira visualmente agradável ao usuário.
- **Camada Controller:** Atua como o cérebro da operação (ex: `ProdutoController`, `PedidoController`). Eles interceptam as ações do usuário na interface, repassam as tarefas para o *Model* e retornam o resultado processado para a *View*.

## Implementação de Padrões de Projeto
Para complementar o MVC e refinar a qualidade do código, a adoção de alguns *Design Patterns* é altamente indicada:
1. **Factory Method:** Ideal para gerenciar a criação de objetos complexos. Instanciar uma "pizza meio a meio com borda" envolve lógicas muito distintas da instanciação de um "suco". Uma classe `ProdutoFactory` assumiria essa complexidade, mantendo os construtores limpos.
2. **Singleton:** Crucial para administrar instâncias que não podem se duplicar durante o fluxo de navegação. Exemplos claros incluem a gestão da conexão com o banco de dados e a sessão única do Carrinho de Compras do usuário logado.
