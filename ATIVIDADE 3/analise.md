# Parte 1 - Análise do Sistema Real 

1. Qual é o objetivo do sistema? 
O sistema tem como objetivo principal facilitar e automatizar o processo de pedidos de comida para os clientes. Ele atua como um canal de vendas direto
substituindo o atendimento presencial atravez de telefone ou mensagens

2. Quais funcionalidades ele oferece? 
Exibição de cardápio atualizado, categorização de produtos, personalização de pedido
gerenciamento de um carrinho de compras, cálculo de taxas de entrega e finalização do pedido com coleta de dados do cliente

3. Como o usuário interage com o sistema? 
A interação acontece por meio de um site. O fluxo é linear, o usuário navega pelos catálgoso de produtos, escolhe o pedido, coloca alguma observação sobre a comida,
adiciona o pedido no carrinho e, por fim avança para a tela de finalização para inserir dados de contato e endereço

4. Como os produtos estão organizados? 
Eles estão segmentados em categorias lógicas e visuais. Cada produto é representado por um card contendo informações sobre o catálogo, pizzas G, M ou P, e nelas os sabores e cada um com
nome, descrição dos ingredientes e preço

# Parte 2 - Análise de Arquitetura

Tipo de Arquitetura:  Trata-se de uma arquitetura Cliente-Servidor. Sendo um sistema web, o navegador do usuário atua como cliente consumindo serviços hospedados em um servidor remoto
Divisão em Camadas:  Podemos adiciona uma arquitetura clássica de três camadas. A camada do frontend, responsável por otimizar a interface e gerenciar as interações do usuário no navegador.
Camada do backand, onde rodam as regras de negócio, como cálculo de valor total, validação de área de entrega e disponibilidade de estoque. 
Camada do banco de dados, onde ficam armazenados o catálogo, preços e histórico de pedidos, endereços salvos.

Separação de Responsabilidades:  Sim, a própria divisão em camadas garante isso. A interface do usuário não acessa o banco de dados diretamente,
ela faz requisições para o backend, e assim faz a leitura e gravação dos dados de forma segura.

# Parte 3 - Análise de Design

Coesão:  Em um design bem estruturado, é bom que os componentes da interface tenham alta coesão. 
Por exemplo, um card com a lista de pizzas tem a única responsabilidade de exibir os dados da pizza, ele não pode calcular frete

Acoplamento:  O melhor é buscar o baixo acoplamento. 
O frontend deve ser acoplado apenas nos endpoints da API do backend, e não na tecnologia do banco de dados em si, permitindo manutenções independentes

Separação de Responsabilidades:  Notada na distinção clara entre o catálogo de exibição e o módulo financeiro/logístico

# Parte 4 - Padrões de Projeto

1. O sistema aparenta utilizar padrões?
Sim, sistemas comerciais quase sempre usam padrões de projeto estruturais e criacionais no backend e frontend para lidar com a complexidade do estado da aplicação

2/3. Onde poderiam existir Factory, Singleton e MVC?Onde poderiam ser aplicados?
Singleton: Carrinho dos pedidos. O usuário deve ter acesso a uma e apenas uma instância do carrinho durante toda a sua sessão de compra.
Utilizar múltiplos carrinhos geraria perda de dados e inconsistência no fechamento do pedido.

Factory: Bom para a criação dos objetos de produto. Uma fábrica seria responsável por instanciar a classe correta dependendo do que o usuário clica.
Uma pizza precisa de atributos complexos, escolha de 2 a 4 sabores, tipo de borda, tamanho, enquanto um refrigerante é um item simples de prateleira, apenas a quantidade.
O Factory abstrai essa complexidade da interface principal.

MVC: É o esqueleto de separação de responsabilidades. A view exibe os botões e imagens minimalistas para o cliente,
o controller intercepta a ação de "Adicionar pizza G", valida os dados e atualiza o model, e o Model guarda o estado atual dos itens e o valor total no banco.


