    - - - - -   COMPARAÇÃO DE SISTEMAS  - - - - -

Critérios:
 1. Arquitetura
 2. Coesão
 3. Acoplamento
 4. Organização
 5. Flexibilidade

1. Arquitetura

    O sistema real possui uma arquitetura mais completa, juntando várias arquiteturas em um unico sistema, como: MVC, Cliente-Servidor e Arquitetura orientada a eventos.

    Já o sistema didático ele possui apenas o MVC, pois separa o front-end do back-end e possui um armazenamento de dados (local storage), porém ela não possui arquiteturas como Cliente-Servidor, já que não tem uma conexão real com um servidor e a aplicação está sendo rodada em localhost.

2. Coesão

    O sistema real possui uma boa coesão, seus elementos possuem objetivo direto, é intuitivo e simples. tudo esta em seu devido lugar.

    O sistema didático também possui uma ótima coesão, todos seus elementos estão no lugar certo, a verdadeira diferença é no visual, onde o sistema real possui uma aparência mais "rebuscada" enquanto a do sistema didático é extremamente simples.

3. Acoplamento

    O sistema real possui baixo acoplamento, possibilitando a manunteção do sistema sem que "quebre" outras partes do sistema, todos os blocos são idependentes.

    O sistema didático, como possuimos acesso ao seu código podemos dizer que também possui baixo acoplamento, com uso de padrões como o factory e o sigleton.

4. Organização

    O sistema real possui uma otima organização visual, seus produtos organizados em grid e abas é bem convidativo.

    O sistema didático por outro lado é muito simples, ele não possui uma organização visual muito notável.
    Seu código é bem organizado, é utilizado padrões de projetos como factory e singleton que garantem melhor organização e bom funcionamento do código

5. Flexibilidade


    O sistema real provavelmente possui uma alta flexibilidade (não sabemos como é o código) mas como é organizado em blocos com diferentes responsabilidades é muito mais facil adaptar o código a diferentes mudanças de negócio

    O sistema didático não possui uma boa flexibilidade, para adicionar algum novo item ao menu por exemplo, um programador tem que obrigatoriamente modificar alguns arquivos à mão, ou seja o dono do negócio não possui autonomia para gerir o seu próprio menu.