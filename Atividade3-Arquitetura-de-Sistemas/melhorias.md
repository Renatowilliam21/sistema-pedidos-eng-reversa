Parte 7 – PROBLEMAS IDENTIFICADOS
1. Limitações de Arquitetura

Observando o funcionamento do sistema pela interface, percebe-se que ele parece ter sido desenvolvido de forma simples, focado apenas no processo de exibição do cardápio e realização de pedidos. Isso pode indicar limitações na arquitetura, como pouca modularização ou dificuldade de integrar novos recursos, como novos métodos de pagamento, cadastro de usuários ou acompanhamento de pedidos em tempo real.

2. Alto Acoplamento

Pelo comportamento do sistema, algumas funcionalidades parecem depender diretamente umas das outras, como a navegação entre produtos, carrinho e finalização do pedido. Essa dependência pode indicar um alto acoplamento entre partes do sistema, o que pode dificultar alterações em uma funcionalidade sem impactar outras partes do sistema.

3. Dificuldade de Manutenção

Caso o sistema não possua uma boa separação entre interface, lógica e dados, a manutenção pode se tornar mais complexa. Alterações simples, como adicionar novas categorias, modificar regras de preços ou alterar o funcionamento do carrinho, podem exigir mudanças em várias partes do sistema.

4. Escalabilidade Limitada

A partir da interface, o sistema parece voltado para um único estabelecimento. Isso pode indicar dificuldades para expandir o sistema para múltiplas lojas ou para suportar um grande número de usuários simultâneos.

5. Possível Limitação na Gestão de Pedidos

Pela interface analisada, não é possível observar funcionalidades avançadas de gerenciamento de pedidos, como histórico de pedidos, acompanhamento do status ou controle de entregas, o que pode limitar a eficiência do sistema em ambientes com grande volume de pedidos.


Parte 9 – APLICAÇÃO DE PADRÕES

Nesta parte é possível propor a aplicação de alguns padrões de projeto para melhorar a organização e reutilização do sistema.

1. Padrão Factory

O Factory é um padrão utilizado para centralizar a criação de objetos. Em vez de criar objetos diretamente em várias partes do sistema, uma classe específica fica responsável por essa criação.

No sistema da pizzaria, o padrão Factory poderia ser aplicado na criação de produtos ou pedidos.

Por exemplo, ao carregar o cardápio, o sistema poderia utilizar uma classe fábrica para criar diferentes tipos de produtos, como pizzas, sanduíches, bebidas e porções.

Assim, a Factory receberia as informações do produto e retornaria o objeto correspondente.

Vantagens:

Centraliza a criação de objetos
Facilita a inclusão de novos tipos de produtos
Reduz repetição de código
Melhora a organização do sistema
2. Padrão Singleton

O Singleton é um padrão que garante que uma classe tenha apenas uma única instância durante a execução do sistema.

No sistema da pizzaria, o Singleton poderia ser aplicado principalmente na conexão com o banco de dados.

Dessa forma, todo o sistema utilizaria a mesma conexão, evitando criar várias conexões diferentes ao mesmo tempo.

Outra possível aplicação seria no gerenciamento do carrinho de compras, garantindo que exista apenas um carrinho ativo para cada sessão de usuário.


Parte 10 – REFLEXÃO CRÍTICA
1. É possível modelar um sistema sem ver o código?
Sim. Observando a interface e as funcionalidades do sistema é possível identificar entidades, processos e relações. Porém, alguns detalhes internos podem não ser percebidos sem o código.

2. Qual a importância da modelagem?
A modelagem ajuda a entender e organizar o sistema, facilitando o desenvolvimento, a comunicação entre os envolvidos e a manutenção do software.

3. Diferença entre sistema real e didático?
O sistema real é mais completo e usado por usuários reais. O sistema didático é mais simples e criado apenas para demonstrar conceitos de programação.