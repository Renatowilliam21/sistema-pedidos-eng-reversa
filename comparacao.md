### Parte 4 – Padrões de Projeto

4.1 - Sim, o sistema demonstra utilizar o padrão MVC (Model-View-Controller) como sua arquitetura base. A separação entre a interface do usuário, a lógica de controle e a manipulação de dados é perceptível durante a navegação. No entanto, em uma análise externa, não foram identificados indícios claros da implementação imediata de outros padrões, como Factory ou Singleton, embora sua aplicação seja perfeitamente cabível na estrutura do projeto.

4.2 - Estes padrões se localizam (ou se localizariam) em diferentes camadas da aplicação:

**MVC:** Já está presente na estrutura global. A View reside nas páginas web (HTML/CSS), o Controller gerencia as rotas e requisições, e o Model lida com as regras de negócio e o banco de dados.

**Factory:** Poderia existir no submódulo de gestão de produtos. Em vez de instanciar cada item manualmente, uma "fábrica" seria responsável por criar objetos de diferentes categorias (pizzas, bebidas, hambúrgueres) de forma padronizada.

**Singleton** Poderia ser encontrado na gestão da sessão de compra. Ele garantiria que o sistema utilize uma única instância do "Carrinho de Compras" ou da "Conexão com o Banco de Dados" durante toda a execução, evitando redundâncias.

4.3 - A aplicação prática traria os seguintes benefícios ao sistema:

**MVC:** É aplicado na interação do usuário; quando um item é adicionado ao carrinho, o Controller processa a ação, atualiza o Model (o estado do pedido) e a View reflete essa mudança instantaneamente para o usuário.

**Factory:** Seria aplicado na customização dos pedidos. Ao selecionar diferentes sabores de pizza ou ingredientes de um sanduíche, o padrão Factory facilitaria a criação desses objetos complexos sem expor a lógica de criação ao restante do código.

**Singleton:** Seria aplicado na segurança e integridade dos dados do pedido. Ao garantir uma instância única da lista de compras, previnem-se bugs onde o cliente poderia gerar, acidentalmente, múltiplos pedidos simultâneos ou perder a sincronia dos itens selecionados.

---

### Parte 5 – Comparação com Sistema Didático

#### Arquitetura

**Sistema Real:** O sistema apresenta uma arquitetura incipiente e mal planejada, com problemas estruturais visíveis e lógicas redundantes. A ausência clara de padrões de projeto e de uma arquitetura definida resulta em um acúmulo de débito técnico. Com o uso contínuo, essas pequenas falhas estruturais se somam, impactando negativamente a performance do software e a experiência final do usuário.

**Sistema Didático:** Em contrapartida, o sistema didático teve um planejamento prévio. Com a adoção de padrões arquiteturais consolidadas, como Arquitetura em Camadas, e o modelo MVC, isso proporciona um fluxo dinâmico e otimizado. Essa base sólida garante uma navegação mais fluida para o usuário e um ambiente de desenvolvimento sustentável e escalável para a equipe de programação.

#### Coesão

**Sistema Real:** Observa-se uma baixa coesão estrutural. As funções parecem acumular múltiplas responsabilidades, ferindo princípios básicos de design. Um reflexo prático disso é a complexidade desnecessária gerada no fluxo de bloqueio de pedidos fora do horário de atendimento. Essa mistura de lógicas (validação de horário com interface de carrinho, por exemplo) compromete a estabilidade e mostra que o sistema tem funções pouco coesas.

**Sistema Didático:** O projeto teve foco em ter alta coesão, garantindo que cada função tenha um propósito único e altamente específico. Ao isolar lógicas dela, evitam-se inconveniencias estruturais e bugs de fluxo. Isso não apenas previne falhas na experiência do usuário, mas também facilita imensamente a modificação e a expansão do código, tornando a implementação de outras funções algo simples e direto.

#### Acoplamento

**Sistema Real:** O sistema exibe um alto nível de acoplamento, com forte interdependência entre seus componentes. Isso se traduz em anomalias de navegação, como o roteamento confuso nas categorias de combos ou o fato de existirem dois botões de finalizar pedido na mesma tela. Esse emaranhado torna o código complexo e frágil para os desenvolvedores, além de gerar uma interface confusa que frustra o cliente.

**Sistema Didático:** Através do planejamento, o sistema didático apresenta um baixo acoplamento. As funções serão modulares e independentes, desenhadas de forma otimizada. Essa independência estrutural facilita a limpeza visual do site e do código, além de prevenir, códigos mortos ou redundantes. O resultado é um código seguro de ser alterado e uma experiência de uso muito mais intuitiva.

#### Organização

**Sistema Real:** A falta de organização se manifesta tanto na interface quanto na modelagem de dados: tamanhos de pizza tratados como itens avulsos, combos que não consolidam os preços (mostrando os valores unitários), uma área de desconto que permanece ativa sem existir promoção, e ações duplicadas no carrinho. Essas inconsistências evidenciam um mau planejamento do domínio da aplicação e desorganização do código fonte.

**Sistema Didático:** Tendo um planejamento minucioso permitiu uma modelagem de domínio coerente, o que se reflete em uma apresentação mais elegante e simples. Isso proporciona uma navegação tranquila e centrada no usuário, mitigando qualquer confusão. Internamente, a organização lógica do código e a separação de responsabilidades facilitam a leitura e o entendimento por parte de outros programadores que venham a assumir o projeto.

#### Flexibilidade

**Sistema Real:** Devido à desorganização e ao alto acoplamento, o sistema atual possui baixíssima flexibilidade. Desenvolvedores enfrentam uma curva de dificuldade alta para interpretar, atualizar ou corrigir partes do código sem quebrar outras. Essa rigidez traduz-se em maiores custos de manutenção e exige mais tempo e recursos para resolver problemas que um bom planejamento inicial teria evitado.

**Sistema Didático:** A alta flexibilidade do sistema didático permite que mudanças, correções e ajustes sejam implementados de forma ágil e segura. Com um código flexível e modular permite que até mesmo desenvolvedores recém-integrados à equipe ou com acesso limitado a determinadas partes do software possam realizar manutenções com facilidade. Isso direciona o foco da equipe para a evolução do produto, causando menos frustrações operacionais.
