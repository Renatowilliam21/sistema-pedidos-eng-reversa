1. O MVC melhorou a organização?

   Sim, drasticamente! A transição para o MVC permitiu reorganizar completamente o sistema em uma estrutura clara de pastas (/models, /views, /controllers, /services, /repositories). Antes, tínhamos uma "salada" de código; agora, cada camada tem o seu papel definido: Models cuidam da estrutura de dados , Views focam apenas na interface , e Controllers atuam no controle do fluxo.

2. O sistema ficou mais desacoplado?

    Completamente. Com a nova arquitetura, garantimos que as Views não acessam dados diretamente nem realizam cálculos. Os Controllers também ficaram mais enxutos, pois não acessam o banco de dados diretamente nem guardam regras de negócio complexas. A aplicação de padrões como o Observer garantiu que o Carrinho (Model) não precise saber que a Tela (View) existe para atualizá-la.

3. Onde ainda existem problemas?

    Mesmo com o MVC, em projetos que escalam rapidamente, começam a surgir problemas como "controllers gordos" e um inevitável excesso de responsabilidades. O Controller pode acabar virando um "faz-tudo" que orquestra dezenas de instâncias diferentes, gerando dificuldade de manutenção e de navegação no código.

4. O MVC seria suficiente para um sistema muito grande?

    Provavelmente não. O documento destaca que, para sistemas que crescem muito, o MVC tradicional apresenta problemas como aumento do acoplamento e dificuldade de escalabilidade. Para aplicações de nível corporativo (Enterprise), seria necessário evoluir para Clean Architecture, Arquitetura Hexagonal ou até mesmo Microsserviços.

5. Quais limitações você percebeu?

    A principal limitação prática é a linha tênue entre o que vai para o Model, o que vai para o Service e o que fica no Controller. Se não houver uma disciplina rigorosa, é muito fácil cair no anti-padrão de colocar regras de negócio espalhadas ou criar dependências pesadas, dificultando a escalabilidade.

6. Onde services ajudaram?

    Os Services foram os verdadeiros heróis para limpar os Controllers. Eles assumiram a responsabilidade total pelas regras de negócio, cálculos (como o DescontoService), validações e aplicação de estratégias . Eles também isolaram integrações externas, como o WhatsAppService.

7. Onde repositories ajudaram?

    Os Repositories foram fundamentais para isolar a camada de persistência e a comunicação com o JSON Server. Eles blindaram o restante do sistema: o Controller não faz ideia se os dados estão sendo salvos em um arquivo de texto, em um db.json ou em um banco de dados na nuvem; ele apenas delega o acesso aos dados ao Repository.