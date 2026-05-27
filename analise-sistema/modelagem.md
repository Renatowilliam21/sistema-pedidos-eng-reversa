# Diagrama de Classes - Tropykaly

\`\`\`mermaid
classDiagram

    class Produto {
        -int id
        -String nome
        -String descricao
        -float preco
        -String foto
        -Categoria categoria
        +getNome() String
        +getPreco() float
        +getCategoria() Categoria
    }

    class Categoria {
        -int id
        -String nome
        +getNome() String
        +getProdutos() Produto[]
    }

    class ItemCarrinho {
        -Produto produto
        -int quantidade
        +getSubtotal() float
        +getQuantidade() int
    }

    class Carrinho {
        -ItemCarrinho[] itens
        -float total
        +adicionarItem(item) void
        +removerItem(item) void
        +calcularTotal() float
        +limpar() void
    }

    class Cliente {
        -String nome
        -String telefone
        -String endereco
        +getNome() String
        +getTelefone() String
    }

    class Entrega {
        -String tipo
        -float taxa
        -String endereco
        +calcularTaxa() float
        +getTipo() String
    }

    class Pedido {
        -Carrinho carrinho
        -Cliente cliente
        -Entrega entrega
        -float total
        +finalizar() void
        +enviarWhatsApp() void
    }

    Categoria "1" --> "*" Produto : agrupa
    Carrinho "1" --> "*" ItemCarrinho : contém
    ItemCarrinho --> Produto : referencia
    Pedido --> Carrinho : possui
    Pedido --> Cliente : possui
    Pedido --> Entrega : possui
\`\`\`
