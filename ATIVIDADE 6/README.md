## Parte 7 – Análise Arquitetural

Após finalizar a refatoração, respondemos às seguintes questões sobre a nova estrutura:

**1. O MVC melhorou a organização?**
Sim. A separação das classes e funções deixou o projeto muito mais versátil e fácil de navegar.

**2. O sistema ficou mais desacoplado?**
Sim. Por exemplo: a exibição está desacoplada na View (`interface_view.py`), e a comunicação com o banco de dados está isolada através do `DatabaseRepository`.

**3. Onde ainda existem problemas?**
Na parte dos controllers. Conforme o código for avançando e ganhando novas funcionalidades, ele acaba acumulando muitas responsabilidades e chamadas dentro de um único controller.

**4. O MVC seria suficiente para um sistema muito grande?**
Não, ele sozinho não seria o bastante. Em sistemas maiores, o MVC puro acaba gerando arquivos muito extensos. O recomendado para cenários de alta complexidade é usar o MVC em conjunto com outra arquitetura (como Clean Architecture ou DDD).

**5. Quais limitações você percebeu?**
Para fluxos simples como os deste sistema, o MVC acaba exigindo a criação de vários arquivos diferentes para executar uma única ação, o que pode deixar a estrutura inicialmente mais "pesada" ou burocrática.

**6. Onde os *services* ajudaram?**
Na parte de auxiliar os Controllers e os Models, evitando que eles fiquem sobrecarregados com muitas regras de negócio complexas.

**7. Onde os *repositories* ajudaram?**
Eles funcionam como uma espécie de funil. Na hora de mexer na persistência de dados, só precisamos alterar o repositório, facilitando muito caso seja necessário implementar um banco de dados novo no futuro.

---

## Parte 8 – Análise de Problemas em Sistemas Escaláveis

Explicação de quais problemas surgiriam caso esse sistema crescesse muito utilizando apenas o MVC tradicional:

* **Controllers gordos:** Com a evolução do sistema, os controllers acabam por ter muitas dependências e injeções, o que vai gerar um arquivo gigantesco e cheio de regras orquestradas.
* **Excesso de responsabilidades:** Como o MVC foi feito para facilitar a comunicação dentro do projeto, em sistemas maiores certas camadas acabam sobrecarregadas com funções que poderiam ser divididas (por exemplo, os *Models* acabam absorvendo cálculos muito pesados).
* **Dificuldade de manutenção:** Seguindo os problemas anteriores, o excesso de regras, dependências e responsabilidades cruzadas acaba dificultando muito para um desenvolvedor novo que precisa dar manutenção no projeto.
* **Dificuldade de navegação:** Por separar os arquivos estritamente por tipo (Models, Views, Controllers), as funções acabam espalhadas. Fica cansativo ficar pulando de pasta em pasta procurando os arquivos que condizem com uma única funcionalidade (ex: "Finalizar compra").
* **Aumento do acoplamento:** Devido ao crescimento do projeto, os serviços acabam dependendo de outros serviços. Essa rede de chamadas interligadas deixa o sistema muito acoplado.
* **Dificuldade de escalabilidade:** O MVC tradicional geralmente resulta em um sistema monolítico. Se ele fosse acessado por milhares de pessoas ao mesmo tempo, seria difícil escalar partes específicas, gerando conflitos e travamentos no sistema como um todo.

---

## Parte 9 – Comparação Arquitetural

| Critério | Sistema Original | MVC Refatorado |
| :--- | :--- | :--- |
| **Organização** | **Baixa.** Regras de negócio, manipulação de dados e exibição no terminal ficavam juntas. | **Alta.** Separação clara em pastas lógicas. |
| **Coesão** | **Baixa.** Classes ou funções assumiam múltiplas responsabilidades. | **Alta.** Cada arquivo faz apenas uma coisa. |
| **Acoplamento** | **Alto.** Módulos altamente dependentes. | **Baixo.** O uso do padrão *Observer* e de *Services* isolados garante que as camadas não conheçam os detalhes de implementação umas das outras. |
| **Reutilização** | **Difícil.** Regras úteis estavam presas dentro de funções gigantes de exibição ou do fluxo principal. | **Alta.** A integração com o WhatsApp, por exemplo, pode ser reaproveitada em qualquer outra parte do sistema sem precisar levar a interface junto. |
| **Clareza estrutural** | **Confusa.** Difícil saber por onde começar a ler o código ou onde procurar um bug específico. | **Excelente.** O fluxo de dados é previsível e padronizado. |
| **Escalabilidade** | **Muito baixa.** Adicionar novas funcionalidades criaria um código espaguete, frágil e propenso a quebras sistêmicas. | **Boa.** É muito mais seguro e fácil criar novas regras de desconto ou adicionar formas de persistência sem afetar o núcleo do sistema. |
| **Facilidade de manutenção** | **Baixa.** Corrigir um erro visual exigia mexer no mesmo código que lidava com o banco de dados. | **Alta.** Se a mensagem do WhatsApp estiver com erro de formatação, basta ir no arquivo correspondente sem medo de quebrar a tela. |