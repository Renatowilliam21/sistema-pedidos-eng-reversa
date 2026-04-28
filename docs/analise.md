# PRÁTICA ORIENTADA 01
**Arquitetura de Sistemas – IFCE Campus Boa Viagem**

## Tema
Engenharia Reversa e Análise de Design de Software

---

## Parte 1 – Compreensão do Sistema

O sistema tem como objetivo gerenciar pedidos da pizzaria Tropykaly, permitindo ao usuário navegar por categorias de produtos, informar a quantidade e visualizar o total da compra com taxa de entrega. O sistema possui frontend em HTML/CSS/JavaScript e backend em PHP, comunicando-se via API REST.

As principais funcionalidades do sistema são:

- Adicionar produtos ao pedido (Pizzas, Lanches, Bebidas)
- Listar os itens adicionados
- Calcular o valor total com taxa de entrega
- Aplicar desconto ao finalizar o pedido
- Enviar o resumo do pedido via WhatsApp
- Armazenar o pedido entre requisições utilizando sessão PHP

A interação do usuário ocorre por meio de:

- Um seletor de produtos por categoria
- Um campo de entrada para quantidade
- Botões para adicionar itens, finalizar o pedido e enviar via WhatsApp
- Visualização dinâmica da lista de itens, subtotal, taxa de entrega e total

---

## Parte 2 – Identificação de Elementos

### Funções principais (Frontend)
- `adicionar()`: envia um item ao backend via POST
- `atualizarLista()`: busca os itens do backend e atualiza a interface
- `finalizar()`: solicita ao backend a finalização do pedido
- `enviarWhatsApp()`: monta a mensagem com os itens e abre o WhatsApp

### Endpoints da API (Backend)
- `action=adicionar`: recebe produto e quantidade via POST e adiciona ao pedido
- `action=listar`: retorna os itens e o total do pedido em JSON
- `action=finalizar`: finaliza o pedido, aplica desconto e salva

### Dados manipulados
- `itens`: array de objetos representando os itens do pedido
- `total`: valor numérico do subtotal
- `taxa`: taxa de entrega fixa de R$ 5,00

Cada item possui:
- `produto`
- `quantidade`
- `preco`

### Entidades identificadas
- `Produto`
- `ItemPedido`
- `Pedido`

---

## Parte 3 – Arquitetura

O sistema possui arquitetura em camadas, separando frontend, backend e modelos de dados.

**Estrutura:**
- **Frontend**: HTML, CSS e JavaScript puro, responsável pela interface e comunicação com a API
- **Backend**: PHP organizado em controllers, services, models e repositories
- **Comunicação**: API REST via fetch (JavaScript) consumindo endpoints PHP

**Padrão arquitetural:** O sistema segue uma arquitetura em camadas com separação entre interface, lógica de negócio e dados.

**Classificação:**
- Pequeno porte
- Cliente-Servidor
- Estrutura orientada a objetos no backend

---

## Parte 4 – Modelagem (Diagrama de Classes)

### Classes identificadas:

**Produto**
- Atributos: `nome`, `preco`
- Métodos: `getNome()`, `getPreco()`

**ItemPedido**
- Atributos: `produto`, `quantidade`, `preco`
- Métodos: `getProduto()`, `getQuantidade()`, `getPreco()`, `getSubtotal()`

**Pedido**
- Atributos: lista de itens, total
- Métodos: `adicionarItem()`, `getItens()`, `getTotal()`

**PedidoSingleton**
- Garante instância única do pedido
- Métodos: `getInstance()`, `getPedido()`, `adicionar()`, `limpar()`

**ProdutoFactory**
- Responsável pela criação de objetos do tipo Produto (Pizza, Lanche, Bebida)

**PedidoController**
- Métodos: `listar()`, `adicionar()`, `finalizar()`

### Relacionamentos:
- Um `Pedido` possui vários `ItemPedido`
- Um `ItemPedido` possui um `Produto`
- `PedidoSingleton` gerencia a instância de `Pedido`
- `ProdutoFactory` cria objetos `Produto`
- `PedidoController` utiliza `PedidoSingleton` e `ProdutoFactory`

*(O diagrama UML deve ser inserido como imagem ou link)*

---

## Parte 5 – Análise de Problemas

