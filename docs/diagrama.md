# Diagrama de Classes

\`\`\`mermaid
classDiagram

    class Produto {
        -String nome
        -float preco
        +getNome() String
        +getPreco() float
    }

    class ItemPedido {
        -String produto
        -int quantidade
        -float preco
        +getProduto() String
        +getQuantidade() int
        +getPreco() float
        +getSubtotal() float
        +jsonSerialize() array
    }

    class Pedido {
        -int id
        -array itens
        -float total
        +getId() int
        +adicionarItem(item) void
        +calcularTotal() void
        +getTotal() float
        +getItens() array
    }

    class PedidoSingleton {
        -static instance
        -Pedido pedido
        +getInstance() Pedido
        +getPedido() Pedido
        +adicionar(item) void
        +limpar() void
    }

    class ProdutoFactory {
        +criar(tipo) Produto
    }

    class DescontoStrategy {
        <<interface>>
        +calcular(total) float
    }

    class DescontoProgressivo {
        +calcular(total) float
    }

    class SemDesconto {
        +calcular(total) float
    }

    class Subject {
        -array observers
        +addObserver(observer) void
        +notify(pedido) void
    }

    class Observer {
        <<interface>>
        +update(pedido) void
    }

    class LoggerObserver {
        +update(pedido) void
    }

    class PedidoRepository {
        -string file
        +salvar(pedido) void
        +listar() array
    }

    class PedidoController {
        -Pedido pedido
        -PedidoRepository repo
        -DescontoStrategy desconto
        +listar() void
        +adicionar(tipo, quantidade) void
        +finalizar() void
    }

    Pedido "1" --> "*" ItemPedido : contém
    ItemPedido --> Produto : representa
    PedidoSingleton --> Pedido : gerencia
    ProdutoFactory --> Produto : cria
    DescontoProgressivo ..|> DescontoStrategy : implementa
    SemDesconto ..|> DescontoStrategy : implementa
    LoggerObserver ..|> Observer : implementa
    Subject --> Observer : notifica
    PedidoController --> PedidoSingleton : usa
    PedidoController --> ProdutoFactory : usa
    PedidoController --> DescontoStrategy : usa
    PedidoController --> Subject : usa
    PedidoController --> PedidoRepository : usa
\`\`\`
