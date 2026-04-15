### Parte 7 – Problemas Identificados

O sistema apresenta várias inconsistências, como preços incorretos nos combos e botões de finalização redundantes, o que evidencia uma falta de planejamento estrutural. O problema vai muito além da interface; ele está na base do código. Nota-se um alto acoplamento e uma baixa separação de responsabilidades, o que torna o sistema extremamente frágil e difícil de manter. Na prática, isso cria um efeito cascata: qualquer pequena alteração acaba afetando partes do código que não deveriam sofrer impacto, gerando um custo de manutenção muito maior do que o necessário. Além dessa fragilidade, a baixa coesão do projeto resulta em decisões de fluxo bem questionáveis. Um exemplo claro disso é o tratamento de itens fora do horário de funcionamento: em vez de uma sinalização adequada na página, o sistema simplesmente "expulsa" o usuário e o força de volta para a página inicial. Isso mostra como a lógica de negócio está mal amarrada à navegação, prejudicando diretamente a experiência final.

---

### Parte 8 – Proposta de Arquitetura

A prioridade deve ser a reestruturação do código para uma arquitetura em camadas funcional. O sistema já tenta seguir esse padrão, mas a implementação atual foi mal projetada e precisa de um refino urgente para que possamos aproveitar os benefícios real dessa estrutura. Polir o MVC não apenas organizaria melhor a lógica, como também facilitaria a navegação entre os arquivos do projeto. No nível do código, as funções precisam ser mais independentes e focadas (Princípio da Responsabilidade Única). Isso elevaria a coesão e reduziria o acoplamento, tornando a manutenção muito mais ágil e prevenindo que problemas complexos surjam por efeitos colaterais. No front-end, é necessária uma limpeza no layout para eliminar redundâncias e corrigir a exibição de dados. Uma interface mais limpa e com informações precisas impacta diretamente na fluidez da jornada do usuário. Por fim, uma evolução na comunicação Cliente-Servidor para suportar o pagamento online é essencial, agilizando todo o processo, do pedido à entrega final.

### Parte 9 – Aplicação de Padrões

• **Factory:**: Este padrão pode ser aplicado à classe `Itens Específicos` para padronizar a criação de objetos. A utilização de uma Factory centraliza a lógica de instanciação e as validações internas, garantindo um ponto de acesso único e seguro para a montagem dos itens. Isso elimina a necessidade de funções de criação externas e públicas (que aumentam a superfície de erro), reduzindo a complexidade e reforçando o encapsulamento.

• **Singleton:**: O padrão será aplicado à classe `Pedidos` para assegurar que exista uma única instância global controlando o estado atual da compra. Sendo uma das classes mais críticas do sistema, o Singleton ajuda a evitar falhas de sincronização, inconsistência de dados e problemas de gerenciamento de memória. Ele garante um controle restrito e seguro do fluxo de informações, permitindo uma validação centralizada de todas as operações do pedido.

---

### Parte 10 – Reflexão Crítica