### Coesão:
As classes do backend apresentam boa coesão, com responsabilidades bem definidas por camada.

### Acoplamento:
O frontend ainda possui acoplamento com a URL base do backend (`BASE_URL`), mas a comunicação é feita de forma desacoplada via API REST.

### Separação de responsabilidades:
Há separação clara entre:
- Interface (HTML/CSS/JS)
- Lógica de negócio (Controllers e Services)
- Persistência de dados (Repositories e Sessão PHP)

### Persistência:
O pedido é mantido entre requisições por meio de sessão PHP (`$_SESSION`), utilizando `serialize` e `unserialize` do objeto `Pedido`.

### Organização geral:
- Código organizado em múltiplos arquivos e pastas
- Backend segue estrutura MVC
- Frontend simples e direto, sem frameworks

---

## Parte 6 – Propostas de Melhoria

- Substituir sessão PHP por banco de dados para maior confiabilidade
- Adicionar autenticação para múltiplos usuários simultâneos
- Criar feedback visual no frontend ao adicionar itens (ex: loading)
- Implementar remoção de itens individuais do pedido
- Separar o número do WhatsApp em configuração externa
- Adicionar tratamento de erros mais robusto no frontend
- Tornar a taxa de entrega dinâmica por região

---

## Parte 7 – Refatoração

Durante a refatoração do sistema foram realizadas melhorias estruturais com o objetivo de aumentar a organização, reduzir o acoplamento e melhorar a manutenção do código.

As principais alterações foram:

- **Migração para arquitetura cliente-servidor**: o sistema passou de um único arquivo JavaScript para uma estrutura com frontend e backend separados
- **Criação de classes no backend**: foram criadas as classes `Produto`, `ItemPedido` e `Pedido`, representando as principais entidades do sistema
- **Criação de API REST**: o backend passou a expor endpoints consumidos pelo frontend via fetch
- **Persistência via sessão PHP**: os dados do pedido passaram a ser mantidos entre requisições utilizando `$_SESSION`
- **Separação de responsabilidades**: a lógica de negócio foi separada da manipulação do DOM
- **Organização em camadas**: o backend foi dividido em `controllers`, `services`, `models` e `repositories`
- **Adição de taxa de entrega**: o sistema passou a calcular e exibir a taxa de entrega separadamente do subtotal
- **Manutenção do sistema funcional**: o sistema permaneceu funcionando após as alterações

---

## Parte 8 – Aplicação de Padrões de Projeto

### Factory
O padrão Factory foi aplicado na criação de produtos por meio da classe `ProdutoFactory`.

**Onde foi aplicado:** Na criação de objetos do tipo `Produto` (Pizza, Lanche, Bebida).

**Por que foi utilizado:** Centralizou a criação dos produtos e a definição de preços, eliminando estruturas condicionais espalhadas no código e facilitando a adição de novos produtos.

### Singleton
O padrão Singleton foi aplicado na classe `PedidoSingleton`.

**Onde foi aplicado:** No controle do pedido do sistema.

**Por que foi utilizado:** Para garantir que exista apenas uma instância do pedido durante toda a execução, evitando inconsistências e centralizando o controle dos dados. A instância é persistida entre requisições HTTP por meio de sessão PHP.

### Observer
O padrão Observer foi aplicado por meio das classes `Subject` e `LoggerObserver`.

**Onde foi aplicado:** Na finalização do pedido dentro do `PedidoController`.

**Por que foi utilizado:** Para notificar observadores sobre eventos do pedido sem acoplar diretamente o controller à lógica de log.

### Strategy
O padrão Strategy foi aplicado por meio da classe `DescontoProgressivo`.

**Onde foi aplicado:** No cálculo do desconto durante a finalização do pedido.

**Por que foi utilizado:** Para permitir a troca da estratégia de desconto sem alterar o controller, facilitando a adição de novos tipos de desconto no futuro.

---

## Conclusão

Com a refatoração e a aplicação dos padrões de projeto, o sistema passou a apresentar melhor organização, menor acoplamento, maior coesão e maior facilidade de manutenção. A migração para uma arquitetura cliente-servidor com backend em PHP orientado a objetos aproximou o sistema de boas práticas de desenvolvimento de software.
