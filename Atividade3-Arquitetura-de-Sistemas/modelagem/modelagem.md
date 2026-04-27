Parte 6- MODELAGEM DO SISTEMA
1. Identificação de Entidades

Entidades principais:

Produto – representa os itens vendidos, como pizzas, sanduíches, bebidas e porções.
Categoria – organiza os produtos em grupos (ex: pizzas, hambúrgueres, sucos).
Pedido – representa a compra realizada pelo cliente.
ItemPedido – representa cada produto que faz parte de um pedido.
Carrinho – armazena temporariamente os produtos escolhidos pelo usuário antes da finalização.
Cliente – representa o usuário que realiza o pedido.

2. Definição de Classes
Classe: Produto

Atributos

idProduto
nome
descrição
preço
imagem
categoria

Métodos

exibirProduto()
obterPreço()
mostrarDetalhes()
Classe: Categoria

Atributos

idCategoria
nome
descrição

Métodos

listarProdutos()
adicionarProduto()
Classe: Pedido

Atributos

idPedido
data
total
status

Métodos

calcularTotal()
adicionarItem()
finalizarPedido()
Classe: ItemPedido

Atributos

produto
quantidade
subtotal

Métodos

calcularSubtotal()
Classe: Carrinho

Atributos

listaItens
total

Métodos

adicionarProduto()
removerProduto()
calcularTotal()
limparCarrinho()
Classe: Cliente

Atributos

nome
telefone
endereço

Métodos

realizarPedido()
atualizarDados()

Justificativa

A classe Cliente representa a pessoa que navega no sistema e faz pedidos. Um cliente pode realizar vários pedidos, por isso a multiplicidade é 1 para 0..*.

A classe Pedido representa a compra finalizada. Um pedido é formado por um ou mais itens, então ele se relaciona com ItemPedido na multiplicidade 1 para 1..*.

A classe Carrinho representa os produtos escolhidos antes da finalização. Ela contém vários itens, por isso a multiplicidade é 1 para 1..* com ItemPedido.

A classe ItemPedido existe para guardar cada produto selecionado com sua quantidade e subtotal. Cada item do pedido referencia um único Produto, então a relação é 1 para 1.

A classe Produto representa os alimentos e bebidas exibidos na interface. Como os produtos aparecem agrupados no cardápio, foi criada a classe Categoria, que organiza os produtos. Assim, uma categoria pode conter vários produtos, e cada produto pertence a uma categoria.

Essa modelagem faz sentido porque o sistema mostra claramente uma estrutura de cardápio, carrinho e finalização de pedido, mesmo sem ver o código interno.


