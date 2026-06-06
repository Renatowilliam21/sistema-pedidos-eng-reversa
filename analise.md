# Investigação do Sistema: Tropykaly Pizzas e Lanches

## 1. Propósito e Fluxo de Uso
A aplicação opera como um comércio eletrônico dedicado ao setor alimentício. A jornada do consumidor é bastante intuitiva: o usuário acessa o portal, explora o menu (que inclui opções como Lanches, Pizzas, Combos e Bebidas), personaliza seu pedido, adiciona os itens à cesta de compras e conclui a transação fornecendo os detalhes de entrega.

## 2. Estrutura Arquitetural Inferida
Avaliando as interações no frontend, é seguro afirmar que a plataforma adota o modelo Cliente-Servidor em ambiente Web, segmentado da seguinte forma:
- **Camada de Apresentação (Frontend):** A interface amigável e adaptável às telas que recebe os comandos do usuário.
- **Camada de Lógica (Backend/API):** O núcleo que executa os cálculos, gerencia o fechamento da conta e processa as regras de frete.
- **Camada de Dados (Banco de Dados):** O repositório responsável por armazenar o menu, dados do estabelecimento e o histórico de compras.

Nota-se um isolamento adequado entre o que é exibido no dispositivo do cliente e o processamento em segundo plano.

## 3. Avaliação de Design
- **Nível de Coesão:** Elevado. O sistema tem um propósito muito claro e não tenta executar funções fora do seu escopo principal, que é a venda de refeições.
- **Nível de Acoplamento:** Aparentemente baixo a moderado. O gerenciamento da vitrine de produtos e a lógica do carrinho operam de maneira independente, sem gerar gargalos visíveis entre si.

## 4. Definições da Modelagem de Dados
Ao desenhar o diagrama de classes, priorizei uma estrutura condizente com o cenário de um delivery autêntico:
- **Vínculo entre Pedido e ItemPedido:** Optei pela composição, pois um `ItemPedido` carece de sentido lógico caso não esteja atrelado a um `Pedido` existente.
- **Papel da Classe Intermediária (ItemPedido):** Ela atua como um "retrato" do item na hora da venda. Isso previne que futuras atualizações de preço na tabela `Produto` alterem indevidamente os valores de recibos antigos.
- **Estruturação por Categorias:** Ligar a classe `Produto` a uma `Categoria` facilita a expansão do menu e a implementação de filtros na interface, refletindo o funcionamento atual da Tropykaly.

## 5. Considerações Finais
Esta imersão em engenharia reversa me trouxe alguns aprendizados importantes:
1. **Dedução de Regras de Negócio:** Modelar um software sem ter acesso ao código-fonte (abordagem caixa-preta) é totalmente viável. Apenas acompanhando a dinâmica do carrinho e a disposição do menu, é possível mapear as entidades ocultas.
2. **O Papel Vital da Arquitetura:** Ficou evidente que a sustentabilidade de um sistema depende de sua base estrutural. Sem a aplicação de padrões (como MVC, Factory e Singleton), atualizações triviais podem desencadear falhas generalizadas, o que é crítico em sistemas que processam transações financeiras.
3. **Mundo Real vs. Ambiente Acadêmico:** Enquanto os projetos de sala de aula muitas vezes simplificam a estrutura para focar no aprendizado, aplicações comerciais exigem camadas rigorosamente separadas para garantir tolerância a falhas.
