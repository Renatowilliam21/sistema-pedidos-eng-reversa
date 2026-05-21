    - - - - -    ANÁLISE DO SISTEMA REAL    - - - - -

1. Qual o objetivo do sistema?

    O objetivo do sistema é simplificar e agilizar o sistema de pedidos de um restaurante, sendo muito mais coveniente e organizado do que ligações como era antigamente.

2. Quais funcionalidades ele oferece?

    O sistema oferece funcionaliades diversas como: cardápio variado, carrinho de compras, modo de entrega (retirada no local ou entrega delivery), diferentes métodos de pagamentos.

3. Como o usuário interage com o sistema?

    O usário interage com o sistema através do cardapio, onde ele escolhe que refeição quer, o sabor que quer, a quantidade, etc...

    Também é possivel a interação por whatsapp e por meio presencial indo no endereço do restaurante, ambas infomações presentes no site.

4. Como os produtos estão organizados?

    Os produtos estão organizados por categoria. Separados por tamanhos (Pizzas) e variações (Esfirras salgadas e doces).

    Também possui a aba de "combos" onde estão organizados os combos de lanche disponibilizados pelo restaurante
    E a aba de promoção onde possui itens do cardápio em desconto.

    - - - - -   ANÁLISE DE ARQUITETURA  - - - - -

1. Tipo de arquitetura

    Apenas observando é provável que foi utilizado:
     O modelo MVC (Model-View-Controller) onde separa a interface (Front-end) a lógica (Back-end) e o controle de dados (Banco de dados).

     O modelo Cliente-Servidor pois o cliente solicita um item no cardápio o servidor processa a escolha, o pagamento e o tempo de entrega e guarda o pedido em um banco de dados.

     Arquitetura Orientada a Eventos, pois quando um pedido é enviado, é enviado uma confirmação para whatsapp, a comanda do pedido na cozinha é imprimido e o motoboy é notificado.

2. Possível divisão de camadas

    A divisão possivelmente deve ser separada em uma:
     Camada de apresentação: a camada onde o usuário vê e interage.

     Camada de aplicação: onde roda o código do servidor.

     Camada de dados: onde o banco de dados está instalado.

3. Existência de separação de responsabilidades

    Nesse sistema podemos observar diversos "blocos" de responsabilidades como:
     Responsabilidades do front-end: organizar a interface gráfica do site, como o cardápio, a barra de abas (combos e promoções) e a quantidade de itens no carrinho.

     Responsabilidade do back-end: Enviar dados para o servidor, como o processamento do pagamento e a impressão da comanda na cozinha.

     Responsabilidade administrativa: Sistema protegido por login onde o admin pode adicionar novos itens ao cardápio, sabores, preços etc...
     
     Responsabilidade do site em si como ser responsivo, intuitivo e que esteja funcionando em um bom estado.

    - - - - -   ANÁLISE DE DESIGN   - - - - -

1. Coesão

    O site possui uma boa coesão, seus elementos possuem objetivo direto, é intuitivo e simples. tudo esta em seu devido lugar.

2. Acoplamento 

    O sistema possui um baixo acoplamento, ou seja nenhuma parte tem dependência em outra e pode ser alterada sem causar quebra nas outras.

3. Separação de resposabilidades

    O sistema possui uma separação de resposabilidades bem clara, como o front-end onde é visível o cardápio a barra de abas o sabor do lanche etc...



