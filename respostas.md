# Respostas - Atividade SOLID

## Questões Teóricas e Análises

**Questão 1:** A classe Pedido original atua como uma "Classe Deus" (God Class), acumulando responsabilidades que deveriam estar distribuídas. Ela possui 6 responsabilidades distintas:
* Gerenciamento do pedido e cálculo do total bruto (Classe sugerida: `Pedido`).
* Cálculo de regras de desconto (Classe sugerida: `CalculadoraDesconto`).
* Persistência de dados (Classe sugerida: `PedidoRepository`).
* Notificação ao cliente (Classe sugerida: `NotificacaoService`).
* Geração de relatório (Classe sugerida: `RelatorioPedido`).
* Impressão e exportação (Classe sugerida: `ImpressaoService`).

**Questão 2:** A classe possui 6 razões para mudar, correspondentes a cada uma de suas responsabilidades:
1. Alteração na estrutura do pedido ou na forma de calcular o total bruto.
2. Inclusão, remoção ou alteração de regras e cupons de desconto.
3. Mudança na tecnologia ou na estrutura do banco de dados.
4. Alteração no canal de envio ou no texto da mensagem enviada ao cliente.
5. Modificação no layout ou nas informações exibidas no relatório.
6. Adição ou modificação nos formatos de saída do documento.

**Questão 3:** As classes sugeridas para separação são: `Pedido`, `CalculadoraDesconto`, `PedidoRepository`, `NotificacaoService`, `RelatorioPedido`, `ImpressaoService`.

**Questão 5:** No código refatorado, nenhuma linha do código existente precisa ser alterada; basta criar uma nova classe isolada (ex: `DescontoAniversario`) que estende `EstrategiaDesconto`. No código original, seria necessário modificar diretamente a classe `Pedido`, localizando o método `aplicarDesconto` e adicionando um novo `if`, o que violaria o OCP (Open/Closed Principle).

**Questão 6:** O problema deve ser resolvido através de composição. O cálculo de desconto deve ser uma dependência injetada no fluxo do pedido, permitindo que diferentes estratégias sejam associadas dinamicamente sem engessar a classe por meio de herança.

**Questão 7:** Para manter a consistência do sistema, o método deveria retornar 0.

**Questão 8:** Se o método lançar um erro, haverá violação do LSP (Liskov Substitution Principle). O princípio determina que subclasses devem poder substituir suas classes base sem quebrar o comportamento esperado. Se o sistema iterar sobre uma lista genérica de pedidos e um disparar uma exceção inesperada, a execução será interrompida.

**Questão 9:** A solução consiste em remover a responsabilidade de frete da classe base comum. A classe base `Pedido` conterá apenas os atributos universais. Cria-se uma interface ou classe especializada chamada `PedidoFisico` (que implementa frete/entrega), enquanto `PedidoDigital` não herda esses comportamentos.

**Questão 10:** Não, um serviço especializado em gerar arquivos PDF não deve ser obrigado a carregar dependências ou implementar métodos relacionados a impressoras físicas. Interfaces robustas demais criam acoplamentos desnecessários, violando o ISP (Interface Segregation Principle).

**Questão 14:** * **Antes da refatoração:** Era necessário modificar o código interno da classe `Pedido` para trocar a classe instanciada internamente.
* **Após a refatoração:** Nenhuma classe existente precisa ser modificada. Basta criar a nova classe (ex: `SMSService`) seguindo a mesma interface e passá-la como parâmetro no momento de instanciar o `Pedido`.

---
